import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";

export default function Configurações() {
  return (
    <SidebarProvider>
      <LayoutComSidebar></LayoutComSidebar>
    </SidebarProvider>
  );
}
