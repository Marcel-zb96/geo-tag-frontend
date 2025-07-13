import axios, { type AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

import type { CreateUserDTO, LoginDTO, LoginResponseDTO, NoteDTO, NoteResponse, SaveNoteDTO } from "../types/form";

interface DecodedToken {
    role: string;
}

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("GeoNotesToken");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const registerUser = async (data: CreateUserDTO): Promise<void> => {
    const response = await axios.post(`/api/user/register`, data);
    return response.data;
};

export const loginUser = async (data: LoginDTO): Promise<void> => {
    const response: AxiosResponse<LoginResponseDTO> = await axios.post(`/api/user/login`, data);

    if (response.data.success) {
        const decoded = jwtDecode<DecodedToken>(response.data.token);
        localStorage.setItem('GeoNotesToken', response.data.token);
        localStorage.setItem('GeoNotesAccessLevel', decoded.role);
    }
}

export const getUserNotes = async (): Promise<NoteDTO[]> => {
    const response: AxiosResponse<NoteResponse> = await axios.get('/api/notes/');
    return response.data.notes!;
}

export const getAllNotes = async () => {
    const response: AxiosResponse<NoteResponse> = await axios.get('/api/notes/all');
    return response.data.notes!;
}

export const saveUserNote = async (newNote: SaveNoteDTO): Promise<NoteDTO> => {
    const response: AxiosResponse<NoteResponse> = await axios.post('/api/notes/', newNote);
    return response.data.note!;
}

export const deleteUserNote = async (noteId: string): Promise<NoteDTO> => {
    const response: AxiosResponse<NoteResponse> = await axios.delete(`/api/notes/${noteId}`);
    return response.data.note!;
};

export const updateUserNote = async (noteId: string, updatedNote: Partial<SaveNoteDTO>): Promise<NoteDTO> => {
    const response: AxiosResponse<NoteResponse> = await axios.patch(`/api/notes/${noteId}`, updatedNote);
    return response.data.note!;
}