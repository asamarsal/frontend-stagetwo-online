import type { LoginRequest } from "@/types/LoginRequest";
import type { LoginResponse } from "@/types/LoginResponse";
import type { RegisterRequest } from "@/types/RegisterRequest";
import type { RegisterResponse } from "@/types/RegisterResponse";

import axios from "axios";


export const apiAuth = axios.create({
  baseURL: "/",
});

export const apiAuthRegister = axios.create({
  baseURL: "http://localhost:3000",
});

export const authLoginService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiAuth.post("/auth/login", credentials);
    return response.data;
  },
};

export const authLoginAdminService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiAuth.post("/auth/suppliers/login", credentials);
    return response.data;
  },
};

export const authRegisterService = {
  register: async (formData: FormData): Promise<RegisterResponse> => {
    const response = await apiAuthRegister.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export const authRegisterAdminService = {
  register: async (formData: FormData): Promise<RegisterResponse> => {
    const response = await apiAuthRegister.post("/auth/suppliers/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};