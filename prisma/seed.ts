require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@bemsbooks.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create Demo User
  const userPassword = await bcrypt.hash("demo123", 10);
  await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@bemsbooks.com",
      password: userPassword,
      role: "USER",
    },
  });

  // Create Categories
  const fiction = await prisma.category.create({
    data: { name: "Fiction", slug: "fiction" },
  });
  const sciFi = await prisma.category.create({
    data: { name: "Sci-Fi", slug: "sci-fi" },
  });
  const selfHelp = await prisma.category.create({
    data: { name: "Self-Help", slug: "self-help" },
  });
  const biography = await prisma.category.create({
    data: { name: "Biography", slug: "biography" },
  });
  const mystery = await prisma.category.create({
    data: { name: "Mystery", slug: "mystery" },
  });
  const romance = await prisma.category.create({
    data: { name: "Romance", slug: "romance" },
  });

  // Create Books
  await prisma.book.createMany({
    data: [
      // ── Fiction ───────────────────────────────────────
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        description: "Between life and death there is a library, and within it, every book tells the story of another possible life you could have lived if you had made different choices.",
        price: 12.99,
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: fiction.id,
        rating: 4.5,
        stock: 50,
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        description: "A magical fable about following your dream. A young Andalusian shepherd journeys in search of a worldly treasure.",
        price: 10.99,
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: fiction.id,
        rating: 4.6,
        stock: 120,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, a tale of the American dream.",
        price: 11.99,
        coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: fiction.id,
        rating: 4.4,
        stock: 40,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A novel of warmth and humor despite dealing with the serious issues of rape and racial inequality in the American deep south.",
        price: 9.99,
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: fiction.id,
        rating: 4.8,
        stock: 90,
      },
      {
        title: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        description: "The brilliant, bestselling, landmark novel that tells the story of the Buendia family and reflects a century of turbulent Latin American history.",
        price: 13.99,
        coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: fiction.id,
        rating: 4.7,
        stock: 55,
      },

      // ── Sci-Fi ────────────────────────────────────────
      {
        title: "Project Hail Mary",
        author: "Andy Weir",
        description: "A lone astronaut must save the earth from disaster in this propulsive, first-person thriller set in outer space.",
        price: 15.99,
        coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: sciFi.id,
        rating: 4.8,
        stock: 30,
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
        price: 18.99,
        coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: sciFi.id,
        rating: 4.7,
        stock: 45,
      },
      {
        title: "1984",
        author: "George Orwell",
        description: "Among the seminal texts of the 20th century, 1984 is a rare work that grows more haunting as its futuristic purgatory becomes more real.",
        price: 9.99,
        coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: sciFi.id,
        rating: 4.9,
        stock: 60,
      },
      {
        title: "Neuromancer",
        author: "William Gibson",
        description: "The groundbreaking cyberpunk novel that launched an entire genre. A washed-up computer hacker is hired for the ultimate hack.",
        price: 14.99,
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: sciFi.id,
        rating: 4.5,
        stock: 35,
      },
      {
        title: "The Left Hand of Darkness",
        author: "Ursula K. Le Guin",
        description: "A groundbreaking work of science fiction about a lone human emissary to a world where the inhabitants can choose their gender.",
        price: 11.99,
        coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: sciFi.id,
        rating: 4.6,
        stock: 50,
      },

      // ── Self-Help ─────────────────────────────────────
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "An easy and proven way to build good habits and break bad ones. Transform tiny behaviors into remarkable results.",
        price: 14.50,
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: selfHelp.id,
        rating: 4.9,
        stock: 100,
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        description: "Rules for focused success in a distracted world. Professional activities performed in a state of distraction-free concentration.",
        price: 13.99,
        coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: selfHelp.id,
        rating: 4.8,
        stock: 80,
      },
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        description: "The major driver behind behavioral economics. Kahneman takes us on a groundbreaking tour of the mind.",
        price: 16.50,
        coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: selfHelp.id,
        rating: 4.7,
        stock: 75,
      },
      {
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        description: "A principle-centered approach for solving personal and professional problems. A holistic, integrated approach to living.",
        price: 15.99,
        coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: selfHelp.id,
        rating: 4.6,
        stock: 65,
      },
      {
        title: "The Power of Now",
        author: "Eckhart Tolle",
        description: "A guide to spiritual enlightenment that has transformed the lives of millions. Be present, find peace, and discover your true self.",
        price: 12.99,
        coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: selfHelp.id,
        rating: 4.5,
        stock: 70,
      },

      // ── Biography ─────────────────────────────────────
      {
        title: "Steve Jobs",
        author: "Walter Isaacson",
        description: "The exclusive biography of Apple co-founder Steve Jobs based on over forty interviews conducted over two years.",
        price: 19.99,
        coverImage: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: biography.id,
        rating: 4.7,
        stock: 45,
      },
      {
        title: "Becoming",
        author: "Michelle Obama",
        description: "An intimate, powerful, and inspiring memoir by the former First Lady of the United States, tracing her journey from Chicago to the White House.",
        price: 17.99,
        coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: biography.id,
        rating: 4.8,
        stock: 55,
      },
      {
        title: "A Promised Land",
        author: "Barack Obama",
        description: "A riveting, deeply personal account of history in the making — from the president who inspired us to believe in the power of democracy.",
        price: 22.99,
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: biography.id,
        rating: 4.6,
        stock: 40,
      },
      {
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        description: "The definitive edition of the diary that has become a modern classic and one of the most compelling accounts of the Holocaust.",
        price: 8.99,
        coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: biography.id,
        rating: 4.9,
        stock: 85,
      },

      // ── Mystery ───────────────────────────────────────
      {
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        description: "A spellbinding amalgam of murder mystery, family saga, love story, and financial intrigue set in Sweden.",
        price: 14.99,
        coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: mystery.id,
        rating: 4.5,
        stock: 50,
      },
      {
        title: "Gone Girl",
        author: "Gillian Flynn",
        description: "On the morning of his fifth wedding anniversary, Nick Dunne's wife Amy disappears. Under mounting pressure, the picture-perfect husband begins to seem less and less perfect.",
        price: 13.99,
        coverImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: mystery.id,
        rating: 4.6,
        stock: 60,
      },
      {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        description: "A shocking psychological thriller of a woman's act of violence against her husband — and the therapist obsessed with uncovering her motive.",
        price: 15.99,
        coverImage: "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: mystery.id,
        rating: 4.7,
        stock: 55,
      },
      {
        title: "And Then There Were None",
        author: "Agatha Christie",
        description: "Ten strangers are lured to an isolated island, accused of crimes they thought were long forgotten. One by one, they begin to die.",
        price: 10.99,
        coverImage: "https://images.unsplash.com/photo-1509266272358-7701da638078?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: mystery.id,
        rating: 4.8,
        stock: 70,
      },
      {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        description: "A murder in the Louvre reveals a sinister plot to uncover a secret that has been protected since the days of Christ.",
        price: 12.99,
        coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: mystery.id,
        rating: 4.3,
        stock: 80,
      },

      // ── Romance ───────────────────────────────────────
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        description: "The story of Elizabeth Bennet and Mr. Darcy, a classic tale of love, misunderstanding, and the triumph of wit over pride.",
        price: 8.99,
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: romance.id,
        rating: 4.8,
        stock: 95,
      },
      {
        title: "The Notebook",
        author: "Nicholas Sparks",
        description: "A man with a fading memory reads from a worn notebook the story of a love that will endure for all time.",
        price: 11.99,
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: romance.id,
        rating: 4.5,
        stock: 65,
      },
      {
        title: "Me Before You",
        author: "Jojo Moyes",
        description: "A heartbreakingly romantic novel about two people who couldn't be more different, and a love that knows no bounds.",
        price: 13.99,
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: romance.id,
        rating: 4.6,
        stock: 50,
      },
      {
        title: "Outlander",
        author: "Diana Gabaldon",
        description: "An extraordinary tale of adventure and romance that begins on a Scottish battlefield and ends with an unlikely union between two people torn apart by time.",
        price: 16.99,
        coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: romance.id,
        rating: 4.7,
        stock: 40,
      },
      {
        title: "The Time Traveler's Wife",
        author: "Audrey Niffenegger",
        description: "A dazzling novel in the tradition of The English Patient, a tale of a love so transcendent it can bend time.",
        price: 14.99,
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop&crop=entropy",
        categoryId: romance.id,
        rating: 4.4,
        stock: 45,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
