import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "../Dashboard/SideBar";
import HeaderPagina from "../HeaderPagina";

export default function Produtos() {
  return (
    <SidebarProvider>
      <MenuSideBar />
      <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]"></div>
    </SidebarProvider>
  );
}
