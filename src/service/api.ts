import axios from "axios";
import { tokenService } from "./tokenAuth";

export const api = axios.create({
  baseURL: "http://localhost:3000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const productsApi = axios.create({
  baseURL: "http://localhost:3000/auth",
});

export function addProduct(formData: FormData, token: string) {
  return fetch("http://localhost:3000/auth/products/add", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: formData,
  });
}

export function deleteProduct(id: number, token: string) {
  return fetch(`http://localhost:3000/auth/products/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token ?? ""}`,
      "Content-Type": "application/json",
    },
  });
}