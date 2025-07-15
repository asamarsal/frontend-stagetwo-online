import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { authLoginService } from "@/service/apiAuth";
import { tokenService } from "@/service/tokenAuth";

export default function inLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await authLoginService.login({ email, password });
      
      if (response.message === "Login success" && response.token) {

        //Save Token
        tokenService.saveToken(response.token);
        console.log("Login successful!");
        console.log("Token:", response.token);

        login(response.token);

        navigate("/");
      } else {
        setErrorMsg("Login gagal. Silakan coba lagi.");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMsg("Email atau password salah");
      } else {
        setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-svh p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 p-4 border border-green-400 rounded-2xl shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div>
          <Label htmlFor="email" className="pb-2">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="password" className="pb-2">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-800 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>

        <div>
          <h1 className="text-sm text-center mt-4">
            Login Sebagai Admin?{" "}
            <Link to="/loginadmin" className="text-blue-600 hover:underline">Click</Link>
          </h1>
        </div>

        <div>
          <h1 className="text-sm text-center mt-4">
            Belum punya akun?{" "}
            <Link to="/register" className="text-green-600 hover:underline">Register</Link>
          </h1>
        </div>

      </form>
    </div>
  );
}