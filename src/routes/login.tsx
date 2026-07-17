import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — ITPlacementX" },
      { name: "description", content: "Sign in to your ITPlacementX account." }
    ]
  }),
  component: Login,
});

function Login() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground p-6 sm:p-12 overflow-hidden">
      <div className="absolute inset-0 bg-radial-brand opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <main className="relative z-10 my-auto flex items-center justify-center py-12">
        <div className="w-full max-w-md text-center glass border border-white/10 p-8 rounded-2xl bg-card/40 backdrop-blur-md">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Login Page</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Authentication is ready to be built from scratch. You can implement your Firebase Auth fields and registration flows in this component.
          </p>
        </div>
      </main>

      <footer className="relative z-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ITPlacementX. All rights reserved.
      </footer>
    </div>
  );
}