import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, User, Mail, Building, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../Logo";

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(to bottom right, var(--fundo), var(--secundaria))",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div>
              <Logo />
            </div>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--texto)" }}>
            Emissor Ranicont
          </h1>
          <p style={{ color: "var(--suave-texto)" }}>
            Crie sua conta para começar
          </p>
        </div>

        <Card
          style={{
            background: "var(--cartao)",
            color: "var(--cartao-texto)",
            borderRadius: "var(--raio)",
            border: "1px solid var(--borda)",
          }}
        >
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Criar Conta</CardTitle>
            <CardDescription style={{ color: "var(--suave-texto)" }}>
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 h-4 w-4"
                  style={{ color: "var(--suave-texto)" }}
                />
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  className="pl-10"
                  style={{
                    background: "var(--entrada)",
                    color: "var(--texto)",
                    border: "1px solid var(--borda)",
                    borderRadius: "var(--raio)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 h-4 w-4"
                  style={{ color: "var(--suave-texto)" }}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  style={{
                    background: "var(--entrada)",
                    color: "var(--texto)",
                    border: "1px solid var(--borda)",
                    borderRadius: "var(--raio)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <div className="relative">
                <Building
                  className="absolute left-3 top-3 h-4 w-4"
                  style={{ color: "var(--suave-texto)" }}
                />
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  className="pl-10"
                  style={{
                    background: "var(--entrada)",
                    color: "var(--texto)",
                    border: "1px solid var(--borda)",
                    borderRadius: "var(--raio)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 h-4 w-4"
                  style={{ color: "var(--suave-texto)" }}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  style={{
                    background: "var(--entrada)",
                    color: "var(--texto)",
                    border: "1px solid var(--borda)",
                    borderRadius: "var(--raio)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 h-4 w-4"
                  style={{ color: "var(--suave-texto)" }}
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  style={{
                    background: "var(--entrada)",
                    color: "var(--texto)",
                    border: "1px solid var(--borda)",
                    borderRadius: "var(--raio)",
                  }}
                />
              </div>
            </div>

            <Button
              className="w-full"
              style={{
                background: "var(--primaria)",
                color: "var(--primaria-texto)",
                borderRadius: "var(--raio)",
              }}
            >
              Criar Conta
            </Button>

            <div className="text-center">
              <span className="text-sm" style={{ color: "var(--suave-texto)" }}>
                Já tem uma conta?{" "}
              </span>
              <Link
                to="/login"
                className="text-sm font-medium hover:underline"
                style={{
                  color: "var(--primaria)",
                }}
              >
                <a href="/login">Fazer Login</a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
