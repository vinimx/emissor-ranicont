import { Plus } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function NotaFiscal() {
  const [abrirSheet, setAbrirSheet] = useState(false);

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6">
          <HeaderPagina
            titulo="Notas Fiscais"
            subtitulo="Gerencie todas as notas fiscais emitidas"
            acao={
              <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
                <SheetTrigger asChild>
                  <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Emitir Nova NF-e
                  </Button>
                </SheetTrigger>
              </Sheet>
            }
          />
          <Card>
            <CardHeader>
              <CardTitle>Lista de notas Fiscais</CardTitle>
              <CardDescription>
                {filteredInvoices.length} nota(s) encontrada(s)
              </CardDescription>
              <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número, cliente ou documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            </CardHeader>
          </Card>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
