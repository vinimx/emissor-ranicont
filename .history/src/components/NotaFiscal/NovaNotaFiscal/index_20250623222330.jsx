import { SidebarProvider } from "../../ui/sidebar";
import LayoutComSidebar from "../../MobileSideBar";
import HeaderPagina from "../../HeaderPagina";
import { Button } from "../../ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function NovaNotaFiscal() {
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Emitir Nova NF-e"
            subtitulo="Preencha os dados para emitir uma nova nota fiscal eletrônica"
            acao={
              <Button
                asChild
                className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
              >
                <Link to="/nova">
                  <FileText className="h-4 w-4 mr-2" />
                  Emitir NF-e
                </Link>
              </Button>
            }
          />
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
