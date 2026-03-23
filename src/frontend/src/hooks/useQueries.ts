import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReservationInput } from "../backend";
import { useActor } from "./useActor";

export function useGetReservations() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReservations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReservationCounts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reservationCounts"],
    queryFn: async () => {
      if (!actor) return { confirmed: 0n, pending: 0n, cancelled: 0n };
      return actor.getReservationCountsByStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateReservation() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: ReservationInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.createReservation(input);
    },
  });
}

export function useConfirmReservation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.confirmReservation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      queryClient.invalidateQueries({ queryKey: ["reservationCounts"] });
    },
  });
}

export function useCancelReservation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelReservation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      queryClient.invalidateQueries({ queryKey: ["reservationCounts"] });
    },
  });
}

export function useDeleteReservation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteReservation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      queryClient.invalidateQueries({ queryKey: ["reservationCounts"] });
    },
  });
}
