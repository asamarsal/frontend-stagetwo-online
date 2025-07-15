import { Link, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const posts = [
  { id: 1, title: "Postingan 1" },
  { id: 2, title: "Postingan 2" },
  { id: 3, title: "Postingan 3" },
];


export default function Posts() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full select-none mt-6">
        <h1 className="text-3xl font-bold mb-6">Checkpoint 1</h1>
        <Card className="w-full max-w-[400px]">

            <CardHeader>
                <CardTitle className="text-3xl text-center">Post Detail</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center gap-2">
                <ul className="mb-2">
                    {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={post.id.toString()} className="text-blue-500 underline">
                        {post.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </CardContent>
            <Outlet />

            <CardContent className="flex justify-center gap-2">
                <Link to="/">
                    <Button className="bg-blue-500">Home</Button>
                </Link>
                <Link to="/about">
                    <Button className="bg-green-500">About</Button>
                </Link>
            </CardContent>
        </Card>
    </div>
  )
}