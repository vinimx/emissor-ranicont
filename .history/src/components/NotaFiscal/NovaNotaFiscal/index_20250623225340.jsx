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
import { useState } from "react";

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
      },
    ]);
  }

  function removerItem(id) {
    setItens(itens.filter((item) => item.id !== id));
  }

  function limparTudo() {
    setDadosNota({ serie: "", numero: "", cfop: "", naturezaOperacao: "" });
    setClienteSelecionado("");
    setProdutoSelecionado("");
    setQuantidade(1);
    setItens([]);
    setTipoNota("");
    setFinalidade("");
    setReferenciaNota("");
    setObservacoes("");
  }

  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Emitir Nova NF-e"
            subtitulo="Preencha os dados para emitir uma nova nota fiscal eletrônica"
            acao={
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="cursor-pointer hover:bg-[var(--secundaria)] hover:text-[var(--texto)] transition-colors border border-[var(--sidebar-borda)]"
                  onClick={limparTudo}
                  title="Limpar todos os campos"
                >
                  Limpar Tudo
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
              <Card className="shadow-lg hover:shadow-2xl transition-shadow border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle>Dados da Nota Fiscal</CardTitle>
                  <CardDescription>
                    Informações básicas da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* NOVOS CAMPOS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipoNota">Tipo da Nota</Label>
                      <Select value={tipoNota} onValueChange={setTipoNota}>
                        <SelectTrigger className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entrada">Entrada</SelectItem>
                          <SelectItem value="Saída">Saída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finalidade">Finalidade da Operação</Label>
                      <Select value={finalidade} onValueChange={setFinalidade}>
                        <SelectTrigger className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition">
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
                      className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serie">Série</Label>
                      <Input
                        id="serie"
                        value={dadosNota.serie}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, serie: e.target.value })
                        }
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input
                        id="numero"
                        value={dadosNota.numero}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, numero: e.target.value })
                        }
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente</Label>
                    <Select
                      value={clienteSelecionado}
                      onValueChange={setClienteSelecionado}
                    >
                      <SelectTrigger className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition">
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
                    {/* Preview do cliente selecionado */}
                    {clienteSelecionado && (
                      <div className="mt-1 text-xs text-[var(--sidebar-primaria)] bg-[var(--suave)] rounded p-2">
                        <b>Cliente:</b> {clientes.find(c => c.id.toString() === clienteSelecionado)?.nome} <br />
                        <b>Documento:</b> {clientes.find(c => c.id.toString() === clienteSelecionado)?.documento}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cfop">CFOP</Label>
                      <Input
                        id="cfop"
                        value={dadosNota.cfop}
                        onChange={(e) =>
                          setDadosNota({ ...dadosNota, cfop: e.target.value })
                        }
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="naturezaOperacao">
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
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
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
                      className="w-full rounded-md border border-[var(--sidebar-borda)] bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Itens da Nota */}
              <Card className="shadow-lg hover:shadow-2xl transition-shadow border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle>Itens da Nota Fiscal</CardTitle>
                  <CardDescription>
                    Adicione os produtos/serviços da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="produto">Produto</Label>
                      <Select
                        value={produtoSelecionado}
                        onValueChange={setProdutoSelecionado}
                      >
                        <SelectTrigger className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition">
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
                      {/* Preview do produto selecionado */}
                      {produtoSelecionado && (
                        <div className="mt-1 text-xs text-[var(--sidebar-primaria)] bg-[var(--suave)] rounded p-2">
                          <b>Produto:</b> {produtos.find(p => p.id.toString() === produtoSelecionado)?.nome} <br />
                          <b>Valor:</b> R$ {produtos.find(p => p.id.toString() === produtoSelecionado)?.valor.toFixed(2)}
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-24 space-y-2">
                      <Label htmlFor="quantidade">Qtd</Label>
                      <Input
                        id="quantidade"
                        type="number"
                        min="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        className="w-full border-[var(--sidebar-borda)] focus:ring-2 focus:ring-[var(--sidebar-primaria)] transition"
                      />
                    </div>
                    <Button
                      onClick={adicionarItem}
                      className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow"
                      title="Adicionar item"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Lista de itens (mobile) */}
                  <div className="flex flex-col gap-3 md:hidden">
                    {itens.length === 0 && (
                      <div className="text-center text-xs text-muted-foreground py-4">
                        Nenhum item adicionado ainda.
                      </div>
                    )}
                    {itens.map(item => (
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
                          Qtd: {item.quantidade} | Unit: R$ {item.valorUnitario.toFixed(2)} | Total: R$ {item.total.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tabela de itens (tablet/desktop) */}
                  <div className="hidden md:block border rounded-lg overflow-x-auto">
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
                            <TableHead className="text-right">Valor Unit.</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itens.map((item) => (
                            <TableRow key={item.id} className="hover:bg-[var(--suave)] transition-colors">
                              <TableCell className="font-medium">{item.nomeProduto}</TableCell>
                              <TableCell className="text-center">{item.quantidade}</TableCell>
                              <TableCell className="text-right">R$ {item.valorUnitario.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">R$ {item.total.toFixed(2)}</TableCell>
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
              <Card className="shadow-lg hover:shadow-2xl transition-shadow border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
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
                      <span>R$ {icms.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Status da Nota</h4>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]">Rascunho</Badge>
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

              <Card className="shadow-lg hover:shadow-2xl transition-shadow border border-[var(--sidebar-borda)] bg-[var(--sidebar-fundo)]">
                <CardHeader>
                  <CardTitle>Impostos</CardTitle>
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
