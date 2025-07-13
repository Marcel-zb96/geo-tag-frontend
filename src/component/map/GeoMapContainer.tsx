import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import NoteMarker from '../../component/marker/NoteMarker';
import redMarker from '../../assets/marker-icon-red.png';
import yellowMarker from '../../assets/marker-icon-yellow.png';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import type { NoteDTO } from '../../types/form';

interface GeoMapContainerProp {
    MapClickHandler: () => null;
    clickedPos: [number, number] | null;
    setClickedPos: (pos: [number, number] | null)  => void;
    userNotes: NoteDTO[] | undefined;
    isLoading: boolean;
    markerRefs: React.MutableRefObject<{[key: string]: L.Marker<any> | null}>;
    openMarkerId: string | null;
    noteToUpdate: NoteDTO | null;
    updatePos: [number, number] | null;
    setUpdatePos: (pos: [number, number]) => void;
}

const MapCenterer = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

const GeoMapContainer = ({ MapClickHandler, clickedPos, setClickedPos, userNotes, isLoading, markerRefs, openMarkerId, noteToUpdate, updatePos, setUpdatePos }: GeoMapContainerProp) => {

    const [center, setCenter] = useState<[number, number]>([51.505, -0.09]);

    const redIcon = new L.Icon({
        iconUrl: redMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const yellowIcon = new L.Icon({
        iconUrl: yellowMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter([
                        position.coords.latitude,
                        position.coords.longitude,
                    ]);
                },
                () => {
                    // If user denies geolocation or error, keep default center
                }
            );
        }
    }, []);

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <MapCenterer center={center} />
            <MapClickHandler />
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={redIcon}>
                <Popup>
                    <strong>You are here!</strong>
                </Popup>
            </Marker>
            {
                clickedPos && (
                    <Marker
                        position={clickedPos}
                        eventHandlers={{ click: () => setClickedPos(null) }}
                    >
                        <Popup>
                            <div>
                                Marker at [{clickedPos[0].toFixed(4)}, {clickedPos[1].toFixed(4)}]
                            </div>
                        </Popup>
                    </Marker>
                )
            }
            {/* Draggable marker for update mode */}
            {noteToUpdate && updatePos && (
                <Marker
                    position={updatePos}
                    draggable={true}
                    icon={yellowIcon}
                    eventHandlers={{
                        dragend: (e) => {
                            const { lat, lng } = e.target.getLatLng();
                            setUpdatePos([lat, lng]);
                        }
                    }}
                >
                    <Popup>
                        <div>
                            Drag to update position
                        </div>
                    </Popup>
                </Marker>
            )}
            <NoteMarker notes={userNotes} isLoading={isLoading} markerRefs={markerRefs} openMarkerId={openMarkerId} />
        </MapContainer>
    )
}

export default GeoMapContainer;