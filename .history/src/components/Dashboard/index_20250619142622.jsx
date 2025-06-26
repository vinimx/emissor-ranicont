import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useEffect } from "react";
import { Menu, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function DashboardContent(props) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[260px] shrink-0">
        <MenuSideBar />
      </aside>
      <main className="flex-1">{props.children}</main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardContent>
        <div className="space-y-6 mt-10 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
              <p className="text-lg" style={{ color: "var(--suave-texto)" }}>
                Visão geral do seu sistema de notas
              </p>
            </div>
            <Button
              asChild
              className="
                bg-[var(--sidebar-primaria)]
                text-[var(--primaria-texto)]
                font-medium
                transition-colors
                hover:bg-[var(--primaria-hover)]
                rounded-[var(--raio)]
              "
            >
              <Link to="/dashboard/notas/new">
                <Plus className="h-4 w-4 mr-2" />
                Emitir Nova NF-e
              </Link>
            </Button>
          </div>
        </div>
      </DashboardContent>
    </SidebarProvider>
  );
}
