import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "../SideBar";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Menu } from "lucide-react";

export default function LayoutComSidebar({ children }) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile && openMobile) setOpenMobile(false);
  }, [isMobile, openMobile, setOpenMobile]);

  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    setOpenMobile(!openMobile);
  };

  return (
    <>
      {/* Botão menu-hamburger fora do Sheet quando fechado */}
      {isMobile && !openMobile && (
        <button
          className="md:hidden fixed top-4 left-4 z-[999] bg-[var(--primaria)] text-white p-2 shadow-lg border-2 rounded-[var(--raio)] border-[var(--sidebar-borda)]"
          onClick={handleHamburgerClick}
          aria-label="Abrir menu"
          type="button"
        >
          <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
        </button>
      )}
      <div className="flex">
        <MenuSideBar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
