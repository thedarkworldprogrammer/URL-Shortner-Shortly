import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-8 text-center"
    >
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 muted">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="focus-ring mt-5 inline-flex rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
      >
        Go to Home
      </Link>
    </motion.section>
  );
};

export default NotFoundPage;
