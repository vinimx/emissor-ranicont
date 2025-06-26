import { SidebarProvider } from "@/components/ui/sidebar";
import MenuSideBar from "../SideBar";
import LayoutComSidebar from "../MobileSideBar"; // ajuste o caminho se necessário
import HeaderPagina from "../HeaderPagina";
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
import {
  FileText,
  Users,
  Package,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const estatisticas = [
  {
    titulo: "Notas Emitidas",
    value: "1,234",
    change: "+12%",
    icon: FileText,
    cor: "text-blue-600",
  },
  {
    titulo: "Clientes Ativos",
    value: "89",
    change: "+5%",
    icon: Users,
    cor: "text-green-600",
  },
  {
    titulo: "Produtos Cadastrados",
    value: "456",
    change: "+8%",
    icon: Package,
    cor: "text-purple-600",
  },
  {
    titulo: "Devoluções",
    value: "12",
    change: "-3%",
    icon: AlertCircle,
    cor: "text-orange-600",
  },
];

const notasRecentes = [
  {
    id: "NF-001234",
    cliente: "Empresa ABC Ltda",
    value: "R$ 2.450,00",
    status: "Autorizada",
    data: "15/01/2024",
  },
  {
    id: "NF-001235",
    cliente: "Comércio XYZ",
    value: "R$ 1.890,00",
    status: "Pendente",
    data: "15/01/2024",
  },
  {
    id: "NF-001236",
    cliente: "Indústria 123",
    value: "R$ 5.670,00",
    status: "Autorizada",
    data: "14/01/2024",
  },
  {
    id: "NF-001237",
    cliente: "Serviços DEF",
    value: "R$ 890,00",
    status: "Cancelada",
    data: "14/01/2024",
  },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
          <HeaderPagina
            titulo="Dashboard"
            subtitulo="Visão geral do seu sistema de notas"
            acao={
              <Button
                asChild
                className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
              >
                <Link to="/dashboard/notas/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Emitir Nova NF-e
                </Link>
              </Button>
            }
          />

          {/* Estatísticas */}
          <div className="grid gap-4 mt-2 md:grid-cols-2 lg:grid-cols-4">
            {estatisticas.map((estat, idx) => {
              // Defina cores de fundo e hover para cada card
              let bg = "bg-[var(--sidebar-destaque)]";
              let hover = "hover:bg-[var(--sidebar-accent)]";
              let text = "text-[var(--sidebar-texto)]";
              let icon = "text-[var(--sidebar-primaria)]";
              let value = "text-[var(--sidebar-primaria)]";
              let changePlus = "text-green-600";
              let changeMinus = "text-[var(--destrutivo)]";

              if (idx === 1) {
                bg = "bg-[var(--suave)]";
                hover = "hover:bg-[var(--sidebar-destaque)]";
              }
              if (idx === 2) {
                bg = "bg-[var(--sidebar-accent)]";
                hover = "hover:bg-[var(--suave)]";
              }

              return (
                <Card
                  key={estat.titulo}
                  className={`transition-shadow hover:shadow-lg cursor-pointer ${bg} ${hover}`}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${text}`}>
                      {estat.titulo}
                    </CardTitle>
                    <estat.icon className={`h-4 w-4 ${icon}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${value}`}>
                      {estat.value}
                    </div>
                    <p className={`text-xs ${text}`}>
                      <span
                        className={
                          estat.change.startsWith("+")
                            ? changePlus
                            : changeMinus
                        }
                      >
                        {estat.change}
                      </span>{" "}
                      em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Gráfico e Notas Recentes */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Chart Card */}
            <Card className="md:col-span-1 bg-[var(--sidebar-destaque)] hover:bg-[var(--sidebar-accent)] transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--sidebar-primaria)]">
                  <TrendingUp className="h-5 w-5 text-[var(--sidebar-primaria)]" />
                  Notas Emitidas (Últimos 30 dias)
                </CardTitle>
                <CardDescription className="text-[var(--suave-texto)]">
                  Acompanhe o volume de emissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-[var(--suave)] rounded-lg">
                  <div className="text-center text-[var(--suave-texto)]">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50 text-[var(--sidebar-primaria)]" />
                    <p>Gráfico de notas emitidas</p>
                    <p className="text-sm">(Implementação futura)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notas Recentes */}
            <Card className="md:col-span-1 bg-[var(--sidebar-accent)] hover:bg-[var(--sidebar-destaque)] transition-colors">
              <CardHeader>
                <CardTitle className="text-[var(--sidebar-accent-foreground)]">
                  Últimas Notas Fiscais
                </CardTitle>
                <CardDescription className="text-[var(--suave-texto)]">
                  Notas emitidas recentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notasRecentes.map((notasDashboard) => (
                    <div
                      key={notasDashboard.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-[var(--sidebar-fundo)] hover:shadow transition-shadow"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-[var(--sidebar-primaria)]">
                          {notasDashboard.id}
                        </p>
                        <p className="text-sm text-[var(--suave-texto)]">
                          {notasDashboard.cliente}
                        </p>
                        <p className="text-xs text-[var(--suave-texto)]">
                          {notasDashboard.data}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium text-sm text-[var(--sidebar-primaria)]">
                          {notasDashboard.value}
                        </p>
                        <span
                          className={`
                        px-2 py-1 rounded text-xs font-semibold border
                        ${
                          notasDashboard.status === "Autorizada"
                            ? "bg-green-100 text-green-700 border-green-400"
                            : notasDashboard.status === "Pendente"
                            ? "bg-[var(--sidebar-destaque)] text-[var(--sidebar-destaque-texto)] border-[var(--sidebar-borda)]"
                            : "bg-[var(--destrutivo)] text-[var(--destrutivo-texto)] border-[var(--destrutivo-texto)]"
                        }
                      `}
                        >
                          {notasDashboard.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-[var(--sidebar-primaria)] text-[var(--sidebar-primaria)] hover:bg-[var(--sidebar-primaria)] hover:text-[var(--sidebar-primaria-texto)] transition-colors"
                  asChild
                >
                  <Link to="/dashboard/notas">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Todas as Notas
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
