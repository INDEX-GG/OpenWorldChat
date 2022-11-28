export type RoomConnectType = {
    role: "user" | "admin",
    userId: number,
    authToken?: string,
    servicesId?: number,
    services_name?: string,
    customRoomName?: string;
    email?: string;
    password?: string
}

export type PaginationType = {
    page: number;
    pageLimit: number;
}

export type ErrorEmitFuncType = (message: string) => void;