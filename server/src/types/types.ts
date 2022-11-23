import { createClient } from "redis";
import { IUserModel } from "./IUserModel";

export type RedisClientType = ReturnType<typeof createClient>

export type RoomConnectType = {
    role: "user" | "admin",
    roomId: number,
    authToken: string,
    servicesId: number,
    services_name: string,
}