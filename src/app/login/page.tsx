"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useStore from "../../contexts/store";
import { getBaseUrl } from "../../utils/api";
import { z } from "zod";

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

const Login = () => {
  const router = useRouter();
  const setIsPremium = useStore((state) => state.setIsPremium);
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "isPremium",
          data.user.isPremium ? "true" : "false"
        );
        if (data.user.subscriptionId) {
          localStorage.setItem("subscriptionId", data.user.subscriptionId);

          setSubscriptionId(data.user.subscriptionId);
        }
        setIsPremium(data.user.isPremium);
        toast.success("Login bem-sucedido!");
        router.push("/");
      } else {
        toast.error(data.error || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const injectScript = () => {
      const userSubscription = localStorage.getItem(
        "user-subscription-storage"
      );
      if (userSubscription) {
        chrome.runtime.sendMessage(
          { action: "storeSubscriptionData", data: userSubscription },
          (response: any) => {
            console.log("Subscription data sent to extension:", response);
          }
        );
      }
    };

    // Injetar o script após o login bem-sucedido
    if (localStorage.getItem("token")) {
      injectScript();
    }
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
          <label className="block text-gray-700">Senha</label>
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
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p className="mt-4 text-center text-gray-700">
          Não tem uma conta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Registrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
