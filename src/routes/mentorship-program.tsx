import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/mentorship-program")({
  component: () => <Outlet />,
});
