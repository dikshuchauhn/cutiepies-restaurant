import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
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
            Get in Touch
          </p>
          <h1 className="font-display text-5xl italic text-cream font-bold mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-cream/60 max-w-xl mx-auto">
            We'd love to hear from you. Reach out for reservations, enquiries,
            or just to say hello!
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl italic text-dark-brown font-bold mb-6">
              Find Us
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-burgundy" />
                </div>
                <div>
                  <p className="font-semibold text-dark-brown">Address</p>
                  <p className="text-warm-gray text-sm mt-1">
                    cutiepies~, New Delhi, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-burgundy" />
                </div>
                <div>
                  <p className="font-semibold text-dark-brown">Phone</p>
                  <a
                    href="tel:+919318394925"
                    className="text-warm-gray text-sm mt-1 hover:text-burgundy transition-colors block"
                  >
                    +91 93183 94925
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-burgundy" />
                </div>
                <div>
                  <p className="font-semibold text-dark-brown">Email</p>
                  <a
                    href="mailto:dikshuchauhn25@gmail.com"
                    className="text-warm-gray text-sm mt-1 hover:text-burgundy transition-colors block"
                  >
                    dikshuchauhn25@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-burgundy" />
                </div>
                <div>
                  <p className="font-semibold text-dark-brown">Opening Hours</p>
                  <div className="text-sm mt-1 space-y-1">
                    <div className="flex justify-between gap-8">
                      <span className="text-warm-gray">Tuesday – Sunday</span>
                      <span className="text-dark-brown font-medium">
                        6:00 PM – 12:00 AM
                      </span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-warm-gray">Monday</span>
                      <span className="text-destructive font-medium">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-border bg-cream-dark h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-burgundy/40 mx-auto mb-2" />
                <p className="text-warm-gray text-sm">
                  cutiepies~, New Delhi, India
                </p>
                <a
                  href="https://maps.google.com/?q=New+Delhi,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy text-xs font-medium hover:underline mt-1 block"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl italic text-dark-brown font-bold mb-6">
              Send a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.modal"
            >
              <div>
                <Label
                  htmlFor="cName"
                  className="text-sm font-medium text-dark-brown mb-1.5 block"
                >
                  Your Name
                </Label>
                <Input
                  id="cName"
                  data-ocid="contact.input"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="cEmail"
                  className="text-sm font-medium text-dark-brown mb-1.5 block"
                >
                  Email Address
                </Label>
                <Input
                  id="cEmail"
                  type="email"
                  data-ocid="contact.input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="cMessage"
                  className="text-sm font-medium text-dark-brown mb-1.5 block"
                >
                  Message
                </Label>
                <Textarea
                  id="cMessage"
                  data-ocid="contact.textarea"
                  placeholder="How can we help you?"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={sending}
                className="w-full bg-burgundy hover:bg-burgundy-dark text-cream py-6 text-base font-semibold"
              >
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
