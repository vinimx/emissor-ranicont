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
    nome: "Notebook Dell Inspiron",
    codigo: "NB001",
    cfop: "5102",
    valorUnitario: 2500.0,
    unidade: "UN",
  },
  {
    id: 2,
    nome: "Mouse Wireless Logitech",
    codigo: "MS002",
    cfop: "5102",
    valorUnitario: 89.9,
    unidade: "UN",
  },
  {
    id: 3,
    nome: "Cabo HDMI 2m",
    codigo: "CB003",
    cfop: "5102",
    valorUnitario: 25.5,
    unidade: "UN",
    categoria: "Cabos",
    status: "Inativo",
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
    categoria: "",
    descricao: "",
    ncm: "",
    origem: "0",
  });

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(busca.toLowerCase())
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
      categoria: "",
      descricao: "",
      ncm: "",
      origem: "0",
    });
  };

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-4 space-y-6 border-b border-[var(--sidebar-borda)]">
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
                <SheetContent className="w-[290px] sm:w-[540px] p-4">
                  <SheetHeader>
                    <SheetTitle>Novo Produto</SheetTitle>
                    <SheetDescription>
                      Preencha os dados do produto para cadastrá-lo no sistema.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome do Produto</Label>
                      <Input
                        id="nome"
                        value={dadosFormulario.nome}
                        onChange={(e) => aoMudarInput("nome", e.target.value)}
                        placeholder="Nome do produto"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="codigo">Código</Label>
                        <Input
                          id="codigo"
                          value={dadosFormulario.codigo}
                          onChange={(e) =>
                            aoMudarInput("codigo", e.target.value)
                          }
                          placeholder="PRD001"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valorUnitario">Preço Comercial</Label>
                        <Input
                          id="valorUnitario"
                          type="number"
                          step="0.01"
                          value={dadosFormulario.valorUnitario}
                          onChange={(e) =>
                            aoMudarInput("valorUnitario", e.target.value)
                          }
                          placeholder="0,00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="valorUnitario">Preço Tributável</Label>
                        <Input
                          id="valorUnitario"
                          type="number"
                          step="0.01"
                          value={dadosFormulario.valorUnitario}
                          onChange={(e) =>
                            aoMudarInput("valorUnitario", e.target.value)
                          }
                          placeholder="0,00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unidade">Unidade Comercial</Label>
                        <Select
                          value={dadosFormulario.unidade}
                          onValueChange={(valor) =>
                            aoMudarInput("unidade", valor)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UN">Unidade (UN)</SelectItem>
                            <SelectItem value="KG">Quilograma (KG)</SelectItem>
                            <SelectItem value="M">Metro (M)</SelectItem>
                            <SelectItem value="L">Litro (L)</SelectItem>
                            <SelectItem value="CX">Caixa (CX)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unidade">Unidade Tributável</Label>
                        <Select
                          value={dadosFormulario.unidade}
                          onValueChange={(valor) =>
                            aoMudarInput("unidade", valor)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UN">Unidade (UN)</SelectItem>
                            <SelectItem value="KG">Quilograma (KG)</SelectItem>
                            <SelectItem value="M">Metro (M)</SelectItem>
                            <SelectItem value="L">Litro (L)</SelectItem>
                            <SelectItem value="CX">Caixa (CX)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cfop">CFOP</Label>
                        <Input
                          id="cfop"
                          value={dadosFormulario.cfop}
                          onChange={(e) => aoMudarInput("cfop", e.target.value)}
                          placeholder="5102"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ncm">NCM</Label>
                        <Input
                          id="ncm"
                          value={dadosFormulario.ncm}
                          onChange={(e) => aoMudarInput("ncm", e.target.value)}
                          placeholder="84713012"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="origem">Origem</Label>
                      <Select
                        value={dadosFormulario.origem}
                        onValueChange={(valor) => aoMudarInput("origem", valor)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 - Nacional</SelectItem>
                          <SelectItem value="1">
                            1 - Estrangeira - Importação direta
                          </SelectItem>
                          <SelectItem value="2">
                            2 - Estrangeira - Adquirida no mercado interno
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={aoEnviarFormulario}
                      className="h-8 bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
                    >
                      Salvar Produto
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
                  className="max-w-sm"
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
                      <TableRow key={produto.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{produto.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                {produto.categoria}
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
                            variant={
                              produto.status === "Ativo"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {produto.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
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
                    className="border rounded-lg p-3 bg-white shadow"
                  >
                    <div className="font-bold">{produto.nome}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {produto.categoria}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span>
                        <b>Código:</b> {produto.codigo}
                      </span>
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
                        <b>Status:</b> {produto.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
