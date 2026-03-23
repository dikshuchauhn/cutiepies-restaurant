import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Clock, Star } from "lucide-react";
import { motion } from "motion/react";

const cuisines = [
  {
    name: "Chinese",
    emoji: "🥢",
    desc: "Aromatic stir-fries, dim sum & noodles crafted with authentic spices.",
    color: "bg-red-50 border-red-100",
    accent: "text-red-700",
  },
  {
    name: "Italian",
    emoji: "🍝",
    desc: "Wood-fired pizzas, hand-rolled pasta & creamy risottos from the heart of Italy.",
    color: "bg-green-50 border-green-100",
    accent: "text-green-700",
  },
  {
    name: "Indian",
    emoji: "🍛",
    desc: "Rich curries, fragrant biryanis & tandoor-grilled specialties bursting with flavor.",
    color: "bg-orange-50 border-orange-100",
    accent: "text-orange-700",
  },
  {
    name: "Mexican",
    emoji: "🌮",
    desc: "Loaded tacos, smoky burritos & crispy nachos with house-made salsas.",
    color: "bg-yellow-50 border-yellow-100",
    accent: "text-yellow-700",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    text: "Absolutely divine food and atmosphere. The Butter Chicken is unmatched!",
    stars: 5,
  },
  {
    name: "Rahul M.",
    text: "The Margherita Pizza here rivals anything I've had in Naples. Truly special.",
    stars: 5,
  },
  {
    name: "Ananya K.",
    text: "cutiepies~ is our go-to for date nights. Every dish is a masterpiece.",
    stars: 5,
  },
];

export function HomePage() {
  return (
    <main>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark-brown">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, oklch(0.72 0.13 72) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/80 via-dark-brown/60 to-dark-brown/90" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4 font-medium">
              Welcome to
            </p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl italic text-cream font-bold leading-none mb-4">
              cutiepies~
            </h1>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-cream/70 text-xl sm:text-2xl font-light tracking-wide mb-10">
              A world of flavors under one roof
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/reservations">
                <Button
                  size="lg"
                  data-ocid="hero.primary_button"
                  className="bg-burgundy hover:bg-burgundy-dark text-cream px-8 py-6 text-base font-semibold shadow-warm-lg transition-all duration-300 hover:scale-105"
                >
                  Book a Table <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button
                  size="lg"
                  variant="outline"
                  data-ocid="hero.secondary_button"
                  className="border-gold/50 text-gold hover:bg-gold/10 px-8 py-6 text-base font-semibold"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 inline-flex items-center gap-3 bg-cream/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3"
          >
            <Clock className="h-4 w-4 text-gold" />
            <span className="text-cream/80 text-sm">
              Tuesday – Sunday · 6:00 PM – 12:00 AM
            </span>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-burgundy text-sm uppercase tracking-widest font-medium mb-2">
              Our Specialties
            </p>
            <h2 className="font-display text-4xl sm:text-5xl italic text-dark-brown font-bold">
              Four Cuisines, One Passion
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cuisines.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border p-6 text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-1 ${c.color}`}
              >
                <span className="text-4xl mb-4 block">{c.emoji}</span>
                <h3
                  className={`font-display text-xl font-bold mb-2 ${c.accent}`}
                >
                  {c.name}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-burgundy text-sm uppercase tracking-widest font-medium mb-2">
                Our Story
              </p>
              <h2 className="font-display text-4xl italic text-dark-brown font-bold mb-6 leading-tight">
                Crafted with love,
                <br />
                served with heart
              </h2>
              <p className="text-warm-gray leading-relaxed mb-4">
                Founded by Dikshita Chauhan, cutiepies~ was born from a deep
                love of food and the belief that every meal should feel like a
                warm hug. We bring together the finest traditions of four rich
                culinary cultures.
              </p>
              <p className="text-warm-gray leading-relaxed mb-8">
                Every dish is crafted fresh, every evening, with ingredients
                sourced for quality and love that shows in every bite.
              </p>
              <Link to="/about">
                <Button
                  data-ocid="about.secondary_button"
                  variant="outline"
                  className="border-burgundy/40 text-burgundy hover:bg-burgundy/5"
                >
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-dark-brown rounded-2xl p-10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <ChefHat className="h-16 w-16 text-gold mx-auto mb-6" />
              <h3 className="font-display text-2xl italic text-cream font-bold mb-2">
                Dikshita Chauhan
              </h3>
              <p className="text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Founder &amp; Head Chef
              </p>
              <p className="text-cream/60 text-sm leading-relaxed">
                " I cook because food is the universal language of love. At
                cutiepies~, every dish carries a piece of my heart. "
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-burgundy">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl italic text-cream font-bold">
              Loved by Our Guests
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream/10 rounded-xl p-6 border border-cream/10"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].slice(0, t.stars).map((n) => (
                    <Star key={n} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-cream/80 text-sm leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <p className="text-gold text-sm font-medium">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-cream-dark text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl sm:text-5xl italic text-dark-brown font-bold mb-4">
            Ready for an Unforgettable Evening?
          </h2>
          <p className="text-warm-gray mb-8 text-lg">
            Reserve your table today and let us take care of the rest.
          </p>
          <Link to="/reservations">
            <Button
              size="lg"
              data-ocid="cta.primary_button"
              className="bg-burgundy hover:bg-burgundy-dark text-cream px-10 py-6 text-base font-semibold shadow-warm-lg transition-all duration-300 hover:scale-105"
            >
              Make a Reservation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
