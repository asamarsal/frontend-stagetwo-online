"use client"
import { useEffect, useState } from "react";
import { api, deleteProduct, productsApi } from "../service/api";
import { useAuth } from "../hooks/useAuth";

import Lottie from "lottie-react";
import loadingworld from "../assets/animations/loadingworld.json";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import type { ProductType } from "../types/ProductType";

export default function Products() {
  const { token } = useAuth();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const [user, setUser] = useState<any>(null); 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  function savetoCart(product: ProductType) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.some((item: ProductType) => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  function savetoBookmark(product: ProductType) {
    const cart = JSON.parse(localStorage.getItem("bookmark") || "[]");
    const exists = cart.some((item: ProductType) => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("bookmark", JSON.stringify(cart));
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     console.log("token:", token);
  //     console.log("role:", user.role);
  //     console.log("email:", user.email);
  //   }
  // }, [user]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productsApi.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
      if (token) {
        const authToken = localStorage.getItem('authToken');
        
        fetch('/auth/me', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then(res => res.json())
        .then(data => {
          setUser(data.user);
        })
        .catch(err => {
          console.error('Failed to fetch user:', err);
        });
      }
    }, [token]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>


      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Lottie animationData={loadingworld} loop={true} style={{ width: 300, height: 300 }} />
        </div>
      ) : (
        <>
          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {currentProducts.map((product) => (
              <Dialog key={product.id}>
                <DialogTrigger asChild>
                  <Card
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer hover:shadow-emerald-500 h-full flex flex-col">
                    <CardHeader className="flex flex-col flex-1 h-full">
                      <img
                        src={product.photo || ""}
                        className="w-full h-32 object-contain mb-2 rounded"
                      />
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription className="truncate">
                        ${product.price}
                      </CardDescription>
                      <Button className="mt-auto w-full">Detail</Button>
                      {user?.role === 'superuser' && (
                          <Button
                            className="w-full bg-red-400 hover:bg-red-500"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                console.log("API DELETE:", `http://localhost:3000/auth/products/${product.id}`);
                                const res = await deleteProduct(product.id, token ?? "");
                                if (res.ok) {
                                  toast("Product deleted", {
                                    description: product.name,
                                  });
                                  setProducts((prev) => prev.filter((p) => p.id !== product.id));
                                } else {
                                  const errData = await res.json();
                                  toast.error(errData.message || "Failed to delete product");
                                }
                              } catch (err) {
                                toast.error("Failed to delete product");
                              }
                            }}
                          >
                            Delete
                          </Button>
                        )}
                    </CardHeader>
                  </Card>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl mb-2">{selectedProduct?.name}</DialogTitle>
                    <img
                      src={product.photo || ""}
                      className="w-full h-32 object-contain mb-2 rounded"
                    />
                    <CardDescription className="truncate text-green-500">
                      ${product.price}
                    </CardDescription>
                    <p>{product.detail}</p>
                    <DialogDescription>
                      {selectedProduct?.description}
                    </DialogDescription>

                    {token && (
                      <div className="flex gap-2 mt-2">
                        
                        <Button
                          className="w-1/2 bg-green-400 hover:bg-green-500"
                          onClick={() => {
                            savetoBookmark(product);
                            toast("Product added to bookmark", {
                              description: selectedProduct?.name,
                              action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                              },
                            });
                          }}>
                          Bookmarks
                        </Button>

                        <Button
                          className="w-1/2 bg-blue-400 hover:bg-blue-500"
                          onClick={() => {
                            savetoCart(product);
                            toast("Product added to cart", {
                              description: selectedProduct?.name,
                              action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                              },
                            });
                          }}>
                          Buy Now
                        </Button>

                      </div>
                    )}
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </ul>

          {/* Paginationnya */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className="flex items-center px-4">
              Halaman {currentPage} dari {totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
