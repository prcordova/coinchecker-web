"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useStore from "../../contexts/store";
import { getBaseUrl } from "../../utils/api";

const Login = () => {
  const router = useRouter();
  const setIsPremium = useStore((state) => state.setIsPremium);
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
            className="w-full px-4 py-2 mt-2 border rounded-lg  text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg  text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p className="mt-4 text-center  text-gray-700">
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
