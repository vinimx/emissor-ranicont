import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import MenuSideBar from "./SideBar";
import { useEffect } from "react";
import { Menu, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const estatiscas = [
  {
    title: "Notas Emitidas",
    value: "1,234",
    change: "+12%",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Clientes Ativos",
    value: "89",
    change: "+5%",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Produtos Cadastrados",
    value: "456",
    change: "+8%",
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Devoluções",
    value: "12",
    change: "-3%",
    icon: AlertCircle,
    color: "text-orange-600",
  },
];

function DashboardContent(props) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  // Fecha o sidebar ao mudar para desktop
  useEffect(() => {
    if (!isMobile && openMobile) setOpenMobile(false);
  }, [isMobile, openMobile, setOpenMobile]);

  // Função toggle para garantir fechamento/abertura correta
  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    setOpenMobile(!openMobile);
  };

  return (
    <>
      {/* Botão menu-hamburger fora do Sheet quando fechado */}
      {isMobile && !openMobile && (
        <button
          className="md:hidden fixed top-4 left-4 z-[999] bg-[var(--primaria)] text-white p-2 rounded shadow-lg border-2 rounded-[var(--raio)]  border-[var(--sidebar-borda)]"
          onClick={handleHamburgerClick}
          aria-label="Abrir menu"
          type="button"
        >
          <Menu className="h-6 w-6" style={{ color: "var(--destaque)" }} />
        </button>
      )}
      <div className="flex">
        {/* Sidebar responsivo: Sheet no mobile, Sidebar tradicional no desktop */}
        <MenuSideBar />
        <div className="flex-1">{props.children} </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider className="contents">
      <DashboardContent>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {estatisticas.map((estat) => (
              <Card key={estat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {estat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${estat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span
                      className={
                        estat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {estat.change}
                    </span>{" "}
                    em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Chart Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Notas Emitidas (Últimos 30 dias)
                </CardTitle>
                <CardDescription>
                  Acompanhe o volume de emissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Gráfico de notas emitidas</p>
                    <p className="text-sm">(Implementação futura)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notas Recentes */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Últimas Notas Fiscais</CardTitle>
                <CardDescription>Notas emitidas recentemente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.client}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {invoice.date}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium text-sm">{invoice.value}</p>
                        <Badge
                          variant={
                            invoice.status === "Autorizada"
                              ? "default"
                              : invoice.status === "Pendente"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/invoices">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Todas as Notas
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardContent>
    </SidebarProvider>
  );
}
