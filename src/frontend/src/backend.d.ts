import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ReservationUpdate {
    status: ReservationStatus;
    date: string;
    time: string;
    guestName: string;
    email: string;
    partySize: bigint;
    phone: string;
    specialNotes: string;
}
export interface Reservation {
    status: ReservationStatus;
    date: string;
    createdAt: Time;
    time: string;
    guestName: string;
    email: string;
    partySize: bigint;
    phone: string;
    specialNotes: string;
}
export interface UserProfile {
    name: string;
}
export interface ReservationInput {
    date: string;
    time: string;
    guestName: string;
    email: string;
    partySize: bigint;
    phone: string;
    specialNotes: string;
}
export enum ReservationStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum UpdateStatus {
    cancelled = "cancelled",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelReservation(id: bigint): Promise<void>;
    confirmReservation(id: bigint): Promise<void>;
    createReservation(input: ReservationInput): Promise<bigint>;
    deleteReservation(id: bigint): Promise<void>;
    getAllReservations(): Promise<Array<Reservation>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCancelledReservations(): Promise<Array<Reservation>>;
    getConfirmedReservations(): Promise<Array<Reservation>>;
    getPendingReservations(): Promise<Array<Reservation>>;
    getReservation(id: bigint): Promise<Reservation | null>;
    getReservationCountsByDate(date: string): Promise<{
        cancelled: bigint;
        pending: bigint;
        confirmed: bigint;
    }>;
    getReservationCountsByStatus(): Promise<{
        cancelled: bigint;
        pending: bigint;
        confirmed: bigint;
    }>;
    getReservationsByDate(date: string): Promise<Array<Reservation>>;
    getReservationsByGuestName(name: string): Promise<Array<Reservation>>;
    getReservationsByPartySize(size: bigint): Promise<Array<Reservation>>;
    getReservationsByStatus(status: ReservationStatus): Promise<Array<Reservation>>;
    getUpcomingReservations(): Promise<Array<Reservation>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateReservation(id: bigint, update: ReservationUpdate): Promise<void>;
    updateReservationStatus(id: bigint, newStatus: UpdateStatus): Promise<void>;
}
