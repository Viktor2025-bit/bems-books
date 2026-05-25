const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

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

  // Create Books
  await prisma.book.createMany({
    data: [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        description: "Between life and death there is a library...",
        price: 12.99,
        coverImage: "/books/midnight-library.jpg",
        categoryId: fiction.id,
        rating: 4.5,
        stock: 50,
      },
      {
        title: "Project Hail Mary",
        author: "Andy Weir",
        description: "A lone astronaut must save the earth...",
        price: 15.99,
        coverImage: "/books/project-hail-mary.jpg",
        categoryId: sciFi.id,
        rating: 4.8,
        stock: 30,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "An easy and proven way to build good habits...",
        price: 14.50,
        coverImage: "/books/atomic-habits.jpg",
        categoryId: selfHelp.id,
        rating: 4.9,
        stock: 100,
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
