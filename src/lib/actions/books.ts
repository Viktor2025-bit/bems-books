import { db } from "@/lib/db";

export async function getBooks(filters?: {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) {
  try {
    const where: any = {};

    if (filters?.query) {
      where.OR = [
        { title: { contains: filters.query, mode: "insensitive" } },
        { author: { contains: filters.query, mode: "insensitive" } },
      ];
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    if (filters?.minRating !== undefined) {
      where.rating = { gte: filters.minRating };
    }

    const books = await db.book.findMany({
      where,
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
