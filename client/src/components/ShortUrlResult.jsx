import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Copy, ExternalLink, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { formatDateTime } from "../utils/formatDate";

const ShortUrlResult = ({ result }) => {
  const shortCode = useMemo(() => {
    if (!result?.shortCode && result?.shortUrl) {
      return result.shortUrl.split("/").pop();
    }
    return result?.shortCode;
  }, [result]);

  const copyShortUrl = async () => {
    if (!result?.shortUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.shortUrl);
      toast.success("Short URL copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy URL. Please copy it manually.");
      console.error(error);
    }
  };

  if (!result) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-5 sm:p-7"
    >
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle2 className="text-emerald-500" size={20} />
        <h2 className="text-xl font-bold sm:text-2xl">Your Short URL is Ready</h2>
      </div>

      <div className="panel rounded-2xl p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.09em] muted">Short URL</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all text-lg font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            {result.shortUrl}
          </a>
          <button
            type="button"
            onClick={copyShortUrl}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="panel rounded-xl p-3">
          <p className="font-semibold muted">Original URL</p>
          <p className="mt-1 break-all text-xs">{result.originalUrl}</p>
        </div>
        <div className="panel rounded-xl p-3">
          <p className="font-semibold muted">Created</p>
          <p className="mt-1 text-xs">{formatDateTime(result.createdAt)}</p>
        </div>
        <div className="panel rounded-xl p-3">
          <p className="font-semibold muted">Expires</p>
          <p className="mt-1 text-xs">{formatDateTime(result.expiresAt)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={result.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <ExternalLink size={16} />
          Open Link
        </a>
        <Link
          to={`/details/${shortCode}`}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
        >
          <BarChart3 size={16} />
          View Details
        </Link>
      </div>

      {result.qrCode ? (
        <div className="mt-6 inline-flex rounded-2xl border border-[var(--border)] bg-white p-2">
          <img src={result.qrCode} alt="QR code for shortened URL" className="h-28 w-28 rounded-xl" />
        </div>
      ) : null}
    </motion.section>
  );
};

export default ShortUrlResult;
