import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[var(--primaria)] text-white p-2 rounded"
        onClick={() => setOpen(true)}
      ></button>
      <div className="flex">
        <MenuSideBar />
        <div className="flex-1">{/* Conteúdo principal do dashboard */}</div>
      </div>
    </SidebarProvider>
  );
}
