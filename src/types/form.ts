

export interface CreateUserDTO {
    email: string;
    userName: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO{
    success: boolean;
    message: string;
    token: string;
    userName: string;
  }

export interface NoteDTO {
    id: string;
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
}


export interface UserDTO {
    id: string,
    email: string,
    userName: string,
}

export interface NoteExportDTO {
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    owner: UserDTO;
}

export interface NoteResponse {
    success: boolean;
    note?: NoteDTO;
    notes?: NoteDTO[];
    error?: any;
}

export interface UpdateNoteDTO {
    id?: string;
    title?: string;
    content?: string;
    createdAt?: Date;
    latitude?: number;
    longitude?: number;
}

export interface SaveNoteDTO {
    title: string;
    content: string;
    latitude: number;
    longitude: number;
}