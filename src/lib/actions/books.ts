import { db } from "@/lib/db";

export async function getBooks() {
  try {
    const books = await db.book.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export async function getBookById(id: string) {
  try {
    const book = await db.book.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return book;
  } catch (error) {
    console.error("Error fetching book by id:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
