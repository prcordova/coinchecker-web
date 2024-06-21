"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z, ZodError } from "zod";
import { getBaseUrl } from "../../utils/api";

// Definindo o schema de validação com zod
const schema = z.object({
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipagem dos erros de validação
type ValidationErrors = {
  email?: string[];
  password?: string[];
};

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Resetar erros antes da validação
    setErrors({});

    // Validar os dados usando zod
    const validationResult = schema.safeParse({ email, password });

    if (!validationResult.success) {
      const fieldErrors: ValidationErrors = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          const fieldName = error.path[0] as keyof ValidationErrors;
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = [];
          }
          fieldErrors[fieldName]?.push(error.message);
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${getBaseUrl()}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registro bem-sucedido! Por favor, faça login.");
        router.push("/login");
      } else {
        toast.error(data.error || "Error on register.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Error on register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.join(", ")}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.join(", ")}
            </p>
          )}
        </div>
        <button
          onClick={handleRegister}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-4 text-center text-gray-700">
          Already have an account ?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
