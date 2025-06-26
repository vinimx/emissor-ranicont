import { Plus } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { SidebarProvider } from "../ui/sidebar";

export default function Clientes() {
    const   const [abrirSheet, setAbrirSheet] = React.useState(false);
    
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
          <HeaderPagina
            titulo="Clientes"
            subtitulo="Gerencie seus clientes cadastrados"
            acao={
              <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
                <SheetTrigger asChild>
                  <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Cliente
                  </Button>
                </SheetTrigger>
              </Sheet>
            }
          ></HeaderPagina>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
