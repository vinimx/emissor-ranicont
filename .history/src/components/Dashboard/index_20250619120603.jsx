import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      {/* Botão menu-hamburger para mobile*/}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[var(--primaria)] text-white p-2 rounded"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
      </button>

      {/* Sidebar: hidden no mobile, flex no desktop */}
      <div className="flex">
        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`
            fixed z-50 top-0 left-0 h-full transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0 md:block
          `}
          style={{ width: 260 }}
        >
          <MenuSideBar />
        </div>

        <div className="flex-1">{/* Conteúdo principal */}</div>
      </div>
    </SidebarProvider>
  );
}
