import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminState } from "@/components/admin/AdminState";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminState>
      <Outlet />
    </AdminState>
  );
}
