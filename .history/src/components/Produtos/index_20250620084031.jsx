import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import MenuSideBar from "../Dashboard/SideBar";
import HeaderPagina from "../HeaderPagina";

export default function Produtos() {
  return (
    <SidebarProvider>
      <MenuSideBar />
      <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
        <HeaderPagina
          titulo="Produtos"
          subtitulo="Gerencie seus produtos cadastrados"
          acao={
            <Button
              asChild
              className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
            >
              <Link to="/produtos/novo">
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Link>
            </Button>
          }
        />
        {/* Conteúdo da página de produtos aqui */}
      </div>
    </SidebarProvider>
  );
}
