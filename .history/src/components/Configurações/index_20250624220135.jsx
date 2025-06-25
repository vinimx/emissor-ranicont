import React, { useState, useRef, useCallback } from "react";
import { Save, Building, Shield, Upload, File, X } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Button } from "../ui/button";

// Tabs simples
function Abas({ children }) {
  const [abaAtiva, setAbaAtiva] = useState("empresa");
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { abaAtiva, setAbaAtiva })
  );
}
function ListaAbas({ children, abaAtiva, setAbaAtiva }) {
  return (
    <div className="grid w-full grid-cols-2 bg-[var(--cartao)] rounded-[var(--raio)] border border-[var(--borda)] p-1">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { abaAtiva, setAbaAtiva })
      )}
    </div>
  );
}
function AbaTrigger({ value, children, abaAtiva, setAbaAtiva, className }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-[var(--raio)] transition-all duration-200 font-medium ${
        abaAtiva === value
          ? "bg-[var(--primaria)] text-[var(--primaria-texto)] shadow-sm"
          : "bg-transparent text-[var(--texto)] hover:bg-[var(--suave)] hover:text-[var(--texto)]"
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

// UI básicos
function Card({ children }) {
  return (
    <div className="bg-[var(--cartao)] rounded-[var(--raio)] shadow-sm border border-[var(--borda)] p-6">
      {children}
    </div>
  );
}
function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}
function CardTitle({ children }) {
  return <h2 className="font-bold text-lg text-[var(--texto)]">{children}</h2>;
}
function CardDescription({ children }) {
  return <p className="text-sm text-[var(--suave-texto)]">{children}</p>;
}
function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-medium text-[var(--texto)] text-sm"
    >
      {children}
    </label>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className={`border border-[var(--entrada)] rounded-[var(--raio)] px-3 py-2 w-full bg-[var(--cartao)] text-[var(--texto)] placeholder-[var(--suave-texto)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--anel)] focus:border-[var(--anel)] hover:border-[var(--primaria)] ${
        props.className || ""
      }`}
    />
  );
}
function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-[var(--entrada)] rounded-[var(--raio)] px-3 py-2 w-full bg-[var(--cartao)] text-[var(--texto)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--anel)] focus:border-[var(--anel)] hover:border-[var(--primaria)]"
    >
      {children}
    </select>
  );
}
function Option({ value, children }) {
  return (
    <option value={value} className="bg-[var(--cartao)] text-[var(--texto)]">
      {children}
    </option>
  );
}
function Separator() {
  return <hr className="my-6 border-[var(--borda)]" />;
}

// Componente de upload de arquivo com drag & drop
function FileUpload({ value, onChange, accept = ".pfx,.p12", placeholder = "Arraste o arquivo aqui ou clique para selecionar" }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState(value ? value.split('\\').pop() || value.split('/').pop() : '');
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (accept.includes(file.name.split('.').pop().toLowerCase()) || accept.includes('.' + file.name.split('.').pop().toLowerCase())) {
        setFileName(file.name);
        onChange(file.path || file.name);
      }
    }
  }, [accept, onChange]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onChange(file.path || file.name);
    }
  }, [onChange]);

  const handleRemoveFile = useCallback(() => {
    setFileName('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-2">
      <div
        className={`border-2 border-dashed rounded-[var(--raio)] p-6 text-center transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-[var(--primaria)] bg-[var(--primaria)]/5'
            : 'border-[var(--entrada)] hover:border-[var(--primaria)] hover:bg-[var(--suave)]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {fileName ? (
          <div className="flex items-center justify-center gap-3">
            <File className="h-8 w-8 text-[var(--primaria)]" />
            <div className="flex-1 text-left">
              <p className="font-medium text-[var(--texto)]">{fileName}</p>
              <p className="text-sm text-[var(--suave-texto)]">Arquivo selecionado</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="p-1 rounded-full hover:bg-[var(--suave)] transition-colors"
            >
              <X className="h-4 w-4 text-[var(--suave-texto)] hover:text-[var(--texto)]" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-[var(--suave-texto)]" />
            <p className="text-[var(--texto)] font-medium">{placeholder}</p>
            <p className="text-sm text-[var(--suave-texto)]">
              Formatos aceitos: {accept.replace(/\./g, '').toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
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
    regimeTributario: "1",
    serie: "1",
    ultimoNumero: "000123",
    tokenSefaz: "",
    caminhoCertificado: "",
    senhaCertificado: "",
  });

  const alterarEmpresa = (campo, valor) => {
    setDadosEmpresa((ant) => ({ ...ant, [campo]: valor }));
  };

  const alterarFiscal = (campo, valor) => {
    setDadosFiscais((ant) => ({ ...ant, [campo]: valor }));
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
                        onChange={(e) => alterarEmpresa("nome", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={dadosEmpresa.cnpj}
                        onChange={(e) => alterarEmpresa("cnpj", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input
                      id="ie"
                      value={dadosEmpresa.ie}
                      onChange={(e) => alterarEmpresa("ie", e.target.value)}
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
                        onChange={(e) => alterarEmpresa("cep", e.target.value)}
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
                        onChange={(e) => alterarFiscal("serie", e.target.value)}
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
                    <h4 className="font-medium text-[var(--texto)]">
                      Certificado Digital
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="caminhoCertificado">
                        Caminho do Certificado
                      </Label>
                      <FileUpload
                        value={dadosFiscais.caminhoCertificado}
                        onChange={(valor) =>
                          alterarFiscal("caminhoCertificado", valor)
                        }
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
