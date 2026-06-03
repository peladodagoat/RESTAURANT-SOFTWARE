const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const menuItems = [
  // STARTERS
  {
    name: 'Bruschetta al Pomodoro',
    description: 'Toasted sourdough topped with fresh Roma tomatoes, basil, garlic, and a drizzle of extra-virgin olive oil.',
    price: 8.50,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80',
    allergens: ['Gluten'],
    available: true,
  },
  {
    name: 'Calamari Fritti',
    description: 'Lightly battered and fried squid rings served with marinara sauce and a wedge of lemon.',
    price: 13.00,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
    allergens: ['Gluten', 'Shellfish'],
    available: true,
  },
  {
    name: 'Caprese Classica',
    description: 'Buffalo mozzarella, vine-ripened tomatoes, fresh basil, aged balsamic glaze, and sea salt.',
    price: 11.00,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80',
    allergens: ['Dairy'],
    available: true,
  },
  {
    name: 'Zuppa del Giorno',
    description: "Chef's daily soup made from seasonal vegetables with a slice of rustic bread.",
    price: 7.50,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
    allergens: ['Gluten'],
    available: true,
  },
  // MAINS
  {
    name: 'Spaghetti alla Carbonara',
    description: 'Spaghetti with guanciale, Pecorino Romano, egg yolk, and freshly cracked black pepper.',
    price: 17.50,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    available: true,
  },
  {
    name: 'Pizza Margherita',
    description: 'Neapolitan pizza with San Marzano tomato sauce, fior di latte mozzarella, and fresh basil.',
    price: 15.00,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    allergens: ['Gluten', 'Dairy'],
    available: true,
  },
  {
    name: 'Lasagna della Nonna',
    description: 'Slow-cooked Bolognese ragù layered with fresh pasta sheets, béchamel, and Parmigiano Reggiano.',
    price: 18.50,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    available: true,
  },
  {
    name: 'Risotto ai Funghi',
    description: 'Arborio rice with wild porcini and cremini mushrooms, white wine, Parmigiano, and truffle oil.',
    price: 19.00,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
    allergens: ['Dairy'],
    available: true,
  },
  {
    name: 'Branzino al Forno',
    description: 'Oven-roasted sea bass with capers, olives, cherry tomatoes, white wine, and rosemary.',
    price: 24.00,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
    allergens: ['Fish'],
    available: true,
  },
  {
    name: 'Pollo alla Parmigiana',
    description: 'Breaded chicken breast topped with tomato sauce, melted mozzarella, and Parmigiano, served with roasted vegetables.',
    price: 21.00,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&q=80',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    available: true,
  },
  // DESSERTS
  {
    name: 'Tiramisù',
    description: 'Classic Italian dessert with mascarpone cream, espresso-soaked ladyfingers, and cocoa powder.',
    price: 7.50,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    available: true,
  },
  {
    name: 'Panna Cotta',
    description: 'Silky vanilla panna cotta served with a wild berry coulis.',
    price: 6.50,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    allergens: ['Dairy'],
    available: true,
  },
  {
    name: 'Cannoli Siciliani',
    description: 'Crispy pastry shells filled with sweetened ricotta, chocolate chips, and candied orange peel.',
    price: 8.00,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    allergens: ['Gluten', 'Dairy'],
    available: true,
  },
  {
    name: 'Gelato Artigianale',
    description: 'Two scoops of house-made artisan gelato — choose from pistachio, stracciatella, or lemon sorbet.',
    price: 6.00,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80',
    allergens: ['Dairy'],
    available: true,
  },
  // DRINKS
  {
    name: 'Acqua Minerale',
    description: 'Still or sparkling mineral water — 750 ml bottle.',
    price: 3.50,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    allergens: [],
    available: true,
  },
  {
    name: 'Vino della Casa',
    description: 'House wine — select red, white, or rosé. Served by the glass (200 ml).',
    price: 6.50,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
    allergens: ['Sulphites'],
    available: true,
  },
  {
    name: 'Espresso',
    description: 'Short, intense Italian espresso made with our signature blend of Arabica beans.',
    price: 3.00,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80',
    allergens: [],
    available: true,
  },
  {
    name: 'Limoncello',
    description: 'Authentic Amalfi limoncello served ice-cold in a chilled glass.',
    price: 5.50,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
    allergens: [],
    available: true,
  },
  {
    name: 'Aperol Spritz',
    description: 'Classic Italian aperitif with Aperol, Prosecco, a splash of soda, and an orange slice.',
    price: 8.00,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&q=80',
    allergens: ['Sulphites'],
    available: true,
  },
];

async function main() {
  console.log('Seeding database with Bella Vista demo data...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log(`Seeded ${menuItems.length} menu items.`);
  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
