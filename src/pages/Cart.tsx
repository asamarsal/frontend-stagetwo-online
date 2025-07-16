import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Loader2Icon, LucideHome, LucideTrash } from "lucide-react"

import{ useEffect, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="flex flex-col items-center mt-6 min-h-svh select-none">
        <Card className="w-full max-w-[600px]">
          <CardHeader>
            <CardTitle className="text-xl text-center">Cart</CardTitle>
            {cart.length > 0 && (
              <CardDescription className="text-center text-green-500">
                Semuanya: ${total.toLocaleString()}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex justify-center gap-2">
            <ul className="w-full px-6 pb-2 space-y-4">
              {cart.length === 0 ? (
                <li>Cart kosong</li>
              ) : (
                cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.photo} 
                        alt={item.name} 
                        className="w-20 h-20 object-contain rounded" 
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-green-500">
                          ${item.price.toLocaleString()} x {item.quantity || 1}
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          Total: ${((item.quantity || 1) * item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        const newCart = cart.filter(cartItem => cartItem.id !== item.id);
                        localStorage.setItem("cart", JSON.stringify(newCart));
                        setCart(newCart);
                      }}
                    >
                      <LucideTrash className="h-4 w-4" />
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </CardContent>
      </Card>
    </div>
  )
}