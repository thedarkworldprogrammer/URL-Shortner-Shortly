import { useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const initialState = {
  originalUrl: "",
  customAlias: "",
  expiresInDays: "",
};

const UrlShortenerForm = ({ onShorten, isSubmitting }) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.originalUrl.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    const payload = {
      originalUrl: formData.originalUrl.trim(),
      customAlias: formData.customAlias.trim() || undefined,
      expiresInDays: formData.expiresInDays || undefined,
    };

    const wasSuccessful = await onShorten(payload);
    if (wasSuccessful) {
      resetForm();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="glass-card rounded-3xl p-5 sm:p-7"
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <Link2 size={17} />
        </span>
        <h2 className="text-xl font-bold sm:text-2xl">Shorten Your URL</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">
          Long URL
          <input
            type="text"
            name="originalUrl"
            value={formData.originalUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/very/long/url"
            required
            className="focus-ring h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-base font-medium text-[var(--text)] placeholder:text-slate-400"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Custom Alias (Optional)
            <input
              type="text"
              name="customAlias"
              value={formData.customAlias}
              onChange={handleInputChange}
              placeholder="my-campaign"
              className="focus-ring h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-base font-medium text-[var(--text)] placeholder:text-slate-400"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Expiration (Optional)
            <select
              name="expiresInDays"
              value={formData.expiresInDays}
              onChange={handleInputChange}
              className="focus-ring h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-base font-medium text-[var(--text)]"
            >
              <option value="">Never Expires</option>
              <option value="1">1 Day</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="180">180 Days</option>
              <option value="365">365 Days</option>
            </select>
          </label>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          disabled={isSubmitting}
          className="focus-ring mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 px-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isSubmitting ? <LoadingSpinner label="Shortening..." /> : <Sparkles size={16} />}
          {isSubmitting ? "" : "Shorten URL"}
        </motion.button>
      </form>
    </motion.section>
  );
};

export default UrlShortenerForm;
