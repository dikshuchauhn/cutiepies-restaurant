import { UserRole } from "@/backend";
import type { Reservation } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useCancelReservation,
  useConfirmReservation,
  useDeleteReservation,
  useGetReservations,
  useIsAdmin,
  useReservationCounts,
} from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "pending" | "confirmed" | "cancelled";

function truncate(p: string) {
  return p.length <= 20 ? p : `${p.slice(0, 10)}...${p.slice(-6)}`;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmed")
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        Confirmed
      </Badge>
    );
  if (status === "cancelled")
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        Cancelled
      </Badge>
    );
  return (
    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
      Pending
    </Badge>
  );
}

export function AdminPage() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const isAdminQuery = useIsAdmin();
  const reservationsQuery = useGetReservations();
  const countsQuery = useReservationCounts();
  const confirmMutation = useConfirmReservation();
  const cancelMutation = useCancelReservation();
  const deleteMutation = useDeleteReservation();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [claimingAdmin, setClaimingAdmin] = useState(false);

  async function claimAdmin() {
    if (!actor || !identity) return;
    setClaimingAdmin(true);
    try {
      await actor.assignCallerUserRole(identity.getPrincipal(), UserRole.admin);
      toast.success("Admin access granted!");
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    } catch {
      toast.error("Failed to claim admin access.");
    } finally {
      setClaimingAdmin(false);
    }
  }

  async function handleConfirm(id: bigint) {
    try {
      await confirmMutation.mutateAsync(id);
      toast.success("Reservation confirmed");
    } catch {
      toast.error("Failed to confirm");
    }
  }

  async function handleCancel(id: bigint) {
    try {
      await cancelMutation.mutateAsync(id);
      toast.success("Reservation cancelled");
    } catch {
      toast.error("Failed to cancel");
    }
  }

  async function handleDelete(id: bigint) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Reservation deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  const reservations: Reservation[] = reservationsQuery.data ?? [];
  const filtered = reservations.filter(
    (r) => activeTab === "all" || r.status === activeTab,
  );
  const counts = countsQuery.data;

  if (!isLoggedIn) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-card"
          data-ocid="admin.panel"
        >
          <div className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-burgundy" />
          </div>
          <h1 className="font-display text-3xl italic text-dark-brown font-bold mb-2">
            Admin Access
          </h1>
          <p className="text-warm-gray text-sm mb-8">
            This section is restricted to cutiepies~ staff only. Please log in
            to continue.
          </p>
          <Button
            onClick={login}
            data-ocid="admin.primary_button"
            disabled={isLoggingIn || isInitializing}
            className="w-full bg-burgundy hover:bg-burgundy-dark text-cream py-6 text-base font-semibold"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
        </motion.div>
      </main>
    );
  }

  if (isAdminQuery.isLoading) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center" data-ocid="admin.loading_state">
          <Loader2 className="h-10 w-10 animate-spin text-burgundy mx-auto mb-4" />
          <p className="text-warm-gray">Verifying admin access...</p>
        </div>
      </main>
    );
  }

  if (!isAdminQuery.data) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-card"
          data-ocid="admin.panel"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="font-display text-2xl italic text-dark-brown font-bold mb-2">
            Access Restricted
          </h2>
          <p className="text-warm-gray text-sm mb-6">
            You don't have admin access yet.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-amber-800 text-sm font-medium">
              First-time Setup
            </p>
            <p className="text-amber-700 text-xs mt-1">
              If you are the restaurant owner, claim admin access below.
            </p>
          </div>
          <Button
            onClick={claimAdmin}
            data-ocid="admin.primary_button"
            disabled={claimingAdmin}
            className="w-full bg-burgundy hover:bg-burgundy-dark text-cream mb-3"
          >
            {claimingAdmin ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Claiming...
              </>
            ) : (
              "Claim Admin Access"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={clear}
            data-ocid="admin.secondary_button"
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background" data-ocid="admin.page">
      <div className="bg-dark-brown border-b border-cream/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl italic text-cream font-bold">
              cutiepies~ Admin
            </h1>
            <p className="text-cream/40 text-xs mt-0.5">
              {truncate(identity.getPrincipal().toString())}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              data-ocid="admin.secondary_button"
              className="text-cream/60 hover:text-cream hover:bg-cream/10"
              onClick={() => {
                reservationsQuery.refetch();
                countsQuery.refetch();
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              data-ocid="admin.close_button"
              onClick={clear}
              className="border-cream/20 text-cream hover:bg-cream/10 hover:text-cream"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-amber-800 text-sm">
            <strong>Note:</strong> Email confirmation is not available in this
            plan. Please contact guests directly at their provided email.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total",
              value: reservations.length,
              icon: Users,
              color: "text-dark-brown",
              bg: "bg-card",
            },
            {
              label: "Pending",
              value: Number(counts?.pending ?? 0n),
              icon: Clock,
              color: "text-amber-700",
              bg: "bg-amber-50",
            },
            {
              label: "Confirmed",
              value: Number(counts?.confirmed ?? 0n),
              icon: CheckCircle,
              color: "text-green-700",
              bg: "bg-green-50",
            },
            {
              label: "Cancelled",
              value: Number(counts?.cancelled ?? 0n),
              icon: XCircle,
              color: "text-red-700",
              bg: "bg-red-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl border border-border p-4 shadow-card`}
              data-ocid={`admin.${stat.label.toLowerCase()}.card`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-warm-gray uppercase tracking-wide">
                  {stat.label}
                </span>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              {countsQuery.isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as FilterTab)}
          >
            <TabsList data-ocid="admin.tab">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
          {reservationsQuery.isLoading ? (
            <div className="p-8 space-y-3" data-ocid="admin.loading_state">
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-12 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center" data-ocid="admin.empty_state">
              <Users className="h-10 w-10 text-warm-gray/40 mx-auto mb-3" />
              <p className="text-warm-gray font-medium">
                No reservations found
              </p>
              <p className="text-warm-gray/60 text-sm mt-1">
                Reservations will appear here once guests book a table.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="w-16">Party</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((res, idx) => {
                    const id = BigInt(idx + 1);
                    return (
                      <TableRow
                        key={`${res.guestName}-${String(res.createdAt)}`}
                        data-ocid={`admin.row.${idx + 1}`}
                      >
                        <TableCell className="text-warm-gray text-sm">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium text-dark-brown">
                          {res.guestName}
                        </TableCell>
                        <TableCell className="text-warm-gray text-sm">
                          {res.email}
                        </TableCell>
                        <TableCell className="text-warm-gray text-sm">
                          {res.phone}
                        </TableCell>
                        <TableCell className="text-sm">{res.date}</TableCell>
                        <TableCell className="text-sm">{res.time}</TableCell>
                        <TableCell className="text-center text-sm">
                          {res.partySize.toString()}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={res.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1.5">
                            {res.status === "pending" && (
                              <Button
                                size="sm"
                                data-ocid={`admin.confirm_button.${idx + 1}`}
                                disabled={confirmMutation.isPending}
                                onClick={() => handleConfirm(id)}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs h-7 px-2"
                              >
                                Confirm
                              </Button>
                            )}
                            {(res.status === "pending" ||
                              res.status === "confirmed") && (
                              <Button
                                size="sm"
                                variant="outline"
                                data-ocid={`admin.cancel_button.${idx + 1}`}
                                disabled={cancelMutation.isPending}
                                onClick={() => handleCancel(id)}
                                className="border-amber-300 text-amber-700 hover:bg-amber-50 text-xs h-7 px-2"
                              >
                                Cancel
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  data-ocid={`admin.delete_button.${idx + 1}`}
                                  className="border-red-200 text-red-600 hover:bg-red-50 text-xs h-7 px-2"
                                >
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-ocid="admin.dialog">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Reservation
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the
                                    reservation for{" "}
                                    <strong>{res.guestName}</strong>? This
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-ocid="admin.cancel_button">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    data-ocid="admin.confirm_button"
                                    onClick={() => handleDelete(id)}
                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
