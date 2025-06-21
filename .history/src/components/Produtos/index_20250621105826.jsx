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

const products = [
  {
    id: 1,
    name: "Notebook Dell Inspiron",
    code: "NB001",
    cfop: "5102",
    unitValue: 2500.0,
    unit: "UN",
    category: "Eletrônicos",
    status: "Ativo",
  },
  {
    id: 2,
    name: "Mouse Wireless Logitech",
    code: "MS002",
    cfop: "5102",
    unitValue: 89.9,
    unit: "UN",
    category: "Acessórios",
    status: "Ativo",
  },
  {
    id: 3,
    name: "Cabo HDMI 2m",
    code: "CB003",
    cfop: "5102",
    unitValue: 25.5,
    unit: "UN",
    category: "Cabos",
    status: "Inativo",
  },
];

export default function ProductsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    cfop: "",
    unitValue: "",
    unit: "UN",
    category: "",
    description: "",
    ncm: "",
    origin: "0",
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Dados do produto:", formData);
    setIsSheetOpen(false);
    setFormData({
      name: "",
      code: "",
      cfop: "",
      unitValue: "",
      unit: "UN",
      category: "",
      description: "",
      ncm: "",
      origin: "0",
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
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Nome do produto"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">Código</Label>
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) =>
                            handleInputChange("code", e.target.value)
                          }
                          placeholder="PRD001"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unitValue">Preço Comercial</Label>
                        <Input
                          id="unitValue"
                          type="number"
                          step="0.01"
                          value={formData.unitValue}
                          onChange={(e) =>
                            handleInputChange("unitValue", e.target.value)
                          }
                          placeholder="0,00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unitValue">Preço Tributável</Label>
                        <Input
                          id="unitValue"
                          type="number"
                          step="0.01"
                          value={formData.unitValue}
                          onChange={(e) =>
                            handleInputChange("unitValue", e.target.value)
                          }
                          placeholder="0,00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unidade Comercial</Label>
                        <Select
                          value={formData.unit}
                          onValueChange={(value) =>
                            handleInputChange("unit", value)
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
                        <Label htmlFor="unit">Unidade Tributável</Label>
                        <Select
                          value={formData.unit}
                          onValueChange={(value) =>
                            handleInputChange("unit", value)
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
                          value={formData.cfop}
                          onChange={(e) =>
                            handleInputChange("cfop", e.target.value)
                          }
                          placeholder="5102"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ncm">NCM</Label>
                        <Input
                          id="ncm"
                          value={formData.ncm}
                          onChange={(e) =>
                            handleInputChange("ncm", e.target.value)
                          }
                          placeholder="84713012"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origem</Label>
                      <Select
                        value={formData.origin}
                        onValueChange={(value) =>
                          handleInputChange("origin", value)
                        }
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
                      onClick={handleSubmit}
                      className="h-8 bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
                    >
                      Salvar Produto
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSheetOpen(false)}
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
                {filteredProducts.length} produto(s) encontrado(s)
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, código ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {product.category}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {product.code}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {product.cfop}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            R${" "}
                            {Number(product.unitValue).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.unit}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === "Ativo"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {product.status}
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
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-3 bg-white shadow"
                  >
                    <div className="font-bold">{product.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {product.category}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span>
                        <b>Código:</b> {product.code}
                      </span>
                      <span>
                        <b>CFOP:</b> {product.cfop}
                      </span>
                      <span>
                        <b>Valor:</b> R${" "}
                        {Number(product.unitValue).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span>
                        <b>Unidade:</b> {product.unit}
                      </span>
                      <span>
                        <b>Status:</b> {product.status}
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
