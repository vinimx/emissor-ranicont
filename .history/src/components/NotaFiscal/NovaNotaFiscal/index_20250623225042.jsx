import { SidebarProvider } from "../../ui/sidebar";
import LayoutComSidebar from "../../MobileSideBar";
import HeaderPagina from "../../HeaderPagina";
import { Button } from "../../ui/button";
import { FileText, Plus, Trash2, Calculator } from "lucide-react";
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
import { useState, useRef } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../../ui/tooltip";

export default function NovaNotaFiscal() {
  // Estados em português
  const [dadosNota, setDadosNota] = useState({
    serie: "",
    numero: "",
    cfop: "",
    naturezaOperacao: "",
  });
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState([]);
  const [clientes] = useState([
    { id: 1, nome: "João", documento: "123.456.789-00" },
    { id: 2, nome: "Maria", documento: "987.654.321-00" },
  ]);
  const [produtos] = useState([
    { id: 1, nome: "Produto A", valor: 100 },
    { id: 2, nome: "Produto B", valor: 200 },
  ]);
  const [tipoNota, setTipoNota] = useState(""); // Entrada ou Saída
  const [finalidade, setFinalidade] = useState(""); // Normal, Devolução, etc
  const [referenciaNota, setReferenciaNota] = useState(""); // Referência de NF
  const [observacoes, setObservacoes] = useState(""); // Observações
  const [feedback, setFeedback] = useState("");
  const timeoutRef = useRef();

  // Cálculos
  const subtotal = itens.reduce((acc, item) => acc + item.total, 0);
  const icms = subtotal * 0.18;
  const total = subtotal + icms;

  // Funções
  function adicionarItem() {
    const produto = produtos.find(
      (p) => p.id.toString() === produtoSelecionado
    );
    if (!produto) return;
    const totalItem = produto.valor * quantidade;
    setItens([
      ...itens,
      {
        id: Date.now(),
        nomeProduto: produto.nome,
        quantidade: quantidade,
        valorUnitario: produto.valor,
        total: totalItem,
        status: "Novo",
      },
    ]);
    setFeedback("Produto adicionado!");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(""), 1200);
  }

  function removerItem(id) {
    setItens(itens.filter((item) => item.id !== id));
    setFeedback("Produto removido!");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(""), 1200);
  }

  function limparTudo() {
    setItens([]);
    setFeedback("Itens limpos!");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(""), 1200);
  }

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant={itens.length === 0 ? "secondary" : "default"} className="text-xs px-2 py-1">
                {itens.length === 0 ? "Rascunho" : "Pronto para emitir"}
              </Badge>
              <span className="text-xs text-[var(--suave-texto)]">{itens.length} item(s)</span>
              {feedback && <span className="ml-2 text-xs text-green-600 animate-pulse">{feedback}</span>}
            </div>
            <Button variant="outline" size="sm" onClick={limparTudo} className="border-[var(--destrutivo)] text-[var(--destrutivo)] hover:bg-[var(--destrutivo)]/10 transition-colors">
              Limpar Tudo
            </Button>
          </div>
          <HeaderPagina
            titulo="Emitir Nova NF-e"
            subtitulo="Preencha os dados para emitir uma nova nota fiscal eletrônica"
            acao={
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer hover:bg-[var(--secundaria)] hover:text-[var(--texto)] transition-colors"
                      >
                        Salvar Rascunho
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Salve para continuar depois</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)] shadow-md hover:shadow-lg"
                      >
                        <Link to="#">
                          <FileText className="h-4 w-4 mr-2" />
                          Emitir NF-e
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Emitir nota fiscal eletrônica</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            }
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Dados da Nota */}
              <Card className="border-[var(--sidebar-primaria)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--sidebar-primaria)]">
                    <FileText className="h-5 w-5" /> Dados da Nota Fiscal
                  </CardTitle>
                  <CardDescription>
                    Informações básicas da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* NOVOS CAMPOS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipoNota">Tipo da Nota <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Select value={tipoNota} onValueChange={setTipoNota}>
                        <SelectTrigger className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entrada">Entrada</SelectItem>
                          <SelectItem value="Saída">Saída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finalidade">Finalidade da Operação <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Select value={finalidade} onValueChange={setFinalidade}>
                        <SelectTrigger className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]">
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
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referenciaNota">Referência de NF-e</Label>
                    <Input
                      id="referenciaNota"
                      placeholder="Número da nota fiscal referenciada"
                      value={referenciaNota}
                      onChange={(e) => setReferenciaNota(e.target.value)}
                      className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serie">Série <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Input
                        id="serie"
                        value={dadosNota.serie}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, serie: e.target.value })
                        }
                        className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Input
                        id="numero"
                        value={dadosNota.numero}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, numero: e.target.value })
                        }
                        className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente <span className="text-[var(--destrutivo)]">*</span></Label>
                    <Select
                      value={clienteSelecionado}
                      onValueChange={setClienteSelecionado}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]">
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem
                            key={cliente.id}
                            value={cliente.id.toString()}
                          >
                            {cliente.nome} - {cliente.documento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cfop">CFOP <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Input
                        id="cfop"
                        value={dadosNota.cfop}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, cfop: e.target.value })
                        }
                        className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="naturezaOperacao">
                        Natureza da Operação <span className="text-[var(--destrutivo)]">*</span>
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
                        className="focus:ring-2 focus:ring-[var(--sidebar-primaria)] border-[var(--sidebar-primaria)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <textarea
                      id="observacoes"
                      placeholder="Observações adicionais"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-primaria)]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Itens da Nota */}
              <Card className="border-[var(--sidebar-accent)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--sidebar-accent-foreground)]">
                    <Plus className="h-5 w-5" /> Itens da Nota Fiscal
                  </CardTitle>
                  <CardDescription>
                    Adicione os produtos/serviços da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="produto">Produto <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Select
                        value={produtoSelecionado}
                        onValueChange={setProdutoSelecionado}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-[var(--sidebar-accent)] border-[var(--sidebar-accent)]">
                          <SelectValue placeholder="Selecione um produto" />
                        </SelectTrigger>
                        <SelectContent>
                          {produtos.map((produto) => (
                            <SelectItem
                              key={produto.id}
                              value={produto.id.toString()}
                            >
                              {produto.nome} - R$ {produto.valor.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor="quantidade">Qtd <span className="text-[var(--destrutivo)]">*</span></Label>
                      <Input
                        id="quantidade"
                        type="number"
                        min="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        className="focus:ring-2 focus:ring-[var(--sidebar-accent)] border-[var(--sidebar-accent)]"
                      />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={adicionarItem}
                            className="bg-[var(--sidebar-accent)] hover:bg-[var(--sidebar-primaria)] text-white shadow-md hover:shadow-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Adicionar produto</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {itens.length > 0 && (
                    <div className="border rounded-lg overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead className="text-right">Valor Unit.</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itens.map((item) => (
                            <TableRow key={item.id} className="hover:bg-[var(--suave)] transition-colors group">
                              <TableCell className="font-medium flex items-center gap-2">
                                {item.nomeProduto}
                                <Badge variant="outline" className="text-xs border-[var(--sidebar-accent)] group-hover:bg-[var(--sidebar-accent)] group-hover:text-white transition-colors">{item.status}</Badge>
                              </TableCell>
                              <TableCell className="text-center">{item.quantidade}</TableCell>
                              <TableCell className="text-right">R$ {item.valorUnitario.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">R$ {item.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removerItem(item.id)}
                                        className="border-[var(--destrutivo)] text-[var(--destrutivo)] hover:bg-[var(--destrutivo)]/10 hover:text-[var(--destrutivo-texto)] transition-colors"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Remover item</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo */}
            <div className="space-y-6">
              <Card className="border-[var(--sidebar-primaria)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--sidebar-primaria)]">
                    <Calculator className="h-5 w-5" /> Resumo da Nota
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
                      <span>R$ {icms.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg text-[var(--sidebar-primaria)]">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Status da Nota</h4>
                    <Badge variant={itens.length === 0 ? "secondary" : "default"} className="text-xs px-2 py-1">
                      {itens.length === 0 ? "Rascunho" : "Pronto para emitir"}
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

              <Card className="border-[var(--sidebar-accent)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--sidebar-accent-foreground)]">
                    <Calculator className="h-5 w-5" /> Impostos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>ICMS:</span>
                    <span>R$ {icms.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IPI:</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>PIS:</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>COFINS:</span>
                    <span>R$ 0,00</span>
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
