import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        userName={session.user?.name}
        userImage={session.user?.image}
        onSignOut={handleSignOut}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
