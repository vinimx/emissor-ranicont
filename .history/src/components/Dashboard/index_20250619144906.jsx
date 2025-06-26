import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useEffect } from "react";
import { Menu, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function DashboardContent(props) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  // Fecha o sidebar ao mudar para desktop
  useEffect(() => {
    if (!isMobile && openMobile) setOpenMobile(false);
  }, [isMobile, openMobile, setOpenMobile]);

  // Função toggle para garantir fechamento/abertura correta
  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    setOpenMobile(!openMobile);
  };

  return (
    <>
      {/* Botão menu-hamburger fora do Sheet quando fechado */}
      {isMobile && !openMobile && (
        <button
          className="md:hidden fixed top-4 left-4 z-[999] bg-[var(--primaria)] text-white p-2 rounded shadow-lg border-2 rounded-[var(--raio)]  border-[var(--sidebar-borda)]"
          onClick={handleHamburgerClick}
          aria-label="Abrir menu"
          type="button"
        >
          <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
        </button>
      )}
      <div className="flex">
        {/* Sidebar tradicional só no desktop */}
        <div className="hidden md:block w-[260px] shrink-0">
          <MenuSideBar />
        </div>
        {/* Sidebar overlay (sheet/drawer) no mobile */}
        {isMobile && openMobile && (
          <div className="fixed inset-0 z-[1000] bg-black/40">
            <div className="absolute top-0 left-0 w-[260px] h-full bg-[var(--sidebar-fundo)] shadow-lg">
              <MenuSideBar />
            </div>
          </div>
        )}
        <div className="flex-1">
          {props.children}{" "}
          {/* <-- Isso é obrigatório para mostrar o conteúdo */}
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardContent>
        <div className="mt-20 md:mt-10 m-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
              <p className="text-lg" style={{ color: "var(--suave-texto)" }}>
                Visão geral do seu sistema de notas
              </p>
            </div>
            <Button
              asChild
              className="
                bg-[var(--sidebar-primaria)]
                text-[var(--primaria-texto)]
                font-medium
                transition-colors
                hover:bg-[var(--primaria-hover)]
                rounded-[var(--raio)]
              "
            >
              <Link to="/dashboard/notas/new">
                <Plus className="h-4 w-4 mr-2" />
                Emitir Nova NF-e
              </Link>
            </Button>
          </div>
        </div>
      </DashboardContent>
    </SidebarProvider>
  );
}
