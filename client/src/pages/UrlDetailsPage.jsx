import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, ExternalLink, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteShortUrl, getUrlDetails } from "../services/urlService";
import { formatDateTime } from "../utils/formatDate";

const UrlDetailsPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getUrlDetails(shortCode);
        setDetails(response.data);
      } catch (error) {
        toast.error(error.message);
        setDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [shortCode]);

  const copyShortUrl = async () => {
    if (!details?.shortUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(details.shortUrl);
      toast.success("Short URL copied.");
    } catch {
      toast.error("Unable to copy URL.");
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Delete this short URL?");
    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteShortUrl(shortCode);
      toast.success("Short URL deleted.");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="glass-card rounded-3xl p-6">
        <LoadingSpinner label="Loading URL details..." />
      </section>
    );
  }

  if (!details) {
    return (
      <section className="glass-card rounded-3xl p-6">
        <p className="text-sm muted">URL not found.</p>
        <Link to="/" className="mt-4 inline-flex rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 sm:p-8">
      <Link to="/" className="focus-ring mb-5 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold">
        <ArrowLeft size={16} />
        Back
      </Link>

      <h1 className="text-2xl font-bold sm:text-3xl">URL Details</h1>
      <p className="mt-2 text-sm muted">Track clicks and inspect metadata for this shortened link.</p>

      <div className="mt-6 grid gap-3">
        <div className="panel rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] muted">Short URL</p>
          <a
            href={details.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-base font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            {details.shortUrl}
          </a>
        </div>

        <div className="panel rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] muted">Original URL</p>
          <p className="mt-1 break-all text-sm">{details.originalUrl}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="panel rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] muted">Clicks</p>
            <p className="mt-1 text-xl font-bold">{details.clicks}</p>
          </div>
          <div className="panel rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] muted">Created</p>
            <p className="mt-1 text-sm">{formatDateTime(details.createdAt)}</p>
          </div>
          <div className="panel rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] muted">Expires</p>
            <p className="mt-1 text-sm">{formatDateTime(details.expiresAt)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyShortUrl}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
        >
          <Copy size={16} />
          Copy
        </button>
        <a
          href={details.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-slate-100/70 dark:hover:bg-slate-800"
        >
          <ExternalLink size={16} />
          Open
        </a>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="focus-ring inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </motion.section>
  );
};

export default UrlDetailsPage;
