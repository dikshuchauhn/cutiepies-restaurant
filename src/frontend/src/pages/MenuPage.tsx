import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useRef, useState } from "react";

type Dish = { name: string; desc: string; price: string; veg?: boolean };
type Category = { id: string; name: string; emoji: string; dishes: Dish[] };

const categories: Category[] = [
  {
    id: "chinese",
    name: "Chinese",
    emoji: "🥢",
    dishes: [
      {
        name: "Hakka Noodles",
        desc: "Stir-fried noodles with seasonal vegetables and soy-ginger sauce",
        price: "₹280",
        veg: true,
      },
      {
        name: "Kung Pao Chicken",
        desc: "Tender chicken with peanuts, dried chilies, and Sichuan sauce",
        price: "₹380",
      },
      {
        name: "Dim Sum (6 pcs)",
        desc: "Steamed dumplings with vegetables or pork, chili dipping sauce",
        price: "₹320",
      },
      {
        name: "Hot & Sour Soup",
        desc: "Classic tangy soup with tofu, bamboo shoots and white pepper",
        price: "₹220",
        veg: true,
      },
      {
        name: "Crispy Spring Rolls",
        desc: "Golden-fried rolls stuffed with mixed vegetables and glass noodles",
        price: "₹260",
        veg: true,
      },
    ],
  },
  {
    id: "italian",
    name: "Italian",
    emoji: "🍝",
    dishes: [
      {
        name: "Margherita Pizza",
        desc: "San Marzano tomatoes, fresh mozzarella, basil on a crispy thin crust",
        price: "₹420",
        veg: true,
      },
      {
        name: "Pasta Carbonara",
        desc: "Spaghetti with pancetta, egg yolk, pecorino and black pepper",
        price: "₹380",
      },
      {
        name: "Mushroom Risotto",
        desc: "Arborio rice with porcini mushrooms, white wine and parmesan",
        price: "₹420",
        veg: true,
      },
      {
        name: "Bruschetta al Pomodoro",
        desc: "Grilled sourdough with fresh tomatoes, garlic, basil and olive oil",
        price: "₹240",
        veg: true,
      },
      {
        name: "Tiramisu",
        desc: "Classic mascarpone dessert with espresso-soaked ladyfingers and cocoa",
        price: "₹280",
        veg: true,
      },
    ],
  },
  {
    id: "indian",
    name: "Indian",
    emoji: "🍛",
    dishes: [
      {
        name: "Butter Chicken",
        desc: "Tender chicken in a velvety tomato-butter gravy with aromatic spices",
        price: "₹380",
      },
      {
        name: "Dal Makhani",
        desc: "Slow-cooked black lentils simmered overnight in butter and cream",
        price: "₹320",
        veg: true,
      },
      {
        name: "Chicken Biryani",
        desc: "Aromatic basmati rice layered with saffron chicken and fried onions",
        price: "₹420",
      },
      {
        name: "Paneer Tikka",
        desc: "Marinated cottage cheese grilled in tandoor with peppers and onions",
        price: "₹360",
        veg: true,
      },
      {
        name: "Garlic Naan",
        desc: "Soft leavened bread brushed with garlic butter, baked in tandoor",
        price: "₹80",
        veg: true,
      },
    ],
  },
  {
    id: "mexican",
    name: "Mexican",
    emoji: "🌮",
    dishes: [
      {
        name: "Street Tacos (3 pcs)",
        desc: "Corn tortillas with spiced chicken or black beans, salsa, lime crema",
        price: "₹340",
      },
      {
        name: "Loaded Burrito",
        desc: "Flour wrap with rice, beans, cheese, guacamole and pico de gallo",
        price: "₹380",
        veg: true,
      },
      {
        name: "Nachos Grande",
        desc: "Crispy tortilla chips with melted cheese, jalapeños, sour cream, guacamole",
        price: "₹360",
        veg: true,
      },
      {
        name: "Cheese Quesadilla",
        desc: "Grilled flour tortilla with melted cheese, peppers and chipotle sauce",
        price: "₹300",
        veg: true,
      },
      {
        name: "Churros with Chocolate",
        desc: "Crispy cinnamon-sugar churros with warm dark chocolate dipping sauce",
        price: "₹240",
        veg: true,
      },
    ],
  },
];

export function MenuPage() {
  const [active, setActive] = useState("chinese");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  function scrollTo(id: string) {
    setActive(id);
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <section className="bg-dark-brown py-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-2">
            Explore
          </p>
          <h1 className="font-display text-5xl italic text-cream font-bold mb-4">
            Our Menu
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-cream/60 max-w-xl mx-auto">
            Four cuisines, handcrafted fresh every evening. All prices inclusive
            of taxes.
          </p>
        </motion.div>
      </section>

      <div className="sticky top-16 z-30 bg-cream/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto py-3">
          {categories.map((c) => (
            <button
              type="button"
              key={c.id}
              data-ocid={`menu.${c.id}.tab`}
              onClick={() => scrollTo(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                active === c.id
                  ? "bg-burgundy text-cream shadow-warm"
                  : "text-foreground/70 hover:text-burgundy hover:bg-burgundy/5"
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {categories.map((cat, _ci) => (
          <motion.section
            key={cat.id}
            ref={(el) => {
              refs.current[cat.id] = el;
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id={cat.id}
            data-ocid={`menu.${cat.id}.section`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">{cat.emoji}</span>
              <div>
                <h2 className="font-display text-3xl italic text-dark-brown font-bold">
                  {cat.name}
                </h2>
                <div className="w-12 h-0.5 bg-gold mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.dishes.map((dish, di) => (
                <motion.div
                  key={dish.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: di * 0.05 }}
                  data-ocid={`menu.${cat.id}.item.${di + 1}`}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-all duration-300 hover:border-gold/30 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-dark-brown group-hover:text-burgundy transition-colors">
                          {dish.name}
                        </h3>
                        {dish.veg && (
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 border-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-600 block" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {dish.desc}
                      </p>
                    </div>
                    <Badge className="bg-gold/10 text-dark-brown border-gold/30 font-semibold shrink-0">
                      {dish.price}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="bg-cream-dark py-8 text-center px-4">
        <p className="text-warm-gray text-sm">
          All dishes freshly prepared. Please inform us of any dietary
          requirements or allergies.
        </p>
      </div>
    </main>
  );
}
