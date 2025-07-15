import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudMoon, CloudSun } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <CloudSun className="w-4 h-4" /> : <CloudMoon className="w-4 h-4" />}
    </Button>
  );
}
