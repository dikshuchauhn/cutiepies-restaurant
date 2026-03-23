import { Flame, Globe, Heart, Leaf } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Every recipe is crafted with genuine care and passion for the people we serve.",
  },
  {
    icon: Flame,
    title: "Fresh Every Day",
    desc: "We prep everything daily — no shortcuts, no compromise on freshness.",
  },
  {
    icon: Globe,
    title: "World Flavors",
    desc: "We celebrate the diversity of global cuisine, bringing authentic tastes together.",
  },
  {
    icon: Leaf,
    title: "Quality Ingredients",
    desc: "Carefully sourced spices, produce and proteins for every single dish.",
  },
];

const cuisineStories = [
  {
    name: "Chinese",
    emoji: "🥢",
    story:
      "Our Chinese kitchen draws on the vibrant street food culture of Sichuan and Hong Kong — bold, fiery, and utterly addictive. From delicate dim sum to wok-charred noodles, we bring the soul of East Asia to your plate.",
  },
  {
    name: "Italian",
    emoji: "🍝",
    story:
      "Italy taught us that simplicity is genius. Our pizzas, pastas and risottos are made the old-fashioned way — slowly, lovingly, with the finest imported ingredients and deep respect for tradition.",
  },
  {
    name: "Indian",
    emoji: "🍛",
    story:
      "India's cuisine is as vast and diverse as the country itself. We honor that legacy with recipes passed down through generations — fragrant, spiced, deeply comforting and full of life.",
  },
  {
    name: "Mexican",
    emoji: "🌮",
    story:
      "Mexican food is a fiesta on your palate. Smoky, tangy, rich and colorful — our menu celebrates street tacos, sizzling fajitas, and decadent desserts that make this cuisine irresistible.",
  },
];

export function AboutPage() {
  return (
    <main>
      <section className="bg-dark-brown py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-2">
            Our Story
          </p>
          <h1 className="font-display text-5xl sm:text-6xl italic text-cream font-bold mb-4">
            About cutiepies~
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-cream/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Where every table is a destination and every dish is a journey.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-burgundy text-sm uppercase tracking-widest font-medium mb-3">
              How It Began
            </p>
            <h2 className="font-display text-4xl italic text-dark-brown font-bold mb-6">
              A Dream, A Kitchen, A Family
            </h2>
            <div className="space-y-5 text-warm-gray leading-relaxed text-base">
              <p>
                cutiepies~ was born on a warm Tuesday evening in the heart of
                New Delhi. Dikshita Chauhan, a lifelong food lover and
                self-taught chef, opened the doors with one simple idea: create
                a place where people could experience the world through food.
              </p>
              <p>
                What started as a small passion project quickly grew into a
                beloved dining destination. Guests kept coming back — not just
                for the food, but for the warmth, the stories behind each dish,
                and the feeling of being welcomed home.
              </p>
              <p>
                Today, cutiepies~ is a celebration of four great culinary
                traditions — Chinese, Italian, Indian, and Mexican — served with
                the kind of heart that only comes when food is personal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark-brown rounded-2xl p-10 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-burgundy/40 flex items-center justify-center mx-auto mb-6">
                <span className="font-display text-4xl italic text-gold font-bold">
                  DC
                </span>
              </div>
              <h3 className="font-display text-3xl italic text-cream font-bold mb-1">
                Dikshita Chauhan
              </h3>
              <p className="text-gold text-sm uppercase tracking-widest mb-6">
                Founder &amp; Head Chef
              </p>
              <div className="space-y-2 text-cream/60 text-sm">
                <p>📞 +91 93183 94925</p>
                <p>✉️ dikshuchauhn25@gmail.com</p>
                <p>📍 New Delhi, India</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-burgundy text-sm uppercase tracking-widest font-medium mb-3">
                A Word from the Chef
              </p>
              <h2 className="font-display text-3xl italic text-dark-brown font-bold mb-6">
                A Message from Dikshita
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p className="text-lg italic font-display text-dark-brown/80">
                  " Food, to me, is not just sustenance — it is the warmest
                  expression of love there is. "
                </p>
                <p>
                  I've spent years exploring kitchens, tasting street food from
                  around the world, and learning from grandmothers, street
                  vendors, and master chefs alike. cutiepies~ is my way of
                  sharing everything I've learned and loved.
                </p>
                <p>
                  Every dish on our menu carries a memory — a flavor I fell in
                  love with somewhere, a technique I was lucky enough to learn,
                  a story I want to share with you.
                </p>
                <p>
                  Thank you for dining with us. You are not just a guest — you
                  are family.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-burgundy text-sm uppercase tracking-widest font-medium mb-2">
              Our Passion
            </p>
            <h2 className="font-display text-4xl italic text-dark-brown font-bold">
              Four Cuisines, One Soul
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cuisineStories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:border-gold/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{c.emoji}</span>
                  <h3 className="font-display text-xl font-bold text-dark-brown italic">
                    {c.name}
                  </h3>
                </div>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {c.story}
                </p>
              </motion.div>
            ))}
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
              What We Stand For
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-cream/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-semibold text-cream mb-2">{v.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
