import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderPagina from "../HeaderPagina";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
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

export default function Produtos() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    category: "",
    unitValue: "",
    unit: "UN",
    cfop: "",
    ncm: "",
    origin: "0",
    description: "",
  });

  function handleInputChange(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e?.preventDefault?.();
    setIsSheetOpen(false);
  }

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
                      <div className="space-y-2">
                        <Label htmlFor="category">Tipo</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="00">
                              00 - Mercadoria para revenda
                            </SelectItem>
                            <SelectItem value="01">
                              01 - Matéria-prima
                            </SelectItem>
                            <SelectItem value="02">02 - Embalagem</SelectItem>
                            <SelectItem value="03">
                              03 - Produto em processo
                            </SelectItem>
                            <SelectItem value="04">
                              04 - Produto acabado
                            </SelectItem>
                            <SelectItem value="05">05 - Subproduto</SelectItem>
                            <SelectItem value="06">
                              06 - Produto Intermediário
                            </SelectItem>
                            <SelectItem value="07">
                              07 - Material de uso e consumo
                            </SelectItem>
                            <SelectItem value="08">
                              08 - Ativo Imobilizado
                            </SelectItem>
                            <SelectItem value="10">
                              10 - Outros insumos
                            </SelectItem>
                            <SelectItem value="99">99 - Outras</SelectItem>
                          </SelectContent>
                        </Select>
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
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Descrição detalhada do produto"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 h-8 w-2 bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
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
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
