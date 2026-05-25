import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getUserLibrary() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const library = await db.userBook.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        book: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        lastRead: "desc",
      },
    });

    return library;
  } catch (error) {
    console.error("Error fetching user library:", error);
    return [];
  }
}

export async function updateReadingProgress(bookId: string, progress: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  try {
    const userBook = await db.userBook.update({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
        },
      },
      data: {
        progress,
        lastRead: new Date(),
        isFinished: progress >= 100,
      },
    });

    return { success: true, data: userBook };
  } catch (error) {
    console.error("Error updating reading progress:", error);
    return { error: "Failed to update progress" };
  }
}

export async function getUserOrders() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const orders = await db.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            book: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}
