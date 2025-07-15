import { CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const posts = [
  { id: 1, isipost: "Ini adalah isi Postingan 1. Virus generator adalah program yang digunakan untuk membuat sebuah virus.", image: "eggluminate3.png" },
  { id: 2, isipost: "Ini adalah isi Postingan 2. Sebelum mengextract file virus maker, harap matikan antivirus dan windows defender terlebih dahulu.", image: "eggluminate4.png" },
  { id: 3, isipost: "Ini adalah isi Postingan 3. Untuk informasi lebih lanjut, silakan hubungi tim dukungan kami.", image: "eggluminate5.png" },
];

export default function PostDetail() {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === Number(postId));
  return (
    <div className="border ml-4 mr-4 rounded bg-blue-200">
        <CardContent className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Product</h2>
            <p>Showing details for post ID: <span className="font-mono">{postId}</span></p>
            <ul className="mb-2 mt-2">
              {post ? (
                <li>{post.isipost}</li>
              ) : (
                <li>Postingan tidak ditemukan</li>
              )}
            </ul>
        </CardContent>
    </div>
  );
} 