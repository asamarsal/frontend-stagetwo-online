import { useEffect, useState } from "react";
import { api } from "../service/api";

import Lottie from "lottie-react";

import loadingworld from "../assets/animations/loadingworld.json";

"use client"
import { toast } from "sonner"

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

  function savetoCart(product: ProductType) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.some((item: ProductType) => item.id === product.id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  // State daftar produk, loading, dan produk yang dipilih
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } 
      catch (err) {
        console.error("Fetch gagal", err);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Lottie animationData={loadingworld} loop={true} style={{ width: 300, height: 300 }} />
        </div>

      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {products.map((product) => (
            <Dialog key={product.id}>

              <DialogTrigger asChild>
                <Card
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer hover:shadow-emerald-500 h-full flex flex-col">
                  <CardHeader className="flex flex-col flex-1 h-full">
                    <img
                      src={product.image}
                      className="w-full h-32 object-contain mb-2 rounded"/>
                    
                    <CardTitle>{product.title}</CardTitle>

                    <CardDescription className="truncate">
                      ${product.price}
                    </CardDescription>

                    <Button className="mt-auto w-full">Detail</Button>

                  </CardHeader>
                </Card>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl mb-2">{selectedProduct?.title}</DialogTitle>
                  <img
                      src={product.image}
                      className="w-full h-32 object-contain mb-2 rounded"/>

                  <CardDescription className="truncate text-green-500">
                      ${product.price}
                  </CardDescription>  

                  <DialogDescription>{selectedProduct?.description}</DialogDescription>
                  
                  <Button
                    className="mt-2 w-full bg-green-400"
                    onClick={() => {
                          savetoCart(product);
                          toast("Product added to cart", {
                            description: selectedProduct?.title,
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          });
                        }}
                    >Buy
                  </Button>

                  

                </DialogHeader>
              </DialogContent>

            </Dialog>))}
        </ul>
      )}
    </div>
  );
}
