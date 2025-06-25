import { Save, Building, Shield, Bell, Palette } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function Configurações() {
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Configurações"
            subtitulo="Gerencie as configurações do sistema"
            acao={
              <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            }
          />
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="company"
                className="flex items-center justify-center"
              >
                <Building className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="fiscal" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Fiscal
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
