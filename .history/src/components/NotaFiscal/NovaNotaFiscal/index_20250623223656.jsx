import { SidebarProvider } from "../../ui/sidebar";
import LayoutComSidebar from "../../MobileSideBar";
import HeaderPagina from "../../HeaderPagina";
import { Button } from "../../ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function NovaNotaFiscal() {
  return (
    <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Emitir Nova NF-e"
            subtitulo="Preencha os dados para emitir uma nova nota fiscal eletrônica"
            acao={
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="cursor-pointer hover:bg-[var(--secundaria)] hover:text-[var(--texto)] transition-colors"
                >
                  Salvar Rascunho
                </Button>

                <Button
                  asChild
                  className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
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
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Nota Fiscal</CardTitle>
                  <CardDescription>
                    Informações básicas da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="series">Série</Label>
                      <Input
                        id="series"
                        value={invoiceData.series}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            series: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        value={invoiceData.number}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            number: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select
                      value={selectedClient}
                      onValueChange={setSelectedClient}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem
                            key={client.id}
                            value={client.id.toString()}
                          >
                            {client.name} - {client.document}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cfop">CFOP</Label>
                      <Input
                        id="cfop"
                        value={invoiceData.cfop}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            cfop: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="operationNature">
                        Natureza da Operação
                      </Label>
                      <Input
                        id="operationNature"
                        value={invoiceData.operationNature}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            operationNature: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itens da Nota */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens da Nota Fiscal</CardTitle>
                  <CardDescription>
                    Adicione os produtos/serviços da nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="product">Produto</Label>
                      <Select
                        value={selectedProduct}
                        onValueChange={setSelectedProduct}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um produto" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem
                              key={product.id}
                              value={product.id.toString()}
                            >
                              {product.name} - R$ {product.value.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor="quantity">Qtd</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={addItem}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {items.length > 0 && (
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead className="text-right">
                              Valor Unit.
                            </TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                {item.productName}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.quantity}
                              </TableCell>
                              <TableCell className="text-right">
                                R$ {item.unitValue.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                R$ {item.total.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
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
              <Card>
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
                    <Badge variant="secondary">Rascunho</Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Informações</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Série: {invoiceData.series}</div>
                      <div>Número: {invoiceData.number}</div>
                      <div>CFOP: {invoiceData.cfop}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
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
