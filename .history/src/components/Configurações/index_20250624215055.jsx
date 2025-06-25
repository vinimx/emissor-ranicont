import React, { useState } from "react";
import { Save, Building, Shield } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Button } from "../ui/button";

// Componentes Tabs simples
function Abas({ children }) {
  const [abaAtiva, setAbaAtiva] = useState("empresa");
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { abaAtiva, setAbaAtiva })
  );
}
function ListaAbas({ children, abaAtiva, setAbaAtiva }) {
  return (
    <div className="grid w-full grid-cols-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { abaAtiva, setAbaAtiva })
      )}
    </div>
  );
}
function AbaTrigger({ value, children, abaAtiva, setAbaAtiva, className }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        abaAtiva === value
          ? "bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)]"
          : "bg-transparent"
      } ${className || ""}`}
      onClick={() => setAbaAtiva(value)}
      type="button"
    >
      {children}
    </button>
  );
}
function ConteudoAba({ value, abaAtiva, children, className }) {
  if (abaAtiva !== value) return null;
  return <div className={className}>{children}</div>;
}

// Componentes de UI fictícios para evitar erro
function Card({ children }) {
  return <div className="bg-white rounded shadow p-4">{children}</div>;
}
function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
function CardTitle({ children }) {
  return <h2 className="font-bold text-lg">{children}</h2>;
}
function CardDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}
function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="font-medium">
      {children}
    </label>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className={`border rounded px-2 py-1 w-full ${props.className || ""}`}
    />
  );
}
function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 w-full"
    >
      {children}
    </select>
  );
}
function Option({ value, children }) {
  return <option value={value}>{children}</option>;
}
function Separator() {
  return <hr className="my-4" />;
}

export default function Configuracoes() {
  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: "",
    cnpj: "",
    ie: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    email: "",
  });

  const [dadosFiscais, setDadosFiscais] = useState({
    regimeTributario: "1", // 1-Simples Nacional, 2-Lucro Presumido, 3-Lucro Real
    serie: "1",
    ultimoNumero: "000123",
    tokenSefaz: "",
    caminhoCertificado: "",
    senhaCertificado: "",
  });

  const [preferencias, setPreferencias] = useState({
    notificacoesEmail: true,
    backupAutomatico: true,
    modoEscuro: false,
    idioma: "pt-BR",
  });

  const alterarEmpresa = (campo, valor) => {
    setDadosEmpresa((ant) => ({ ...ant, [campo]: valor }));
  };

  const alterarFiscal = (campo, valor) => {
    setDadosFiscais((ant) => ({ ...ant, [campo]: valor }));
  };

  const alterarPreferencia = (campo, valor) => {
    setPreferencias((ant) => ({ ...ant, [campo]: valor }));
  };

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Configurações"
            subtitulo="Gerencie as configurações do sistema"
            acao={
              <Button className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            }
          />
          <Abas>
            <ListaAbas>
              <AbaTrigger value="empresa">
                <Building className="h-4 w-4" />
                Empresa
              </AbaTrigger>
              <AbaTrigger value="fiscal">
                <Shield className="h-4 w-4" />
                Fiscal
              </AbaTrigger>
            </ListaAbas>
            <ConteudoAba value="empresa" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Empresa</CardTitle>
                  <CardDescription>
                    Informações básicas da empresa emissora das notas fiscais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Razão Social</Label>
                      <Input
                        id="nome"
                        value={dadosEmpresa.nome}
                        onChange={(e) =>
                          alterarEmpresa("nome", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={dadosEmpresa.cnpj}
                        onChange={(e) =>
                          alterarEmpresa("cnpj", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input
                      id="ie"
                      value={dadosEmpresa.ie}
                      onChange={(e) =>
                        alterarEmpresa("ie", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={dadosEmpresa.endereco}
                      onChange={(e) =>
                        alterarEmpresa("endereco", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        value={dadosEmpresa.cidade}
                        onChange={(e) =>
                          alterarEmpresa("cidade", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        id="estado"
                        value={dadosEmpresa.estado}
                        onChange={(e) =>
                          alterarEmpresa("estado", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={dadosEmpresa.cep}
                        onChange={(e) =>
                          alterarEmpresa("cep", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={dadosEmpresa.telefone}
                        onChange={(e) =>
                          alterarEmpresa("telefone", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={dadosEmpresa.email}
                        onChange={(e) =>
                          alterarEmpresa("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ConteudoAba>

            <ConteudoAba value="fiscal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Fiscais</CardTitle>
                  <CardDescription>
                    Configurações relacionadas à emissão de notas fiscais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="regimeTributario">Regime Tributário</Label>
                    <Select
                      value={dadosFiscais.regimeTributario}
                      onChange={(valor) =>
                        alterarFiscal("regimeTributario", valor)
                      }
                    >
                      <Option value="1">Simples Nacional</Option>
                      <Option value="2">Lucro Presumido</Option>
                      <Option value="3">Lucro Real</Option>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serie">Série Padrão</Label>
                      <Input
                        id="serie"
                        value={dadosFiscais.serie}
                        onChange={(e) =>
                          alterarFiscal("serie", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ultimoNumero">Último Número</Label>
                      <Input
                        id="ultimoNumero"
                        value={dadosFiscais.ultimoNumero}
                        onChange={(e) =>
                          alterarFiscal("ultimoNumero", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tokenSefaz">Token SEFAZ</Label>
                    <Input
                      id="tokenSefaz"
                      type="password"
                      value={dadosFiscais.tokenSefaz}
                      onChange={(e) =>
                        alterarFiscal("tokenSefaz", e.target.value)
                      }
                      placeholder="Token de acesso à SEFAZ"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Certificado Digital</h4>
                    <div className="space-y-2">
                      <Label htmlFor="caminhoCertificado">
                        Caminho do Certificado
                      </Label>
                      <Input
                        id="caminhoCertificado"
                        value={dadosFiscais.caminhoCertificado}
                        onChange={(e) =>
                          alterarFiscal("caminhoCertificado", e.target.value)
                        }
                        placeholder="C:\certificados\certificado.pfx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senhaCertificado">
                        Senha do Certificado
                      </Label>
                      <Input
                        id="senhaCertificado"
                        type="password"
                        value={dadosFiscais.senhaCertificado}
                        onChange={(e) =>
                          alterarFiscal("senhaCertificado", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ConteudoAba>
          </Abas>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
