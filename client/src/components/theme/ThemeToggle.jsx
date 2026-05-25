import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        w-11
        h-11
        rounded-xl
        flex
        items-center
        justify-center
        border
        border-slate-700
        hover:bg-slate-800
        transition
      "
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
