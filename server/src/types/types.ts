export type RoomConnectType = {
    role: "user" | "admin",
    userId: number,
    authToken: string,
    servicesId: number,
    services_name: string,
}

export type ErrorEmitFuncType = (message: string) => void;