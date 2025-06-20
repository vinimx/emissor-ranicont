import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderPagina from "../HeaderPagina";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import MenuSideBar from "../SideBar";
import LayoutComSidebar from "../MobileSideBar";
import { Sheet, SheetTrigger } from "../ui/sheet";
export default function Produtos() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
          <HeaderPagina
            titulo="Produtos"
            subtitulo="Gerencie seus produtos cadastrados"
            acao={
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Produto
                  </Button>
                </SheetTrigger>
                {/* Conteúdo do Sheet aqui */}
              </Sheet>
            }
          />
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
