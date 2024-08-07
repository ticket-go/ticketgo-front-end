import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";
import { Typography } from "@/components/typography";

export function LoginForm() {
  return (
    <form>
      <div className="flex flex-col items-center gap-4">
        <Typography variant="h1" fontWeight={"bold"}>
          Entre na sua conta
        </Typography>
        <div className="flex flex-col gap-4 w-[400px]">
          <FormItem
            label="Email"
            htmlForm="email"
            placeholder="Digite seu email"
            type="email"
          />

          <FormItem
            label="Senha"
            htmlForm="password"
            placeholder="Digite sua senha"
            type="password"
          />
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Separator />
            <GoogleButton />
          </div>
        </div>
      </div>
    </form>
  );
}

function FormItem({
  label,
  htmlForm,
  placeholder,
  type,
}: {
  label: string;
  htmlForm: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlForm} className="text-lg">
        {label}
      </Label>
      <Input
        type={type}
        id={htmlForm}
        placeholder={placeholder}
        className="h-14"
      />
    </div>
  );
}

function Separator() {
  return (
    <div className="flex items-center w-fit gap-2">
      <hr className=" border-t border-gray-400 w-32 " />
      <span className="text-gray-300">ou</span>
      <hr className=" border-t border-gray-400 w-32 " />
    </div>
  );
}
