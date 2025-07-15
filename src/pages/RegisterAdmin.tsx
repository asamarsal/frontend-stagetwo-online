import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { authRegisterService } from "@/service/apiAuth";
import { toast } from "sonner";

export default function RegisterAdmin() {
  const navigate = useNavigate();

  const role = "superuser";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !profile) {
      setErrorMsg("Semua field wajib diisi");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profile", profile);
      formData.append("role", role);

      const response = await authRegisterService.register(formData);

      if (response.message === "User registered" && response.user) {
        toast("Berhasil Mendaftar", {
          description: "Berhasil mendaftarkan user baru",
        });
        navigate("/login");
      } else {
        setErrorMsg("Registrasi gagal. Silakan coba lagi.");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMsg("Data yang dimasukkan tidak valid");
      } else if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
      }
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-svh p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Admin</h1>
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 p-4 border border-green-400 rounded-2xl shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <div>
          <Label htmlFor="email" className="pb-2">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>

        <div>
          <Label htmlFor="profile" className="pb-2">Upload Profile</Label>
          <Input
            id="profile"
            type="file"
            
            placeholder="Upload Profile "
            onChange={(e) => setProfile(e.target.files?.[0] || null)}
            required
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
          {isLoading ? "Loading..." : "Register"}
        </Button>

        <div>
            <h1 className="text-sm text-center mt-4">
                Register Sebagai User?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">Click</Link>
            </h1>
            <h1 className="text-sm text-center mt-4">
                Sudah Punya Akun?{" "}
                <Link to="/login" className="text-green-600 hover:underline">Login</Link>
            </h1>
        </div>
      </form>
    </div>
  );
} 