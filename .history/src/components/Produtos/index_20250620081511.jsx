import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "../Dashboard/SideBar";
import DashboardContent from "../Dashboard"; // ou o caminho correto do seu layout

export default function Produtos() {
  return (
    <SidebarProvider>
      <DashboardContent>
        {/* Conteúdo da página de produtos */}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Produtos</h2>
          {/* Adicione aqui a listagem ou formulário de produtos */}
        </div>
      </DashboardContent>
    </SidebarProvider>
  );
}
