import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

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
      <div style={{ display: "flex" }}>
        <Sidebar
          userName={session.user?.name}
          userImage={session.user?.image}
          onSignOut={handleSignOut}
        />
        <main className="main-content">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "10px 32px",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              position: "fixed",
              top: 0,
              left: 260,
              right: 0,
              zIndex: 45,
              height: "52px",
            }}
          >
            <ThemeToggle />
          </div>
          <div style={{ paddingTop: "52px" }}>
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
