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

  // Função toggle para garantir fechamento/abertura correta
  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    setOpenMobile((prev) => !prev);
  };

  return (
    <>
      {/* Botão menu-hamburger sempre visível no mobile, estilizado e não sobrepondo o logo */}
      {isMobile && (
        <button
          className="md:hidden fixed top-4 left-4 z-[999] bg-[var(--primaria)] text-white p-2 rounded shadow-lg"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: "2px solid var(--sidebar-borda)" }}
          onClick={handleHamburgerClick}
          aria-label={openMobile ? 'Fechar menu' : 'Abrir menu'}
        >
          <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
        </button>
      )}
      <div className="flex">
        {/* Sidebar responsivo: Sheet no mobile, Sidebar tradicional no desktop */}
        <div className={isMobile ? "pt-16" : ""} style={isMobile ? { minWidth: 0 } : {}}>
          <MenuSideBar />
        </div>
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
