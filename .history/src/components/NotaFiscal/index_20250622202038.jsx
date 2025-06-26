import { Plus, Sheet } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";

export default function NotaFiscal() {
  const [abrirSheet, setAbrirSheet] = useState(false);

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6">
          <HeaderPagina
            titulo="Notas Fiscais"
            subtitulo="Gerencie todas as notas fiscais emitidas"
          />
          <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
            <SheetTrigger asChild>
              <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
