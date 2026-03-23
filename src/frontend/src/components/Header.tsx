import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" data-ocid="nav.link">
          <span className="font-display text-2xl italic text-burgundy font-bold tracking-tight">
            cutiepies~
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-burgundy transition-colors rounded-md hover:bg-burgundy/5"
              activeProps={{ className: "text-burgundy font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            data-ocid="nav.link"
            className="ml-2 px-3 py-1.5 text-xs font-medium text-warm-gray hover:text-burgundy border border-border rounded-full transition-colors hover:border-burgundy/30"
          >
            Admin
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-cream overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-burgundy transition-colors rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                data-ocid="nav.link"
                className="px-3 py-2 text-xs text-warm-gray hover:text-burgundy transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Admin Panel
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
