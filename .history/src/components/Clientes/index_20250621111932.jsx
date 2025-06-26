import React from "react";
import { Plus, Edit, Trash2, User, Building, Search } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { SidebarProvider } from "../ui/sidebar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";

const clientes = [
  {
    id: 1,
    nome: "Empresa ABC Ltda",
    documento: "12.345.678/0001-90",
    tipo: "CNPJ",
    telefone: "(11) 99999-9999",
    email: "contato@empresaabc.com.br",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "João Silva",
    documento: "123.456.789-00",
    tipo: "CPF",
    telefone: "(11) 88888-8888",
    email: "joao@email.com",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Comércio XYZ",
    documento: "98.765.432/0001-10",
    tipo: "CNPJ",
    telefone: "(11) 77777-7777",
    email: "vendas@comercioxyz.com.br",
    status: "Inativo",
  },
];

export default function Clientes() {
  const [abrirSheet, setAbrirSheet] = React.useState(false);
  const [busca, setBusca] = React.useState("");
  const [dadosFormulario, setDadosFormulario] = React.useState({
    nome: "",
    documento: "",
    telefone: "",
    email: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.documento.includes(busca) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase())
  );

  function aoMudarInput(campo, valor) {
    setDadosFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function aoEnviarFormulario(e) {
    e?.preventDefault?.();
    // Aqui você pode implementar a lógica de salvamento
    setAbrirSheet(false);
    setDadosFormulario({
      nome: "",
      documento: "",
      telefone: "",
      email: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    });
  }

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
          <HeaderPagina
            titulo="Clientes"
            subtitulo="Gerencie seus clientes cadastrados"
            acao={
              <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
                <SheetTrigger asChild>
                  <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Cliente
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[290px] sm:w-[540px] p-4">
                  <SheetHeader>
                    <SheetTitle>Novo Cliente</SheetTitle>
                    <SheetDescription>
                      Preencha os dados do cliente para cadastrá-lo no sistema.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome/Razão Social</Label>
                      <Input
                        id="nome"
                        value={dadosFormulario.nome}
                        onChange={(e) => aoMudarInput("nome", e.target.value)}
                        placeholder="Nome do cliente ou empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documento">CPF/CNPJ</Label>
                      <Input
                        id="documento"
                        value={dadosFormulario.documento}
                        onChange={(e) =>
                          aoMudarInput("documento", e.target.value)
                        }
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={dadosFormulario.telefone}
                          onChange={(e) =>
                            aoMudarInput("telefone", e.target.value)
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={dadosFormulario.email}
                          onChange={(e) =>
                            aoMudarInput("email", e.target.value)
                          }
                          placeholder="cliente@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rua">Rua</Label>
                        <Input
                          id="rua"
                          value={dadosFormulario.rua}
                          onChange={(e) => aoMudarInput("rua", e.target.value)}
                          placeholder="Rua"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero">Número</Label>
                        <Input
                          id="numero"
                          value={dadosFormulario.numero}
                          onChange={(e) =>
                            aoMudarInput("numero", e.target.value)
                          }
                          placeholder="Número"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input
                          id="complemento"
                          value={dadosFormulario.complemento}
                          onChange={(e) =>
                            aoMudarInput("complemento", e.target.value)
                          }
                          placeholder="Apartamento, bloco, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          value={dadosFormulario.bairro}
                          onChange={(e) =>
                            aoMudarInput("bairro", e.target.value)
                          }
                          placeholder="Bairro"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          value={dadosFormulario.cidade}
                          onChange={(e) =>
                            aoMudarInput("cidade", e.target.value)
                          }
                          placeholder="Cidade"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          value={dadosFormulario.estado}
                          onChange={(e) =>
                            aoMudarInput("estado", e.target.value)
                          }
                          placeholder="SP"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          value={dadosFormulario.cep}
                          onChange={(e) => aoMudarInput("cep", e.target.value)}
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={aoEnviarFormulario}
                      className="h-8 bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
                    >
                      Salvar Cliente
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setAbrirSheet(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            }
          />
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {clientesFiltrados.length} cliente(s) encontrado(s)
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, documento ou e-mail..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="max-w-sm focus:ring-2 focus:ring-[var(--primaria)] hover:ring-2 hover:ring-[var(--primaria)] transition-all"
                />
              </div>
            </CardHeader>
            <CardContent>
              {/* Tabela para telas médias e grandes */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Contato</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientesFiltrados.map((cliente) => (
                      <TableRow
                        key={cliente.id}
                        className="hover:bg-[var(--suave)] transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {cliente.tipo === "CNPJ" ? (
                              <Building className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <User className="h-4 w-4 text-muted-foreground" />
                            )}
                            <div>
                              <div className="font-medium">{cliente.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                {cliente.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-mono text-sm">
                              {cliente.documento}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{cliente.telefone}</div>
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              style={{ backgroundColor: "var(--primaria)", color: "var(--primaria-texto)" }}
                              className="hover:bg-[var(--primaria-hover)] transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              style={{ backgroundColor: "var(--destrutivo)", color: "var(--destrutivo-texto)" }}
                              className="hover:brightness-110 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Cards para telas pequenas */}
              <div className="flex flex-col gap-4 md:hidden">
                {clientesFiltrados.map((cliente) => (
                  <div
                    key={cliente.id}
                    className="border rounded-lg p-3 bg-white shadow hover:bg-[var(--suave)] transition-colors"
                  >
                    <div className="font-bold">{cliente.nome}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {cliente.email}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span>
                        <b>Documento:</b> {cliente.documento}
                      </span>
                      <span>
                        <b>Tipo:</b> {cliente.tipo}
                      </span>
                      <span>
                        <b>Telefone:</b> {cliente.telefone}
                      </span>
                      <span>
                        <b>Status:</b> {cliente.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ backgroundColor: "var(--primaria)", color: "var(--primaria-texto)" }}
                        className="hover:bg-[var(--primaria-hover)] transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ backgroundColor: "var(--destrutivo)", color: "var(--destrutivo-texto)" }}
                        className="hover:brightness-110 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
