import { SidebarProvider } from "../ui/sidebar";
import MenuSideBar from "./SideBar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex">
        <MenuSideBar />;
      </div>
      <div className="flex">{/* Conteúdo principal do dashboard */}</div>
    </SidebarProvider>
  );
}
