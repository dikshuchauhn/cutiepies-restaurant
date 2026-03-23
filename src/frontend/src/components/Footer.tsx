import { Link } from "@tanstack/react-router";
import { Clock, Heart, Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-dark-brown text-cream/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-3xl italic text-gold font-bold mb-2">
              cutiepies~
            </h3>
            <p className="text-sm text-cream/60 mb-1">By Dikshita Chauhan</p>
            <p className="text-sm text-cream/60 mt-4 leading-relaxed">
              A world of flavors under one roof — Chinese, Italian, Indian &amp;
              Mexican.
            </p>
          </div>
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold/60 shrink-0" />
                <a
                  href="tel:+919318394925"
                  className="hover:text-gold transition-colors"
                >
                  +91 93183 94925
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold/60 shrink-0" />
                <a
                  href="mailto:dikshuchauhn25@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  dikshuchauhn25@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Hours
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gold/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream/90">Tuesday – Sunday</p>
                  <p className="text-cream/60">6:00 PM – 12:00 AM</p>
                </div>
              </li>
              <li className="text-cream/40 text-xs pl-6">Monday: Closed</li>
            </ul>
            <div className="mt-4 flex gap-2 flex-wrap">
              {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span
                  key={d}
                  className="text-xs bg-gold/20 text-gold rounded px-1.5 py-0.5"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>© {year} cutiepies~. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-burgundy-light fill-burgundy-light" />
            <span>using</span>
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-cream/70 transition-colors">
              Home
            </Link>
            <Link to="/menu" className="hover:text-cream/70 transition-colors">
              Menu
            </Link>
            <Link
              to="/reservations"
              className="hover:text-cream/70 transition-colors"
            >
              Reserve
            </Link>
            <Link to="/admin" className="hover:text-cream/70 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
