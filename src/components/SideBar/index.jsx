import { Home, Package, Settings, Users, Plus, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { LogOut } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Produtos", url: "/produtos", icon: Package },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Notas Fiscais", url: "/notas", icon: FileText },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export default function MenuSideBar() {
  return (
    <Sidebar
      style={{
        background: "var(--sidebar-fundo)",
        color: "var(--sidebar-texto)",
        borderRight: "1px solid var(--sidebar-borda)",
      }}
    >
      <SidebarHeader
        className="border-b"
        style={{
          borderColor: "var(--sidebar-borda)",
        }}
      >
        <div className="flex items-center gap-2 px-2 py-2">
          <div
            style={{
              background: "var(--sidebar-fundo)",
              borderRadius: "var(--raio)",
            }}
            className="p-2"
          >
            <Logo className="h-2 w-2" />
          </div>
          <div>
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--sidebar-primaria)" }}
            >
              Emissor Ranicont
            </h2>
            <p className="text-xs" style={{ color: "var(--suave-texto)" }}>
              Sistema de NF-e
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: "var(--suave-texto)" }}>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center gap-2"
                      style={{
                        color: "var(--sidebar-texto)",
                        borderRadius: "var(--raio)",
                        transition: "background 0.2s",
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel style={{ color: "var(--suave-texto)" }}>
            Ações Rápidas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Button
              className="
                w-full
                bg-[var(--sidebar-primaria)]
                text-[var(--primaria-texto)]
                rounded-[var(--raio)]
                py-3
                font-medium
                transition-colors
                hover:bg-[var(--primaria-hover)]
              "
            >
              <Link to="/nova" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Emitir Nova NF-e
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-[var(--sidebar-destaque)] shadow-inner">
        <div className="flex items-center justify-between p-3">
          <div>
            <div className="text-base font-bold text-[var(--sidebar-primaria)]">
              Escritório de Contabilidade
            </div>
            <div className="text-xs text-[var(--sidebar-accent-foreground)]">
              Empresa logada
            </div>
          </div>
          <Link
            to="/logout"
            title="Sair do sistema"
            className="
              inline-flex items-center justify-center
              p-2 rounded
              transition
              hover:bg-[var(--destrutivo)]/15
              focus:outline-none focus:ring-2 focus:ring-[var(--destrutivo)]
              group
            "
          >
            <LogOut
              className="
                h-4 w-4
                text-[var(--destrutivo)]
                transition
                group-hover:scale-110
                group-hover:text-[var(--destrutivo)]
                group-active:opacity-80
              "
            />
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
