import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[var(--primaria)] text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
      </button>
      <div className="flex">
        <MenuSideBar />
        <div className="flex-1">{/* Conteúdo principal do dashboard */}</div>
      </div>
    </SidebarProvider>
  );
}
