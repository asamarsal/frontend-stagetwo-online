import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import { Button } from "./components/ui/button";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./lib/PrivateRoute";
import ThemeToggle from "./lib/ThemeToggle";
import Cart from "./pages/Cart";
import { LucideBookmark, LucidePlus, LucideShoppingCart } from "lucide-react";
import { Toaster } from "sonner";

import About from "./pages/About";
import Posts from "./pages/Posts";
import Postdetail from "./pages/Postdetail";
import ProductDetail from "./pages/Productdetail";
import AddProduct from "./pages/AddProduct";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import { useEffect, useState } from "react";

import type { User } from "./types/UserInfo";

function Header() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);

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
        console.log("Role user:", data.user?.role);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
      });
    
    // Cek supplier
    fetch('/auth/suppliers/me', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.supplier) {
        setUser(data.supplier);
        console.log("Role supplier:", data.supplier?.role);
      }
    })
    .catch(err => {
      console.error('Failed to fetch supplier:', err);
    });
  }
}, [token]);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 border-b bg-white dark:bg-purple-900 gap-2 sm:gap-0">
      <div className="flex gap-2">
        <Toaster position="top-left"/>

        <Button asChild variant="outline">
          <Link to="/">Home</Link>
        </Button>


        <Button asChild variant="outline">
          <Link to="/products">Products</Link>
        </Button>
        

      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col items-start">
          {token && (
            <p className="text-s">
              <span>{user?.role}</span> <span>{user?.email}</span>
            </p>
          )}


          {token && (
            <p>
              <Link to="/poin">poin</Link>
            </p>
          )}
        </div>

        {token && user?.role === 'user' && (
          <Button asChild variant="outline">
            <Link to="/bookmarks">
            <LucideBookmark /></Link>
          </Button>
        )}

        {token && user?.role === 'user' &&(
          <Button asChild variant="outline">
            <Link to="/cart">
            <LucideShoppingCart />
            </Link>
          </Button>
        )}

        {token && user?.role === 'superuser' && (
          <Button asChild variant="outline">
            <Link to="/addproduct">
              <LucidePlus />
            </Link>
          </Button>
        )}

        <ThemeToggle />
        {token ? (
          <Button onClick={logout} className="bg-red-500 text-white hover:bg-red-600">
            Logout
          </Button>) : (<Button asChild className="bg-green-500 text-white hover:bg-green-600">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
  </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
      
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registeradmin" element={<RegisterAdmin />} />

          <Route path="/about" element={<About />} />
          
          <Route path="/posts" element={<Posts />}>
            <Route path=":postId" element={<Postdetail />} />
          </Route>

          <Route path="/products" element={<Products />} />

          <Route path="/products/:postId" element={<ProductDetail />} />

          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>}>
          </Route>

          <Route path="/addproduct" element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>}>
          </Route>

          <Route path="/bookmarks" element={
            <PrivateRoute>
              <Bookmarks />
            </PrivateRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>);
}

export default App;
