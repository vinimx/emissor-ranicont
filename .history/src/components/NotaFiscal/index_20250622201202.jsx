import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";

export default function NotaFiscal() {
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6">
          <HeaderPagina
            titulo="Notas Fiscais"
            subtitulo="Gerencie todas as notas fiscais emitidas"
          />
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
