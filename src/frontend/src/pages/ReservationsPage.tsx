import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReservation } from "@/hooks/useQueries";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TIME_SLOTS = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];
const GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type ConfirmData = {
  bookingId: bigint;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  specialNotes: string;
};

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function fmtDate(s: string) {
  return new Date(`${s}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ReservationsPage() {
  const [form, setForm] = useState({
    guestName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "2",
    specialNotes: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [confirmation, setConfirmation] = useState<ConfirmData | null>(null);
  const createMutation = useCreateReservation();

  function validate() {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.guestName.trim()) e.guestName = "Full name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.date) e.date = "Please select a date";
    else if (new Date(`${form.date}T00:00:00`).getDay() === 1)
      e.date = "We are closed on Mondays. Please pick Tuesday–Sunday.";
    if (!form.time) e.time = "Please select a time";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    try {
      const id = await createMutation.mutateAsync({
        guestName: form.guestName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        partySize: BigInt(Number.parseInt(form.partySize)),
        specialNotes: form.specialNotes.trim(),
      });
      setConfirmation({
        bookingId: id,
        guestName: form.guestName,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: form.time,
        partySize: Number.parseInt(form.partySize),
        specialNotes: form.specialNotes,
      });
      toast.success("Reservation confirmed!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  function handleReset() {
    setConfirmation(null);
    setForm({
      guestName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      partySize: "2",
      specialNotes: "",
    });
    setErrors({});
  }

  return (
    <main>
      <section className="bg-dark-brown py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-2">
            Reserve Your Seat
          </p>
          <h1 className="font-display text-5xl italic text-cream font-bold mb-4">
            Book a Table
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-cream/60 max-w-xl mx-auto">
            Open Tuesday through Sunday, 6:00 PM – 12:00 AM. We look forward to
            hosting you.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {confirmation ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                data-ocid="reservation.success_state"
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="font-display text-4xl italic text-dark-brown font-bold mb-2">
                  Your table is reserved!
                </h2>
                <p className="text-warm-gray mb-8">
                  We can't wait to welcome you at cutiepies~
                </p>
                <div className="bg-card border border-border rounded-2xl p-6 text-left shadow-card mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-dark-brown">
                      Booking Summary
                    </h3>
                    <span className="text-xs bg-burgundy/10 text-burgundy font-mono px-3 py-1 rounded-full">
                      Ref #{confirmation.bookingId.toString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-warm-gray text-xs">Guest</p>
                        <p className="font-medium text-dark-brown">
                          {confirmation.guestName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-warm-gray text-xs">Date</p>
                        <p className="font-medium text-dark-brown">
                          {fmtDate(confirmation.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-warm-gray text-xs">Time</p>
                        <p className="font-medium text-dark-brown">
                          {confirmation.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-warm-gray text-xs">Party Size</p>
                        <p className="font-medium text-dark-brown">
                          {confirmation.partySize} guest
                          {confirmation.partySize > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-warm-gray text-xs">Phone</p>
                        <p className="font-medium text-dark-brown">
                          {confirmation.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-warm-gray text-xs">Email</p>
                        <p className="font-medium text-dark-brown">
                          {confirmation.email}
                        </p>
                      </div>
                    </div>
                    {confirmation.specialNotes && (
                      <div className="sm:col-span-2 flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                        <div>
                          <p className="text-warm-gray text-xs">
                            Special Requests
                          </p>
                          <p className="font-medium text-dark-brown">
                            {confirmation.specialNotes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-warm-gray mb-8">
                  A confirmation note will be shared with you at{" "}
                  <span className="text-burgundy font-medium">
                    {confirmation.email}
                  </span>
                  . For changes, call us at{" "}
                  <a
                    href="tel:+919318394925"
                    className="text-burgundy font-medium"
                  >
                    +91 93183 94925
                  </a>
                  .
                </p>
                <Button
                  onClick={handleReset}
                  data-ocid="reservation.primary_button"
                  className="bg-burgundy hover:bg-burgundy-dark text-cream"
                >
                  Make Another Reservation
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
                  <h2 className="font-display text-2xl italic text-dark-brown font-bold mb-1">
                    Reservation Details
                  </h2>
                  <p className="text-warm-gray text-sm mb-6">
                    Open Tuesday through Sunday, 6:00 PM – 12:00 AM.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="reservation.modal"
                  >
                    <div>
                      <Label
                        htmlFor="guestName"
                        className="text-sm font-medium text-dark-brown mb-1.5 block"
                      >
                        Full Name <span className="text-burgundy">*</span>
                      </Label>
                      <Input
                        id="guestName"
                        data-ocid="reservation.input"
                        placeholder="Your full name"
                        value={form.guestName}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, guestName: e.target.value }))
                        }
                        className={errors.guestName ? "border-destructive" : ""}
                      />
                      {errors.guestName && (
                        <p
                          data-ocid="reservation.error_state"
                          className="text-destructive text-xs mt-1"
                        >
                          {errors.guestName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-dark-brown mb-1.5 block"
                        >
                          Email <span className="text-burgundy">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          data-ocid="reservation.input"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p
                            data-ocid="reservation.error_state"
                            className="text-destructive text-xs mt-1"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-dark-brown mb-1.5 block"
                        >
                          Phone <span className="text-burgundy">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          data-ocid="reservation.input"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p
                            data-ocid="reservation.error_state"
                            className="text-destructive text-xs mt-1"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="date"
                          className="text-sm font-medium text-dark-brown mb-1.5 block"
                        >
                          Date <span className="text-burgundy">*</span>
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          data-ocid="reservation.input"
                          min={getTomorrow()}
                          value={form.date}
                          onChange={(e) => {
                            setForm((p) => ({ ...p, date: e.target.value }));
                            if (
                              new Date(
                                `${e.target.value}T00:00:00`,
                              ).getDay() === 1
                            ) {
                              setErrors((p) => ({
                                ...p,
                                date: "Closed Mondays. Please pick Tue–Sun.",
                              }));
                            } else {
                              setErrors((p) => ({ ...p, date: undefined }));
                            }
                          }}
                          className={errors.date ? "border-destructive" : ""}
                        />
                        {errors.date && (
                          <p
                            data-ocid="reservation.error_state"
                            className="text-destructive text-xs mt-1"
                          >
                            {errors.date}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-dark-brown mb-1.5 block">
                          Time <span className="text-burgundy">*</span>
                        </Label>
                        <Select
                          value={form.time}
                          onValueChange={(v) =>
                            setForm((p) => ({ ...p, time: v }))
                          }
                        >
                          <SelectTrigger
                            data-ocid="reservation.select"
                            className={errors.time ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_SLOTS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.time && (
                          <p
                            data-ocid="reservation.error_state"
                            className="text-destructive text-xs mt-1"
                          >
                            {errors.time}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-dark-brown mb-1.5 block">
                        Number of Guests{" "}
                        <span className="text-burgundy">*</span>
                      </Label>
                      <Select
                        value={form.partySize}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, partySize: v }))
                        }
                      >
                        <SelectTrigger data-ocid="reservation.select">
                          <SelectValue placeholder="Guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {GUEST_COUNTS.map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="notes"
                        className="text-sm font-medium text-dark-brown mb-1.5 block"
                      >
                        Special Requests{" "}
                        <span className="text-warm-gray text-xs">
                          (optional)
                        </span>
                      </Label>
                      <Textarea
                        id="notes"
                        data-ocid="reservation.textarea"
                        placeholder="Allergies, dietary preferences, special occasions..."
                        value={form.specialNotes}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            specialNotes: e.target.value,
                          }))
                        }
                        rows={3}
                      />
                    </div>
                    <Button
                      type="submit"
                      data-ocid="reservation.submit_button"
                      disabled={createMutation.isPending}
                      className="w-full bg-burgundy hover:bg-burgundy-dark text-cream py-6 text-base font-semibold shadow-warm"
                    >
                      {createMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Reserving your table...
                        </>
                      ) : (
                        "Confirm Reservation"
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
