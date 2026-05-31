import { Link, NavLink } from "react-router-dom";
import { Link2 } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItemClassName = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-semibold transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  }`;

const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="focus-ring inline-flex items-center gap-2 rounded-full p-1">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-lg shadow-blue-700/30">
            <Link2 size={18} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight">Shortly</span>
            <span className="text-xs font-medium muted">Fast URL Shortener</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink to="/" className={navItemClassName} end>
            Home
          </NavLink>
          <a
            href="/#recent"
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Recent
          </a>
        </nav>

        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
      </div>
    </motion.header>
  );
};

export default Navbar;
