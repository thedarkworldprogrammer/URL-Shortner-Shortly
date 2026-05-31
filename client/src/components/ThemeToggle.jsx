import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-slate-300/70 bg-white/85 px-3 text-sm font-semibold text-slate-700 transition hover:scale-[1.02] hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
