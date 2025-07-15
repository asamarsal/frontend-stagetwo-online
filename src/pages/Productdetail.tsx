import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";

const posts = [
  { id: 1, isipost: "Nasi Goreng adalah makanan khas indonesia yang terbuat dari nasi yang digoreng.", image: "/3.png" },
  { id: 2, isipost: "Mie Goreng adalah makanan yang terbuat dari mie gandum dan sayuran yang digoreng.", image: "/2.png" },
  { id: 3, isipost: "Sate Ayam adalah makanan yang terbuat dari ayam yang ditusuk dengan bambu kecil dan dibakar.", image: "/1.png" },
];

export default function ProductDetail() {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === Number(postId));
  return (
    <div className="border m-4 rounded bg-blue-200">
        <CardContent className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mt-2 mb-2">Product</h2>
            <p className="mb-2">Showing details for post ID : <span className="font-mono">{postId}</span></p>
            
            {post && post.image ? (
              <img src={post.image}/>
            ) : (
                <li>Postingan tidak ditemukan</li>
              )
            }

            <ul className="mb-2 mt-2">
              {post ? (
                <li>{post.isipost}</li>
              ) : (
                <li>Postingan tidak ditemukan</li>
              )}
            </ul>

            <Link to={`/productstaskthree`}>
              <Button className="mb-4">Product</Button>
            </Link>
            
        </CardContent>
    </div>
  );
}