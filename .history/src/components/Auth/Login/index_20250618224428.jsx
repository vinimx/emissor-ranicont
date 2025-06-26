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
import { Mail, Lock } from "lucide-react";
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
            Acesse sua conta para continuar
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
            <CardTitle className="font-bold text-2xl">Entrar</CardTitle>
            <CardDescription style={{ color: "var(--suave-texto)" }}>
              Informe seu e-mail e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 h-4 w-4"
                  style={{ color: "var(--suave-texto)" }}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
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
              className="w-full mt-4"
              style={{
className="w-full mt-4"
  style={{
    background: "var(--primaria)",
    color: "var(--primaria-texto)", // Corrigido aqui
    borderRadius: "var(--raio)",
    border: "none",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition:
      "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              Entrar
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/esqueci-senha"
                style={{ color: "var(--primaria)", fontWeight: "medium" }}
              >
                Esqueci minha senha
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
