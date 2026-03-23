export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: "starters" | "mains" | "desserts" | "drinks";
  image: string;
}

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Burrata & Heirloom Tomato",
    description:
      "Creamy burrata with roasted heirloom tomatoes, basil oil, and aged balsamic reduction.",
    price: "$18",
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80",
  },
  {
    id: 2,
    name: "Seared Foie Gras",
    description:
      "Pan-seared duck foie gras with brioche toast, fig compote, and Sauternes gel.",
    price: "$32",
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80",
  },
  {
    id: 3,
    name: "Lobster Bisque",
    description:
      "Velvety Maine lobster bisque with crème fraîche, chive oil, and a cognac flambe crust.",
    price: "$24",
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
  },
  {
    id: 4,
    name: "Tuna Tartare",
    description:
      "Yellowfin tuna with avocado, sesame-yuzu dressing, micro greens, and crispy wonton.",
    price: "$22",
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80",
  },
  // Mains
  {
    id: 5,
    name: "Dry-Aged Wagyu Ribeye",
    description:
      "28-day dry-aged A5 Wagyu with truffle jus, roasted bone marrow, and seasonal vegetables.",
    price: "$95",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
  },
  {
    id: 6,
    name: "Pan-Roasted Sea Bass",
    description:
      "Chilean sea bass with saffron beurre blanc, fennel confit, and crispy capers.",
    price: "$58",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
  },
  {
    id: 7,
    name: "Herb-Roasted Rack of Lamb",
    description:
      "New Zealand lamb with rosemary-dijon crust, roasted garlic purée, and red wine reduction.",
    price: "$72",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  },
  {
    id: 8,
    name: "Wild Mushroom Risotto",
    description:
      "Carnaroli risotto with porcini, chanterelle, black truffle shavings, and aged Parmigiano.",
    price: "$42",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
  },
  // Desserts
  {
    id: 9,
    name: "Valrhona Chocolate Fondant",
    description:
      "Warm dark chocolate cake with a molten center, Tahitian vanilla ice cream, and gold leaf.",
    price: "$18",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
  },
  {
    id: 10,
    name: "Crème Brûlée",
    description:
      "Classic vanilla bean custard with a caramelized sugar crust and fresh berry compote.",
    price: "$14",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&q=80",
  },
  {
    id: 11,
    name: "Tarte Tatin",
    description:
      "Caramelized Granny Smith apple tart with Calvados chantilly and salted caramel ice cream.",
    price: "$16",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&q=80",
  },
  {
    id: 12,
    name: "Passion Fruit Panna Cotta",
    description:
      "Silky panna cotta with passion fruit curd, mango coulis, and coconut tuile.",
    price: "$15",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&q=80",
  },
  // Drinks
  {
    id: 13,
    name: "Château Margaux 2016",
    description:
      "Premier Grand Cru Classé. Notes of blackcurrant, cedar, and violet. Full-bodied elegance.",
    price: "$320",
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
  },
  {
    id: 14,
    name: "Bella Vista Signature Cocktail",
    description:
      "Aged rum, house-made falernum, fresh lime, and a float of golden Champagne. Served chilled.",
    price: "$24",
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  },
  {
    id: 15,
    name: "Artisan Espresso Martini",
    description:
      "Cold-brew espresso, premium vodka, Kahlúa, and a hint of cardamom. Served with three beans.",
    price: "$22",
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1607446045875-d16d8f10ee0c?w=600&q=80",
  },
  {
    id: 16,
    name: "Sommelier's Wine Flight",
    description:
      "Three curated pours selected by our sommelier to complement your meal. Changes seasonally.",
    price: "$55",
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80",
  },
];

export const categories = [
  { id: "starters", label: "Starters", icon: "🥗" },
  { id: "mains", label: "Mains", icon: "🍽️" },
  { id: "desserts", label: "Desserts", icon: "🍰" },
  { id: "drinks", label: "Drinks", icon: "🍷" },
] as const;
