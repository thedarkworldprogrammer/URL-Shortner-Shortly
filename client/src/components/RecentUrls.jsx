import { Link } from "react-router-dom";
import { Copy, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { formatDateTime, truncateText } from "../utils/formatDate";

const RecentUrls = ({ urls = [] }) => {
  const copyUrl = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied.");
    } catch {
      toast.error("Copy failed.");
    }
  };

  return (
    <motion.section
      id="recent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="glass-card rounded-3xl p-5 sm:p-7"
    >
      <h2 className="text-xl font-bold sm:text-2xl">Recent Shortened URLs</h2>
      <p className="mt-1 text-sm muted">Quickly copy, open, or view link details.</p>

      <div className="mt-4 grid gap-3">
        {urls.length === 0 ? (
          <div className="panel rounded-xl p-4 text-sm muted">No URLs yet. Create your first short URL above.</div>
        ) : (
          urls.map((urlItem) => (
            <div
              key={urlItem.id || urlItem.shortCode}
              className="panel rounded-xl p-4 transition hover:translate-y-[-1px] hover:shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <a
                    href={urlItem.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {urlItem.shortUrl}
                  </a>
                  <p className="mt-1 text-xs muted">{truncateText(urlItem.originalUrl, 90)}</p>
                  <p className="mt-1 text-xs muted">
                    Clicks: <span className="font-semibold text-[var(--text)]">{urlItem.clicks}</span> | Created:{" "}
                    {formatDateTime(urlItem.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(urlItem.shortUrl)}
                    className="focus-ring inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                  <Link
                    to={`/details/${urlItem.shortCode}`}
                    className="focus-ring inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
                  >
                    <BarChart3 size={14} />
                    Stats
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
};

export default RecentUrls;
