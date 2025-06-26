import { Save, Building, Shield, Bell, Palette } from "lucide-react";
import HeaderPagina from "../HeaderPagina";
import LayoutComSidebar from "../MobileSideBar";
import { SidebarProvider } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function Configurações() {
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
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="company"
                className="flex items-center justify-"
              >
                <Building className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="fiscal" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Fiscal
              </TabsTrigger>
            </TabsList>
            <TabsContent value="company" className="space-y-6">
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
                      <Label htmlFor="companyName">Razão Social</Label>
                      <Input
                        id="companyName"
                        value={companyData.name}
                        onChange={(e) =>
                          handleCompanyChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={companyData.cnpj}
                        onChange={(e) =>
                          handleCompanyChange("cnpj", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input
                      id="ie"
                      value={companyData.ie}
                      onChange={(e) =>
                        handleCompanyChange("ie", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={companyData.address}
                      onChange={(e) =>
                        handleCompanyChange("address", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={companyData.city}
                        onChange={(e) =>
                          handleCompanyChange("city", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={companyData.state}
                        onChange={(e) =>
                          handleCompanyChange("state", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        value={companyData.zipCode}
                        onChange={(e) =>
                          handleCompanyChange("zipCode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={companyData.phone}
                        onChange={(e) =>
                          handleCompanyChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companyData.email}
                        onChange={(e) =>
                          handleCompanyChange("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fiscal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Fiscais</CardTitle>
                  <CardDescription>
                    Configurações relacionadas à emissão de notas fiscais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRegime">Regime Tributário</Label>
                    <Select
                      value={fiscalData.taxRegime}
                      onValueChange={(value) =>
                        handleFiscalChange("taxRegime", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Simples Nacional</SelectItem>
                        <SelectItem value="2">Lucro Presumido</SelectItem>
                        <SelectItem value="3">Lucro Real</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="series">Série Padrão</Label>
                      <Input
                        id="series"
                        value={fiscalData.series}
                        onChange={(e) =>
                          handleFiscalChange("series", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastNumber">Último Número</Label>
                      <Input
                        id="lastNumber"
                        value={fiscalData.lastNumber}
                        onChange={(e) =>
                          handleFiscalChange("lastNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sefazToken">Token SEFAZ</Label>
                    <Input
                      id="sefazToken"
                      type="password"
                      value={fiscalData.sefazToken}
                      onChange={(e) =>
                        handleFiscalChange("sefazToken", e.target.value)
                      }
                      placeholder="Token de acesso à SEFAZ"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Certificado Digital</h4>
                    <div className="space-y-2">
                      <Label htmlFor="certificatePath">
                        Caminho do Certificado
                      </Label>
                      <Input
                        id="certificatePath"
                        value={fiscalData.certificatePath}
                        onChange={(e) =>
                          handleFiscalChange("certificatePath", e.target.value)
                        }
                        placeholder="C:\certificados\certificado.pfx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certificatePassword">
                        Senha do Certificado
                      </Label>
                      <Input
                        id="certificatePassword"
                        type="password"
                        value={fiscalData.certificatePassword}
                        onChange={(e) =>
                          handleFiscalChange(
                            "certificatePassword",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </LayoutComSidebar>
    </SidebarProvider>
  );
}
