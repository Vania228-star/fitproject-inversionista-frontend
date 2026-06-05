export interface User {
    idUser: string;
    userName: string;
    email: string;
    role: "INVERSIONISTA" | "SUPERVISOR" | "CLIENTE";
}