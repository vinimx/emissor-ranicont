import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderPagina from "../HeaderPagina";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import LayoutComSidebar from "../MobileSideBar";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

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
                <SheetContent className="w-[400px] sm:w-[540px]">
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
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) =>
                            handleInputChange("category", e.target.value)
                          }
                          placeholder="Eletrônicos"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unitValue">Valor Unitário</Label>
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
                        <Label htmlFor="unit">Unidade</Label>
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
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
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
