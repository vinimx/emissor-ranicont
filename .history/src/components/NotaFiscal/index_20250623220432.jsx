import { Plus, Search, FileText, Eye, Download, X } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

const notas = [
  {
    id: 1,
    numero: "0001",
    cliente: "João da Silva",
    documento: "123.456.789-00",
    valor: 1500.5,
    data: "2024-06-01",
    status: "Autorizada",
    serie: "1",
  },
  {
    id: 2,
    numero: "0002",
    cliente: "Maria Oliveira",
    documento: "987.654.321-00",
    valor: 2300.0,
    data: "2024-06-10",
    status: "Pendente",
    serie: "1",
  },
  {
    id: 3,
    numero: "0003",
    cliente: "Empresa XPTO",
    documento: "12.345.678/0001-99",
    valor: 5000.0,
    data: "2024-06-15",
    status: "Cancelada",
    serie: "2",
  },
];

export default function NotaFiscal() {
  const [abrirSheet, setAbrirSheet] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("all");

  const notasFiltradas = notas.filter((nota) => {
    const correspondeBusca =
      nota.numero.includes(busca) ||
      nota.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      nota.documento.includes(busca);

    const correspondeStatus =
      filtroStatus === "all" || nota.status === filtroStatus;

    return correspondeBusca && correspondeStatus;
  });

  const getBadgeStatus = (status) => {
    switch (status) {
      case "Autorizada":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Autorizada
          </Badge>
        );
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>;
      case "Cancelada":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-600"
          >
            Cancelada
          </Badge>
        );
      case "Rejeitada":
        return <Badge variant="destructive">Rejeitada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Notas Fiscais"
            subtitulo="Gerencie as notas fiscais emitidas"
            acao={
              <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
                <Button
                  asChild
                  className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
                >
                  <Link to="/nova">
                    <Plus className="h-4 w-4 mr-2" />
                    Emitir Nova NF-e
                  </Link>
                </Button>
              </Sheet>
            }
          />
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle>Lista de Notas Fiscais</CardTitle>
              <CardDescription>
                {notasFiltradas.length} nota(s) encontrada(s)
              </CardDescription>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <Search className="h-4 w-4 text-[var(--sidebar-primaria)]" />
                  <Input
                    placeholder="Buscar por número, cliente ou documento..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="max-w-sm bg-[var(--input-bg)] text-[var(--texto)] border-[var(--sidebar-borda)] placeholder:text-[var(--texto)]"
                  />
                </div>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-[var(--input-bg)] text-[var(--texto)] border-[var(--sidebar-borda)]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Autorizada">Autorizada</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                    <SelectItem value="Rejeitada">Rejeitada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {/* Tabela para telas grandes (lg e acima) */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nota Fiscal</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notasFiltradas.map((nota) => (
                      <TableRow key={nota.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-[var(--sidebar-primaria)]" />
                            <div>
                              <div className="font-medium">
                                NF-e {nota.numero}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{nota.cliente}</div>
                            <div className="text-sm text-muted-foreground font-mono">
                              {nota.documento}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            R${" "}
                            {nota.valor.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(nota.data).toLocaleDateString("pt-BR")}
                          </div>
                        </TableCell>
                        <TableCell>{getBadgeStatus(nota.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {nota.status === "Autorizada" && (
                              <Button variant="outline" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Tabela compacta para tablets (md) */}
              <div className="hidden md:block lg:hidden overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nota Fiscal</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notasFiltradas.map((nota) => (
                      <TableRow key={nota.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-[var(--sidebar-primaria)] flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm truncate">
                                NF-e {nota.numero}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="min-w-0">
                            <div className="font-medium text-sm truncate">
                              {nota.cliente}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono truncate">
                              {nota.documento}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-sm">
                            R${" "}
                            {nota.valor.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                          <span>
                            <b>Data:</b>{" "}
                            {new Date(nota.data).toLocaleDateString("pt-BR")}
                          </span>
                          <div className="text-xs">
                            {getBadgeStatus(nota.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {nota.status === "Autorizada" && (
                              <Button variant="outline" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Cards para telas pequenas */}
              <div className="flex flex-col gap-4 md:hidden">
                {notasFiltradas.map((nota) => (
                  <div
                    key={nota.id}
                    className="border rounded-lg p-3 bg-white shadow"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-[var(--sidebar-primaria)]" />
                      <div className="font-bold">NF-e {nota.numero}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span>
                        <b>Cliente:</b> {nota.cliente}
                      </span>
                      <span>
                        <b>Documento:</b> {nota.documento}
                      </span>
                      <span>
                        <b>Valor:</b> R${" "}
                        {nota.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span>
                        <b>Data:</b>{" "}
                        {new Date(nota.data).toLocaleDateString("pt-BR")}
                      </span>
                      <span>
                        <b>Status:</b> {nota.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {nota.status === "Autorizada" && (
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
