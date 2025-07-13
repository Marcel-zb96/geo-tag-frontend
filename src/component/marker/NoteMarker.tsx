import { Marker, Popup } from "react-leaflet"
import type { NoteDTO } from "../../types/form"
import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

interface NoteMarkerProp {
    notes: NoteDTO[] | undefined;
    isLoading: boolean;
    markerRefs: MutableRefObject<{ [key: string]: L.Marker | null }>;
    openMarkerId: string | null;
}

const NoteMarker = ({ notes, isLoading, markerRefs, openMarkerId }: NoteMarkerProp) => {
    useEffect(() => {
        if (!notes) return;
        Object.entries(markerRefs.current).forEach(([id, marker]) => {
            if (!marker) return;
            if (openMarkerId === id) {
                marker.openPopup();
            } else {
                marker.closePopup();
            }
        });
    }, [openMarkerId, notes, markerRefs]);

    return (
        !isLoading && Array.isArray(notes) && notes!.map((note) => (
            <Marker
                key={note.id}
                position={[note.latitude, note.longitude]}
                ref={el => { markerRefs.current[note.id] = el; }}
            >
                <Popup>
                    <div className="flex flex-col justify-center items-center">
                        <strong className="text-2xl">{note.title}</strong>
                        <div className="text-xl font-light">{note.content}</div>
                    </div>
                </Popup>
            </Marker>
        ))
    )
}

export default NoteMarker;