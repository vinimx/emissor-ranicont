import { SidebarProvider } from "../../ui/sidebar";
import LayoutComSidebar from "../../MobileSideBar";
import HeaderPagina from "../../HeaderPagina";
import { Button } from "../../ui/button";
import {
  FileText,
  Plus,
  Trash2,
  Calculator,
  User,
  CreditCard,
  Paperclip,
  Calendar,
  Percent,
  ChevronDown,
  Package,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { useState } from "react";

export default function NovaNotaFiscal() {
  // Estados em português
  const [dadosNota, setDadosNota] = useState({
    serie: "",
    numero: "",
    cfop: "",
    naturezaOperacao: "",
    dataEmissao: "",
  });
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [clienteBusca, setClienteBusca] = useState("");
  const [produtoBusca, setProdutoBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [unidade, setUnidade] = useState("UN");
  const [desconto, setDesconto] = useState(0);
  const [itens, setItens] = useState([]);
  const [clientes] = useState([
    { id: 1, nome: "João", documento: "123.456.789-00" },
    { id: 2, nome: "Maria", documento: "987.654.321-00" },
  ]);
  const [produtos] = useState([
    { id: 1, nome: "Produto A", valor: 100, unidade: "UN" },
    { id: 2, nome: "Produto B", valor: 200, unidade: "UN" },
  ]);
  const [tipoNota, setTipoNota] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [referenciaNota, setReferenciaNota] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [icmsManual, setIcmsManual] = useState("");
  const [ipiManual, setIpiManual] = useState("");
  const [pisManual, setPisManual] = useState("");
  const [cofinsManual, setCofinsManual] = useState("");
  const [erros, setErros] = useState({});

  // Cálculos
  const subtotal = itens.reduce((acc, item) => acc + item.total, 0);
  const icms = icmsManual !== "" ? Number(icmsManual) : subtotal * 0.18;
  const ipi = ipiManual !== "" ? Number(ipiManual) : 0;
  const pis = pisManual !== "" ? Number(pisManual) : 0;
  const cofins = cofinsManual !== "" ? Number(cofinsManual) : 0;
  const total = subtotal + icms + ipi + pis + cofins;

  function handleClienteBusca(e) {
    setClienteBusca(e.target.value);
  }
  function handleProdutoBusca(e) {
    setProdutoBusca(e.target.value);
  }

  function adicionarItem() {
    const produto = produtos.find(
      (p) => p.id.toString() === produtoSelecionado
    );
    if (!produto) return;
    const valorUnitario = produto.valor;
    const totalItem = valorUnitario * quantidade * (1 - desconto / 100);
    setItens([
      ...itens,
      {
        id: Date.now(),
        nomeProduto: produto.nome,
        quantidade: quantidade,
        valorUnitario,
        unidade,
        desconto,
        total: totalItem,
      },
    ]);
    setProdutoSelecionado("");
    setProdutoBusca("");
    setQuantidade(1);
    setUnidade("UN");
    setDesconto(0);
  }

  function removerItem(id) {
    setItens(itens.filter((item) => item.id !== id));
  }

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 mr-4 md:mr-10 lg:mr-7 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Emitir Nova NF-e"
            subtitulo="Preencha os dados para emitir uma nova nota fiscal eletrônica"
            acao={
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="cursor-pointer hover:bg-[var(--secundaria)] hover:text-[var(--texto)] transition-colors border border-[var(--sidebar-borda)]"
                >
                  <span className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    Salvar Rascunho
                  </span>
                </Button>
                <Button
                  asChild
                  className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-all hover:bg-[var(--primaria-hover)] hover:scale-105 rounded-[var(--raio)] shadow"
                >
                  <Link to="#">
                    <FileText className="h-4 w-4 mr-2" />
                    Emitir NF-e
                  </Link>
                </Button>
              </div>
            }
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Dados da Nota */}
              <Card className="shadow-lg hover:shadow-2xl border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2"
                    style={{ color: "var(--sidebar-primaria)" }}
                  >
                    <FileText className="h-5 w-5 text-[var(--sidebar-primaria)]" />
                    Dados da Nota Fiscal
                  </CardTitle>
                  <CardDescription>
                    Informações básicas da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="tipoNota"
                        className="flex items-center gap-1"
                      >
                        <ChevronDown className="h-4 w-4" />
                        Tipo da Nota
                      </Label>
                      <Select value={tipoNota} onValueChange={setTipoNota}>
                        <SelectTrigger
                          className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                            erros.tipoNota ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entrada">Entrada</SelectItem>
                          <SelectItem value="Saída">Saída</SelectItem>
                        </SelectContent>
                      </Select>
                      {erros.tipoNota && (
                        <span className="text-xs text-red-500">
                          {erros.tipoNota}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="finalidade"
                        className="flex items-center gap-1"
                      >
                        <ChevronDown className="h-4 w-4" />
                        Finalidade da Operação
                      </Label>
                      <Select value={finalidade} onValueChange={setFinalidade}>
                        <SelectTrigger
                          className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                            erros.finalidade ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Selecione a finalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Devolução">Devolução</SelectItem>
                          <SelectItem value="Complementar">
                            Complementar
                          </SelectItem>
                          <SelectItem value="Ajuste">Ajuste</SelectItem>
                        </SelectContent>
                      </Select>
                      {erros.finalidade && (
                        <span className="text-xs text-red-500">
                          {erros.finalidade}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="referenciaNota"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Referência de NF-e
                      </Label>
                      <Input
                        id="referenciaNota"
                        placeholder="Número da nota fiscal referenciada"
                        value={referenciaNota}
                        onChange={(e) => setReferenciaNota(e.target.value)}
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="serie"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Série
                      </Label>
                      <Input
                        id="serie"
                        value={dadosNota.serie}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, serie: e.target.value })
                        }
                        className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                          erros.serie ? "border-red-500" : ""
                        }`}
                      />
                      {erros.serie && (
                        <span className="text-xs text-red-500">
                          {erros.serie}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="numero"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Número
                      </Label>
                      <Input
                        id="numero"
                        value={dadosNota.numero}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, numero: e.target.value })
                        }
                        className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                          erros.numero ? "border-red-500" : ""
                        }`}
                      />
                      {erros.numero && (
                        <span className="text-xs text-red-500">
                          {erros.numero}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cliente"
                        className="flex items-center gap-1"
                      >
                        <User className="h-4 w-4" />
                        Cliente
                      </Label>
                      <div className="relative">
                        <Input
                          id="cliente"
                          placeholder="Digite para buscar..."
                          value={clienteBusca}
                          onChange={handleClienteBusca}
                          className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                            erros.cliente ? "border-red-500" : ""
                          }`}
                          autoComplete="off"
                          onFocus={() => setClienteBusca("")}
                        />
                        {clienteBusca && (
                          <div className="absolute z-10 bg-white border border-[var(--sidebar-borda)] rounded shadow w-full mt-1 max-h-40 overflow-auto">
                            {clientes
                              .filter((c) =>
                                c.nome
                                  .toLowerCase()
                                  .includes(clienteBusca.toLowerCase())
                              )
                              .map((c) => (
                                <div
                                  key={c.id}
                                  className="px-3 py-2 cursor-pointer hover:bg-[var(--sidebar-primaria)] hover:text-[var(--primaria-texto)] transition"
                                  onClick={() => {
                                    setClienteSelecionado(c.id.toString());
                                    setClienteBusca(c.nome);
                                  }}
                                >
                                  <span className="font-medium">{c.nome}</span>{" "}
                                  <span className="text-xs text-muted-foreground">
                                    ({c.documento})
                                  </span>
                                </div>
                              ))}
                            {clientes.filter((c) =>
                              c.nome
                                .toLowerCase()
                                .includes(clienteBusca.toLowerCase())
                            ).length === 0 && (
                              <div className="px-3 py-2 text-xs text-muted-foreground">
                                Nenhum cliente encontrado
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {erros.cliente && (
                        <span className="text-xs text-red-500">
                          {erros.cliente}
                        </span>
                      )}
                      {/* Preview do cliente selecionado */}
                      {clienteSelecionado && (
                        <div className="mt-1 text-xs text-[var(--sidebar-primaria)] bg-[var(--suave)] rounded p-2">
                          <b>Cliente:</b>{" "}
                          {
                            clientes.find(
                              (c) => c.id.toString() === clienteSelecionado
                            )?.nome
                          }{" "}
                          <br />
                          <b>Documento:</b>{" "}
                          {
                            clientes.find(
                              (c) => c.id.toString() === clienteSelecionado
                            )?.documento
                          }
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cfop" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        CFOP
                      </Label>
                      <Input
                        id="cfop"
                        value={dadosNota.cfop}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, cfop: e.target.value })
                        }
                        className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                          erros.cfop ? "border-red-500" : ""
                        }`}
                      />
                      {erros.cfop && (
                        <span className="text-xs text-red-500">
                          {erros.cfop}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="naturezaOperacao"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Natureza da Operação
                      </Label>
                      <Input
                        id="naturezaOperacao"
                        value={dadosNota.naturezaOperacao}
                        onChange={(e) =>
                          setDadosNota({
                            ...dadosNota,
                            naturezaOperacao: e.target.value,
                          })
                        }
                        className={`w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition ${
                          erros.naturezaOperacao ? "border-red-500" : ""
                        }`}
                      />
                      {erros.naturezaOperacao && (
                        <span className="text-xs text-red-500">
                          {erros.naturezaOperacao}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="dataEmissao"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-4 w-4" />
                        Data de Emissão
                      </Label>
                      <Input
                        id="dataEmissao"
                        type="date"
                        value={dadosNota.dataEmissao}
                        onChange={(e) =>
                          setDadosNota({
                            ...dadosNota,
                            dataEmissao: e.target.value,
                          })
                        }
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="formaPagamento"
                        className="flex items-center gap-1"
                      >
                        <CreditCard className="h-4 w-4" />
                        Forma de Pagamento
                      </Label>
                      <Select
                        value={formaPagamento}
                        onValueChange={setFormaPagamento}
                      >
                        <SelectTrigger className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition">
                          <SelectValue placeholder="Selecione a forma de pagamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debito">Débito</SelectItem>
                          <SelectItem value="credito">Crédito</SelectItem>
                          <SelectItem value="pix">Pix</SelectItem>
                          <SelectItem value="boleto">Boleto</SelectItem>
                          <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="observacoes"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Observações
                      </Label>
                      <textarea
                        id="observacoes"
                        placeholder="Observações adicionais"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        rows={3}
                        className="w-full md:max-w-xs rounded-md border border-[var(--sidebar-borda)] bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itens da Nota */}
              <Card className="shadow-lg hover:shadow-2xl border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2"
                    style={{ color: "var(--sidebar-primaria)" }}
                  >
                    <Package className="h-5 w-5 text-[var(--sidebar-primaria)]" />
                    Itens da Nota Fiscal
                  </CardTitle>
                  <CardDescription>
                    Adicione os produtos/serviços da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label
                        htmlFor="produto"
                        className="flex items-center gap-1"
                      >
                        <Package className="h-4 w-4" />
                        Produto
                      </Label>
                      <div className="relative">
                        <Input
                          id="produto"
                          placeholder="Digite para buscar..."
                          value={produtoBusca}
                          onChange={handleProdutoBusca}
                          className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                          autoComplete="off"
                          onFocus={() => setProdutoBusca("")}
                        />
                        {produtoBusca && (
                          <div className="absolute z-10 bg-white border border-[var(--sidebar-borda)] rounded shadow w-full mt-1 max-h-40 overflow-auto">
                            {produtos
                              .filter((p) =>
                                p.nome
                                  .toLowerCase()
                                  .includes(produtoBusca.toLowerCase())
                              )
                              .map((p) => (
                                <div
                                  key={p.id}
                                  className="px-3 py-2 cursor-pointer hover:bg-[var(--sidebar-primaria)] hover:text-[var(--primaria-texto)] transition"
                                  onClick={() => {
                                    setProdutoSelecionado(p.id.toString());
                                    setProdutoBusca(p.nome);
                                    setUnidade(p.unidade);
                                  }}
                                >
                                  <span className="font-medium">{p.nome}</span>{" "}
                                  <span className="text-xs text-muted-foreground">
                                    (R$ {p.valor.toFixed(2)})
                                  </span>
                                </div>
                              ))}
                            {produtos.filter((p) =>
                              p.nome
                                .toLowerCase()
                                .includes(produtoBusca.toLowerCase())
                            ).length === 0 && (
                              <div className="px-3 py-2 text-xs text-muted-foreground">
                                Nenhum produto encontrado
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {produtoSelecionado && (
                        <div className="mt-1 text-xs text-[var(--sidebar-primaria)] bg-[var(--suave)] rounded p-2">
                          <b>Produto:</b>{" "}
                          {
                            produtos.find(
                              (p) => p.id.toString() === produtoSelecionado
                            )?.nome
                          }{" "}
                          <br />
                          <b>Valor:</b> R${" "}
                          {produtos
                            .find((p) => p.id.toString() === produtoSelecionado)
                            ?.valor.toFixed(2)}
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-20 space-y-2">
                      <Label
                        htmlFor="quantidade"
                        className="flex items-center gap-1"
                      >
                        <Package className="h-4 w-4" />
                        Qtd
                      </Label>
                      <Input
                        id="quantidade"
                        type="number"
                        min="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <div className="w-full md:w-24 space-y-2">
                      <Label
                        htmlFor="unidade"
                        className="flex items-center gap-1"
                      >
                        <Package className="h-4 w-4" />
                        Unidade
                      </Label>
                      <Select value={unidade} onValueChange={setUnidade}>
                        <SelectTrigger className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition">
                          <SelectValue placeholder="UN" />
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
                    <div className="w-full md:w-24 space-y-2">
                      <Label
                        htmlFor="valorUnitario"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Valor do Produto
                      </Label>
                      <Input
                        id="valorUnitario"
                        type="number"
                        min="0"
                        value={
                          produtoSelecionado
                            ? produtos.find(
                                (p) => p.id.toString() === produtoSelecionado
                              )?.valor
                            : ""
                        }
                        onChange={(e) => {
                          const valor = Number(e.target.value);
                          if (produtoSelecionado) {
                            setItens(
                              itens.map((item) =>
                                item.id === produtoSelecionado
                                  ? { ...item, valorUnitario: valor }
                                  : item
                              )
                            );
                          }
                        }}
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <div className="w-full md:w-24 space-y-2">
                      <Label
                        htmlFor="desconto"
                        className="flex items-center gap-1"
                      >
                        <Percent className="h-4 w-4" />
                        Desconto (%)
                      </Label>
                      <Input
                        id="desconto"
                        type="number"
                        min="0"
                        max="100"
                        value={desconto}
                        onChange={(e) => setDesconto(Number(e.target.value))}
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria] transition"
                      />
                    </div>
                    <Button
                      onClick={adicionarItem}
                      className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow flex items-center gap-1"
                      title="Adicionar item"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>

                  {/* Lista de itens (mobile) */}
                  <div className="flex flex-col gap-3 md:hidden">
                    {erros.itens && (
                      <span className="text-xs text-red-500">
                        {erros.itens}
                      </span>
                    )}
                    {itens.length === 0 && (
                      <div className="text-center text-xs text-muted-foreground py-4">
                        Nenhum item adicionado ainda.
                      </div>
                    )}
                    {itens.map((item) => (
                      <div className="rounded-lg border p-3 bg-white shadow hover:bg-[var(--suave)] transition-colors flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{item.nomeProduto}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-[var(--destrutivo)] hover:text-white transition"
                            onClick={() => removerItem(item.id)}
                            title="Remover"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Qtd: {item.quantidade} | Unit: R${" "}
                          {item.valorUnitario.toFixed(2)} | Desc:{" "}
                          {item.desconto}% | Total: R$ {item.total.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Unidade: {item.unidade}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tabela de itens (tablet/desktop) */}
                  <div className="hidden md:block border rounded-lg overflow-x-auto">
                    {erros.itens && (
                      <span className="text-xs text-red-500">
                        {erros.itens}
                      </span>
                    )}
                    {itens.length === 0 && (
                      <div className="text-center text-xs text-muted-foreground py-4">
                        Nenhum item adicionado ainda.
                      </div>
                    )}
                    {itens.length > 0 && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead className="text-center">
                              Unidade
                            </TableHead>
                            <TableHead className="text-center">
                              Desconto (%)
                            </TableHead>
                            <TableHead className="text-right">
                              Valor Unit.
                            </TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itens.map((item) => (
                            <TableRow
                              key={item.id}
                              className="hover:bg-[var(--suave)] transition-colors"
                            >
                              <TableCell className="font-medium">
                                {item.nomeProduto}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.quantidade}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.unidade}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.desconto}%
                              </TableCell>
                              <TableCell className="text-right">
                                R$ {item.valorUnitario.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                R$ {item.total.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removerItem(item.id)}
                                  className="hover:bg-[var(--destrutivo)] hover:text-white transition"
                                  title="Remover"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumo */}
            <div className="space-y-6">
              <Card className="shadow-lg hover:shadow-2xl border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2"
                    style={{ color: "var(--sidebar-primaria)" }}
                  >
                    <Calculator className="h-5 w-5 text-[var(--sidebar-primaria)]" />
                    Resumo da Nota
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ICMS (18%):</span>
                      <span>
                        <Input
                          type="number"
                          value={
                            icmsManual !== ""
                              ? icmsManual
                              : (subtotal * 0.18).toFixed(2)
                          }
                          onChange={(e) => setIcmsManual(e.target.value)}
                          className="w-24 border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition text-right"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>IPI:</span>
                      <span>
                        <Input
                          type="number"
                          value={ipiManual !== "" ? ipiManual : "0.00"}
                          onChange={(e) => setIpiManual(e.target.value)}
                          className="w-24 border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition text-right"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PIS:</span>
                      <span>
                        <Input
                          type="number"
                          value={pisManual !== "" ? pisManual : "0.00"}
                          onChange={(e) => setPisManual(e.target.value)}
                          className="w-24 border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition text-right"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>COFINS:</span>
                      <span>
                        <Input
                          type="number"
                          value={cofinsManual !== "" ? cofinsManual : "0.00"}
                          onChange={(e) => setCofinsManual(e.target.value)}
                          className="w-24 border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition text-right"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Percent className="h-4 w-4" />
                        Deduzir PIS/COFINS:
                      </span>
                      <span>
                        <Input
                          type="number"
                          value={erros.deducaoPisCofins || ""}
                          onChange={(e) =>
                            setErros({
                              ...erros,
                              deducaoPisCofins: e.target.value,
                            })
                          }
                          className="w-24 border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition text-right"
                        />
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Status da Nota</h4>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1 bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                    >
                      Rascunho
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Informações</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Série: {dadosNota.serie}</div>
                      <div>Número: {dadosNota.numero}</div>
                      <div>CFOP: {dadosNota.cfop}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-2xl border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2"
                    style={{ color: "var(--sidebar-primaria)" }}
                  >
                    <Calculator className="h-5 w-5 text-[var(--sidebar-primaria)]" />
                    Impostos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>ICMS:</span>
                    <span>R$ {icms.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IPI:</span>
                    <span>R$ {ipi.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>PIS:</span>
                    <span>R$ {pis.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>COFINS:</span>
                    <span>R$ {cofins.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
