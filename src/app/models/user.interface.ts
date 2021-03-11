interface Photo {
    path: string,
    url: string
}

export interface UserInterface {
    id?: string;
    name?: string;
    surname?: string;
    status?: boolean;
    role?: boolean;
    mail?: string;
    password?: string;
    photo?: Photo;
    created?: string;
}