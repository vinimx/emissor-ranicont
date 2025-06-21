import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";

export default function Clientes() {
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]"></div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
