import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserLibrary, getUserOrders } from "@/lib/actions/user";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const library = await getUserLibrary();
  const orders = await getUserOrders();

  return (
    <DashboardContent 
      user={session.user} 
      library={library} 
      orders={orders} 
    />
  );
}
