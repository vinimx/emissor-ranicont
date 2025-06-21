import React from "react";
import { Plus } from "lucide-react";
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

export default function Clientes() {
  const [abrirSheet, setAbrirSheet] = React.useState(false);

  const [dadosFormulario, setDadosFormulario] = React.useState({
    nome: "",
    documento: "",
    telefone: "",
    email: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  function aoMudarInput(campo, valor) {
    setDadosFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function aoEnviarFormulario(e) {
    e?.preventDefault?.();
    // Aqui você pode adicionar lógica para salvar o cliente
    setAbrirSheet(false);
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
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={dadosFormulario.endereco}
                        onChange={(e) =>
                          aoMudarInput("endereco", e.target.value)
                        }
                        placeholder="Rua, número, complemento"
                      />
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
          ></HeaderPagina>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
