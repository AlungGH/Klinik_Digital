import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";

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
    <ThemeProvider>
      <AppShell
        userName={session.user?.name}
        userImage={session.user?.image}
        onSignOut={handleSignOut}
      >
        {children}
      </AppShell>
    </ThemeProvider>
  );
}
