import type { NoteExportDTO } from "../types/form";

export function exportNotesToGeoJson(notes: NoteExportDTO[]): string {
    if (!validateNotes(notes)) {
      throw new Error("Invalid notes format");
    }
  
    const points = notes.map(note => ({
      type: "Feature",
      properties: {
        owner: {
            userName: note.owner.userName,
            email: note.owner.email,
        },
        title: note.title,
        content: note.content
      },
      geometry: {
        type: "Point",
        coordinates: [note.longitude, note.latitude]
      }
    }));
  
    const geoJson = {
      type: "FeatureCollection",
      features: points,
    };
  
    return JSON.stringify(geoJson, null, 2);
  }
  
  function validateNotes(notes: NoteExportDTO[]): boolean {
    return notes.every(note =>
      typeof note.content === 'string' &&
      typeof note.title === 'string' &&
      typeof note.latitude === 'number' &&
      typeof note.longitude === 'number' &&
      typeof note.owner.email === 'string' &&
      typeof note.owner.userName === 'string'
    );
  }