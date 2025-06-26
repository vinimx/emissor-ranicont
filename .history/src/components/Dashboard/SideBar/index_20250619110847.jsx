import { BarChart3, Home, Package, Settings, Users, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

// // Exemplo de menuItems
// const menuItems = [
//   { title: "Dashboard", url: "/dashboard", icon: Home },
//   { title: "Produtos", url: "/produtos", icon: Package },
//   { title: "Clientes", url: "/clientes", icon: Users },
//   { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
//   { title: "Configurações", url: "/configuracoes", icon: Settings },
// ];

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
              background: "var(--sidebar-primaria)",
              borderRadius: "var(--raio)",
            }}
            className="p-2"
          >
            <Logo className="h-5 w-5" />
          </div>
          <div>
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--sidebar-primaria)" }}
            >
              Emissor Ranicont
            </h2>
            <p
              className="text-xs"
              style={{ color: "var(--sidebar-accent-foreground)" }}
            >
              Sistema de NF-e
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            style={{ color: "var(--sidebar-accent-foreground)" }}
          >
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
          <SidebarGroupLabel
            style={{ color: "var(--sidebar-accent-foreground)" }}
          >
            Ações Rápidas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Button
              asChild
              className="w-full font-medium transition-colors"
              style={{
                background: "var(--sidebar-primaria)",
                color: "var(--sidebar-primaria-texto)",
                borderRadius: "var(--raio)",
              }}
            >
              <Link to="/dashboard/invoices/new" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Emitir Nova NF-e
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className="border-t"
        style={{
          borderColor: "var(--sidebar-borda)",
        }}
      >
        <div className="p-2">
          <div
            className="text-xs"
            style={{ color: "var(--sidebar-accent-foreground)" }}
          >
            Escritório de Contabilidade
          </div>
          <div
            className="text-sm font-medium"
            style={{ color: "var(--sidebar-primaria)" }}
          >
            Contabilidade XYZ
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
