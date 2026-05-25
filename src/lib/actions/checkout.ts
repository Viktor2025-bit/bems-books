"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function processDemoPurchase(items: any[]) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  try {
    const totalAmount = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    // 1. Create the Order
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        status: "COMPLETED",
        items: {
          create: items.map((item) => ({
            bookId: item.id,
            price: item.price,
          })),
        },
      },
    });

    // 2. Add books to the User's Library
    for (const item of items) {
      await db.userBook.upsert({
        where: {
          userId_bookId: {
            userId: session.user.id,
            bookId: item.id,
          },
        },
        update: {
          lastRead: new Date(),
        },
        create: {
          userId: session.user.id,
          bookId: item.id,
          progress: 0,
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Purchase error:", error);
    return { error: "Failed to process purchase" };
  }
}
