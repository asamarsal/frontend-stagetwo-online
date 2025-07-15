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

  return (
    <div className="flex flex-col items-center mt-6 min-h-svh select-none">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl text-center">Cart</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center gap-2">
            <ul className="px-6 pb-2">
              {cart.length === 0 ? (
                <li>Cart kosong</li>
              ) : (
                cart.map((item) => (
                  <li key={item.id} className="mb-2 flex items-center">
                    <img src={item.image} alt={item.title} className="w-30 h-30 m-2" />
                    {item.title}
                  </li>
                ))
              )}
            </ul>
          </CardContent>
          <CardContent className="flex justify-center gap-2">
              <Link to="/">
                  <Button className="bg-blue-500">
                    <LucideHome/>Home</Button>
              </Link>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="bg-yellow-500"><LucideTrash />Hapus</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-transparent shadow-none border-none p-0">
                    <Card className="rounded-xl">
                        <CardHeader>
                          <CardTitle>Hapus semua yang ada di cart?</CardTitle>
                          <CardDescription>Tindakan ini tidak dapat dibatalkan</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end space-x-2">
                          <AlertDialogCancel asChild>
                            <Button variant="outline">Batal</Button>
                          </AlertDialogCancel>
                          <AlertDialogAction asChild>
                              <Button className="bg-green-500"  onClick={() => {
                                localStorage.removeItem("cart");
                                setCart([]);}
                                }>
                                  Hapus
                              </Button>
                          </AlertDialogAction>
                        </CardContent>
                    </Card>
                </AlertDialogContent>
              </AlertDialog>

              <Link to="/products">
                  <Button variant="destructive">
                    <Loader2Icon className="animate-bounce" />Products
                  </Button>
              </Link>
          </CardContent>
      </Card>
    </div>
  )
}