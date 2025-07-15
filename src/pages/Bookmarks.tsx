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

export default function Bookmarks() {

  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(storedBookmarks);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 min-h-svh select-none">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl text-center">Bookmarks</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center gap-2">
            <ul className="px-6 pb-2">
              {bookmarks.length === 0 ? (
                <li>Bookmark kosong</li>
              ) : (
                bookmarks.map((item) => (
                  <li key={item.imdbID} className="mb-2 flex items-center">
                    <img src={item.Poster} alt={item.Title} className="w-30 h-30 m-2" />
                    {item.Title}
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
                          <CardTitle>Hapus semua yang ada di bookmark?</CardTitle>
                          <CardDescription>Tindakan ini tidak dapat dibatalkan</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end space-x-2">
                          <AlertDialogCancel asChild>
                            <Button variant="outline">Batal</Button>
                          </AlertDialogCancel>
                          <AlertDialogAction asChild>
                              <Button className="bg-green-500"  onClick={() => {
                                localStorage.removeItem("bookmark");
                                setBookmarks([]);}
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