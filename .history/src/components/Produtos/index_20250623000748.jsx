import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderPagina from "../HeaderPagina";
import { Button } from "../ui/button";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import LayoutComSidebar from "../MobileSideBar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const produtos = [
  {
    id: 1,
    nome: "VW/ GOL 1.0 2015",
    codigo: "PRD001",
    cfop: "5102",
    valorUnitario: 25000.0,
    unidade: "UN",
  },
  {
    id: 2,
    nome: "FIAT/ PALIO 1.0 2016",
    codigo: "MS002",
    cfop: "5102",
    valorUnitario: 30000.0,
    unidade: "UN",
  },
  {
    id: 3,
    nome: "GM/ ONIX 1.0 2017",
    codigo: "CB003",
    cfop: "5102",
    valorUnitario: 55000.0,
    unidade: "UN",
  },
];

export default function PaginaProdutos() {
  const [abrirSheet, setAbrirSheet] = useState(false);
  const [busca, setBusca] = useState("");
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    codigo: "",
    cfop: "",
    valorUnitario: "",
    unidade: "UN",
    descricao: "",
    ncm: "",
    origem: "0",
  });

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  const aoMudarInput = (campo, valor) => {
    setDadosFormulario((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const aoEnviarFormulario = () => {
    console.log("Dados do produto:", dadosFormulario);
    setAbrirSheet(false);
    setDadosFormulario({
      nome: "",
      codigo: "",
      cfop: "",
      valorUnitario: "",
      unidade: "UN",
      descricao: "",
      ncm: "",
      origem: "0",
    });
  };

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6">
          <HeaderPagina
            titulo="Produtos"
            subtitulo="Gerencie seus produtos cadastrados"
            acao={
              <Sheet open={abrirSheet} onOpenChange={setAbrirSheet}>
                <SheetTrigger asChild>
                  <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Produto
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[290px] sm:w-[540px] p-4 bg-[var(--cartao)] border-l border-[var(--borda)]">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-[var(--texto)] text-xl font-semibold">
                      Novo Produto
                    </SheetTitle>
                    <SheetDescription className="text-[var(--suave-texto)]">
                      Preencha os dados do produto para cadastrá-lo no sistema.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-4">
                    <div className="space-y-3">
                      <Label
                        htmlFor="nome"
                        className="text-[var(--texto)] font-medium"
                      >
                        Nome do Produto
                      </Label>
                      <Input
                        id="nome"
                        value={dadosFormulario.nome}
                        onChange={(e) => aoMudarInput("nome", e.target.value)}
                        placeholder="Nome do produto"
                        className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] placeholder:text-[var(--suave-texto)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] hover:border-[var(--primaria)] transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label
                          htmlFor="codigo"
                          className="text-[var(--texto)] font-medium"
                        >
                          Código
                        </Label>
                        <Input
                          id="codigo"
                          value={dadosFormulario.codigo}
                          onChange={(e) =>
                            aoMudarInput("codigo", e.target.value)
                          }
                          placeholder="PRD001"
                          className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] placeholder:text-[var(--suave-texto)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] hover:border-[var(--primaria)] transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label
                          htmlFor="valorUnitario"
                          className="text-[var(--texto)] font-medium"
                        >
                          Preço Comercial
                        </Label>
                        <Input
                          id="valorUnitario"
                          type="number"
                          step="0.01"
                          value={dadosFormulario.valorUnitario}
                          onChange={(e) =>
                            aoMudarInput("valorUnitario", e.target.value)
                          }
                          placeholder="0,00"
                          className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] placeholder:text-[var(--suave-texto)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] hover:border-[var(--primaria)] transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="valorUnitario"
                          className="text-[var(--texto)] font-medium"
                        >
                          Preço Tributável
                        </Label>
                        <Input
                          id="valorUnitario"
                          type="number"
                          step="0.01"
                          value={dadosFormulario.valorUnitario}
                          onChange={(e) =>
                            aoMudarInput("valorUnitario", e.target.value)
                          }
                          placeholder="0,00"
                          className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] placeholder:text-[var(--suave-texto)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] hover:border-[var(--primaria)] transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="unidade"
                          className="text-[var(--texto)] font-medium"
                        >
                          Unidade Comercial
                        </Label>
                        <Select
                          value={dadosFormulario.unidade}
                          onValueChange={(valor) =>
                            aoMudarInput("unidade", valor)
                          }
                        >
                          <SelectTrigger className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] hover:border-[var(--primaria)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--cartao)] border-[var(--borda)]">
                            <SelectItem
                              value="UN"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Unidade (UN)
                            </SelectItem>
                            <SelectItem
                              value="KG"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Quilograma (KG)
                            </SelectItem>
                            <SelectItem
                              value="M"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Metro (M)
                            </SelectItem>
                            <SelectItem
                              value="L"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Litro (L)
                            </SelectItem>
                            <SelectItem
                              value="CX"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Caixa (CX)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="unidade"
                          className="text-[var(--texto)] font-medium"
                        >
                          Unidade Tributável
                        </Label>
                        <Select
                          value={dadosFormulario.unidade}
                          onValueChange={(valor) =>
                            aoMudarInput("unidade", valor)
                          }
                        >
                          <SelectTrigger className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] hover:border-[var(--primaria)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--cartao)] border-[var(--borda)]">
                            <SelectItem
                              value="UN"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Unidade (UN)
                            </SelectItem>
                            <SelectItem
                              value="KG"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Quilograma (KG)
                            </SelectItem>
                            <SelectItem
                              value="M"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Metro (M)
                            </SelectItem>
                            <SelectItem
                              value="L"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Litro (L)
                            </SelectItem>
                            <SelectItem
                              value="CX"
                              className="hover:bg-[var(--suave)] text-[var(--texto)]"
                            >
                              Caixa (CX)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label
                          htmlFor="cfop"
                          className="text-[var(--texto)] font-medium"
                        >
                          CFOP
                        </Label>
                        <Input
                          id="cfop"
                          value={dadosFormulario.cfop}
                          onChange={(e) => aoMudarInput("cfop", e.target.value)}
                          placeholder="5102"
                          className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] placeholder:text-[var(--suave-texto)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] hover:border-[var(--primaria)] transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="ncm"
                          className="text-[var(--texto)] font-medium"
                        >
                          NCM
                        </Label>
                        <Input
                          id="ncm"
                          value={dadosFormulario.ncm}
                          onChange={(e) => aoMudarInput("ncm", e.target.value)}
                          placeholder="84713012"
                          className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] placeholder:text-[var(--suave-texto)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] hover:border-[var(--primaria)] transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="origem"
                        className="text-[var(--texto)] font-medium"
                      >
                        Origem
                      </Label>
                      <Select
                        value={dadosFormulario.origem}
                        onValueChange={(valor) => aoMudarInput("origem", valor)}
                      >
                        <SelectTrigger className="border-[var(--borda)] bg-[var(--cartao)] text-[var(--texto)] hover:border-[var(--primaria)] focus:ring-2 focus:ring-[var(--primaria)] focus:border-[var(--primaria)] transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--cartao)] border-[var(--borda)]">
                          <SelectItem
                            value="0"
                            className="hover:bg-[var(--suave)] text-[var(--texto)]"
                          >
                            0 - Nacional
                          </SelectItem>
                          <SelectItem
                            value="1"
                            className="hover:bg-[var(--suave)] text-[var(--texto)]"
                          >
                            1 - Estrangeira - Importação direta
                          </SelectItem>
                          <SelectItem
                            value="2"
                            className="hover:bg-[var(--suave)] text-[var(--texto)]"
                          >
                            2 - Estrangeira - Adquirida no mercado interno
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-6 border-t border-[var(--borda)]">
                    <Button
                      onClick={aoEnviarFormulario}
                      className="flex-1 bg-[var(--primaria)] text-[var(--primaria-texto)] font-medium transition-all hover:bg-[var(--primaria-hover)] hover:shadow-lg hover:scale-[1.02] rounded-[var(--raio)]"
                    >
                      Salvar Produto
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setAbrirSheet(false)}
                      className="border-[var(--borda)] text-[var(--texto)] hover:bg-[var(--suave)] hover:border-[var(--primaria)] transition-all"
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
              <CardTitle>Lista de Produtos</CardTitle>
              <CardDescription>
                {produtosFiltrados.length} produto(s) encontrado(s)
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, código ou categoria..."
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
                      <TableHead>Produto</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>CFOP</TableHead>
                      <TableHead>Valor Unit.</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {produtosFiltrados.map((produto) => (
                      <TableRow
                        key={produto.id}
                        className="hover:bg-[var(--suave)] transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{produto.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                Código: {produto.codigo}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {produto.codigo}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {produto.cfop}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            R${" "}
                            {Number(produto.valorUnitario).toLocaleString(
                              "pt-BR",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{produto.unidade}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="default"
                            style={{
                              backgroundColor: "var(--primaria)",
                              color: "var(--primaria-texto)",
                            }}
                          >
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              style={{
                                backgroundColor: "var(--primaria)",
                                color: "var(--primaria-texto)",
                              }}
                              className="hover:bg-[var(--primaria-hover)] transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              style={{
                                backgroundColor: "var(--destrutivo)",
                                color: "var(--destrutivo-texto)",
                              }}
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
                {produtosFiltrados.map((produto) => (
                  <div
                    key={produto.id}
                    className="border rounded-lg p-3 bg-white shadow hover:bg-[var(--suave)] transition-colors"
                  >
                    <div className="font-bold">{produto.nome}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Código: {produto.codigo}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span>
                        <b>CFOP:</b> {produto.cfop}
                      </span>
                      <span>
                        <b>Valor:</b> R${" "}
                        {Number(produto.valorUnitario).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span>
                        <b>Unidade:</b> {produto.unidade}
                      </span>
                      <span>
                        <b>Status:</b> Ativo
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        style={{
                          backgroundColor: "var(--primaria)",
                          color: "var(--primaria-texto)",
                        }}
                        className="hover:bg-[var(--primaria-hover)] transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{
                          backgroundColor: "var(--destrutivo)",
                          color: "var(--destrutivo-texto)",
                        }}
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
