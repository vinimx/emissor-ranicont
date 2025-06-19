import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex">
        <MenuSideBar />
        <div className="flex-1">
          {/* Conteúdo principal do dashboard */}
        </div>
      </div>
    </SidebarProvider>
  );
}
