import { z } from "zod";

export const UserFormSchema = z.object({
  username: z
    .string({ required_error: "Nome de usuário é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no min 4 caracteres" })
    .max(20, { message: "Nome inválido, deve conter no máx 20 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Usuário deve conter apenas letras, números e _",
    }),
  first_name: z
    .string({ required_error: "Nome é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no mini 4 caracteres" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Usuário deve conter apenas letras",
    }),
  last_name: z
    .string({ required_error: "Nome é obrigatório" })
    .trim()
    .min(4, { message: "Nome inválido, deve conter no mini 4 caracteres" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Usuário deve conter apenas letras",
    }),
  email: z.string({ required_error: "E-mail é obrigatório" }).email().trim(),
  phone: z.string({ required_error: "Telefone é obrigatório" }).trim(),
});
