import { useState, useRef } from 'react';
import { useMapEvent } from 'react-leaflet';
import NoteBar from '../../component/note/NoteBar';
import L from 'leaflet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUserNote, getAllNotes, getUserNotes, saveUserNote, updateUserNote } from '../../query/query';
import NewNoteForm from '../../component/form/NewNoteForm';
import type { SubmitHandler } from 'react-hook-form';
import type { NoteDTO, SaveNoteDTO, UpdateNoteDTO } from '../../types/form';
import { useNavigate } from 'react-router-dom';
import GeoMapContainer from '../../component/map/GeoMapContainer';
import UpdateNoteForm from '../../component/form/UpdateNoteForm';

const GeoNoteMap = () => {
 
    const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
    const [clickedPos, setClickedPos] = useState<[number, number] | null>(null);
    const [noteToUpdate, setNoteToUpdate] = useState<NoteDTO | null>(null);
    const [updatePos, setUpdatePos] = useState<[number, number] | null>(null);
    const navigate = useNavigate();
    const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

    const queryClient = useQueryClient();
    const { data: userNotes, isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: localStorage.getItem("GeoNotesAccessLevel") === "ADMIN" ? getAllNotes : getUserNotes,
    });

    const mutation = useMutation({
        mutationFn: saveUserNote,
        onSuccess: (savedNote) => {
            queryClient.setQueryData(['notes'], (oldNotes: NoteDTO[] | undefined) =>
                oldNotes ? [...oldNotes, savedNote] : [savedNote]
            );
            alert("Save successful!");
            setClickedPos(null);
        },
        onError: (error: any) => {
            alert(error?.response?.data?.message || "Save failed!");
        },
    });

    const noteMutationDelete = useMutation({
        mutationFn: (noteId: string) => deleteUserNote(noteId),
        onSuccess: (_data, noteId) => {
            queryClient.setQueryData(['notes'], (oldNotes: NoteDTO[] | undefined) =>
                oldNotes ? oldNotes.filter(note => note.id !== noteId) : []
            );
        }
    });

    const noteMutationUpdate = useMutation({
        mutationFn: ({ noteId, updates }: { noteId: string; updates: UpdateNoteDTO }) => updateUserNote(noteId, updates),
        onSuccess: (updatedNote, { noteId }) => {
            queryClient.setQueryData(['notes'], (oldNotes: NoteDTO[] | undefined) =>
                oldNotes
                    ? oldNotes.map(note => note.id === noteId ? updatedNote : note)
                    : []
            );
            setNoteToUpdate(null);
            setUpdatePos(null);
            alert("Update successful!");
        },
        onError: (error: any) => {
            alert(error?.response?.data?.message || "Update failed!");
        }
    })

    const onDelete = (id: string) => {
        noteMutationDelete.mutate(id);
    };

    const onUpdate = (note: NoteDTO) => {
        setNoteToUpdate(note);
        setUpdatePos([note.latitude, note.longitude]);
    }

    const onSubmit: SubmitHandler<SaveNoteDTO> = (data) => {
        mutation.mutate(data);
    };

    const onSaveUpdate = (noteId: string, updates: UpdateNoteDTO) => {
        console.log(noteId);
        noteMutationUpdate.mutate({ noteId, updates });
    }

    const onClick = (id: string) => {
        if (openMarkerId === id) {
            // Close the popup if it's already open
            const marker = markerRefs.current[id];
            if (marker) marker.closePopup();
            setOpenMarkerId(null);
        } else {
            // Open the popup for the clicked marker
            const marker = markerRefs.current[id];
            if (marker) marker.openPopup();
            setOpenMarkerId(id);
        }
    }

     // Component to handle map click events
     const MapClickHandler = () => {
        useMapEvent('click', (e) => {
            setClickedPos([e.latlng.lat, e.latlng.lng]);
        });
        return null;
    };


    if (error) navigate('/login');

    return (
        <div className='w-full flex flex-row'>
            <div style={{ height: "90vh", width: "80vw" }}>
                <GeoMapContainer
                    MapClickHandler={MapClickHandler}
                    clickedPos={clickedPos}
                    setClickedPos={setClickedPos}
                    isLoading={isLoading}
                    userNotes={userNotes}
                    markerRefs={markerRefs}
                    openMarkerId={openMarkerId}
                    noteToUpdate={noteToUpdate}
                    updatePos={updatePos}
                    setUpdatePos={setUpdatePos}
                />
            </div>
            <div className='flex flex-col h-100% w-[20vw] items-center'>
                {
                    clickedPos ?
                        <NewNoteForm clickedPos={clickedPos} onSubmit={onSubmit} /> :
                        noteToUpdate ?
                        <UpdateNoteForm
                            note={noteToUpdate}
                            updatePos={updatePos}
                            setUpdatePos={setUpdatePos}
                            onUpdate={onSaveUpdate}
                        /> :
                        <NoteBar notes={userNotes} isLoading={isLoading} onclick={onClick} onDelete={onDelete} onUpdate={onUpdate} />
                }
            </div>
        </div>
    );
};

export default GeoNoteMap;