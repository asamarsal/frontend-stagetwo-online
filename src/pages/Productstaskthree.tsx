import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Loader2Icon, LucideInfo } from "lucide-react"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

const posts = [
  { id: 1, title: "Nasi Goreng", isipost: "Nasi Goreng adalah makanan khas indonesia yang terbuat dari nasi yang digoreng.", image: "/3.png"  },
  { id: 2, title: "Mie Goreng", isipost: "Mie Goreng adalah makanan yang terbuat dari mie gandum dan sayuran yang digoreng.", image: "/2.png" },
  { id: 3, title: "Sate Ayam", isipost: "Sate Ayam adalah makanan yang terbuat dari ayam dengan bambu dan dibakar.", image: "/1.png"  },
];

export default function Productstaskthree() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full select-none mt-6">
      <h1 className="text-3xl font-bold mb-6">Using of Shadcn</h1>
      <Card className="w-full max-w-[900px]">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Products Detail</CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center gap-4 flex-wrap">
          {posts.map((post) => (
            <Card key={post.id} className="w-60 flex-shrink-0">
                <CardHeader>
                <CardTitle className="text-lg text-center">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                <img src={post.image} alt={post.title} className="mb-2 w-full h-auto rounded-md" />
                <p className="text-sm text-center">{post.isipost}</p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button className="mt-2 bg-blue-500 text-white"><LucideInfo />Detail</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-transparent shadow-none border-none p-0">
                    <Card className="rounded-xl">
                        <CardHeader>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>
                            <img src={post.image} alt={post.title} className="mb-2 w-full h-auto rounded-md" />
                            <p className="text-sm text-black">{post.isipost}</p>
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end gap-2">

                        <Link to={`/products/${post.id}`}>
                            <Button className="bg-green-500">More Detail</Button>
                        </Link>

                        <AlertDialogCancel asChild>
                            <Button variant="outline">Tutup</Button>
                        </AlertDialogCancel>
                        </CardContent>
                    </Card>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button className="mt-2 bg-green-500">Add Products</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-transparent shadow-none border-none p-0">
                    <Card className="rounded-xl">
                        <CardHeader>
                        <CardTitle>Tambah ke cart?</CardTitle>
                        <CardDescription>Tindakan ini tidak dapat dibatalkan.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end space-x-2">
                        <AlertDialogCancel asChild>
                            <Button variant="outline">Batal</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button className="bg-green-500" onClick={() => {
                                
                                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                                
                                if (!cart.find((item: any) => item.id === post.id)) {
                                    cart.push(post);
                                    localStorage.setItem("cart", JSON.stringify(cart));
                                }
                                }}>Tambah
                            </Button>
                        

                        </AlertDialogAction>
                        </CardContent>
                    </Card>
                    </AlertDialogContent>
                </AlertDialog>
                </CardContent>
            </Card>
))}
        </CardContent>

        <CardContent className="flex justify-center gap-2">
          <Link to="/">
            <Button className="bg-blue-500">Home</Button>
          </Link>
          <Link to="/cart">
            <Button className="bg-red-500">
              <Loader2Icon className="animate-spin mr-2" />Cart
            </Button>
          </Link>
        </CardContent>

        
      </Card>
    </div>
  )
}
