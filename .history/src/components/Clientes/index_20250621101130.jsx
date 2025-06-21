import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";

export default function Clientes() {
  return (
    <SidebarProvider>
      <LayoutComSidebar></LayoutComSidebar>
    </SidebarProvider>
  );
}
