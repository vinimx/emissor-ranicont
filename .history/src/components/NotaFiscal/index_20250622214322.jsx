import { Plus } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function NotaFiscal() {
  const [abrirSheet, setAbrirSheet] = useState(false);

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6">
          <HeaderPagina
            titulo="Notas Fiscais"
            subtitulo="Gerencie todas as notas fiscais emitidas"
            acao={
              <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
                <SheetTrigger asChild>
                  <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Emitir Nova NF-e
                  </Button>
                </SheetTrigger>
              </Sheet>
            }
          />
          <Card>
            <CardHeader>
              <CardTitle>Lista de Notas Fiscais</CardTitle>
              <CardDescription>
                {filteredInvoices.length} nota(s) encontrada(s)
              </CardDescription>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por número, cliente ou documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
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
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">
                              NF-e {invoice.number}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Série {invoice.series}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.client}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {invoice.clientDocument}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          R${" "}
                          {invoice.value.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(invoice.date).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === "Autorizada" && (
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
            </CardContent>
          </Card>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
