import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "../Dashboard/SideBar";

export default function Produtos() {
  return (
    <SidebarProvider>
      <MenuSideBar />
      {/* Adicione aqui o conteúdo da página de produtos */}
    </SidebarProvider>
  );
}
