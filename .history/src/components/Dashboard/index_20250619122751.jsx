import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useEffect } from "react";
import { Menu } from "lucide-react";

function DashboardContent() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  // Fecha o sidebar ao mudar para desktop
  useEffect(() => {
    if (!isMobile && openMobile) setOpenMobile(false);
  }, [isMobile, openMobile, setOpenMobile]);

  return (
    <>
      {/* Botão menu-hamburger para mobile */}
      {isMobile && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[var(--primaria)] text-white p-2 rounded"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
        </button>
      )}
      <div className="flex">
        {/* Sidebar responsivo: Sheet no mobile, Sidebar tradicional no desktop */}
        <MenuSideBar />
        <div className="flex-1">{/* Conteúdo principal */}</div>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
