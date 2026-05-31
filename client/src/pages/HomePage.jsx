import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Zap, ShieldCheck, MousePointerClick } from "lucide-react";
import UrlShortenerForm from "../components/UrlShortenerForm";
import ShortUrlResult from "../components/ShortUrlResult";
import RecentUrls from "../components/RecentUrls";
import LoadingSpinner from "../components/LoadingSpinner";
import { createShortUrl, getRecentUrls } from "../services/urlService";

const HomePage = () => {
  const [recentUrls, setRecentUrls] = useState([]);
  const [isFetchingRecent, setIsFetchingRecent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shortenedResult, setShortenedResult] = useState(null);

  const fetchRecentUrls = async ({ showLoader = true } = {}) => {
    if (showLoader) {
      setIsFetchingRecent(true);
    }

    try {
      const response = await getRecentUrls(8);
      setRecentUrls(response.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsFetchingRecent(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchRecentUrls({ showLoader: false }));
  }, []);

  const handleShorten = async (payload) => {
    setIsSubmitting(true);
    try {
      const response = await createShortUrl(payload);
      setShortenedResult(response.data);
      toast.success(response.message || "Short URL created.");
      await fetchRecentUrls({ showLoader: false });
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-sky-600 via-blue-600 to-teal-500 p-6 text-white sm:p-10"
      >
        <div className="pointer-events-none absolute -left-14 -top-14 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-18 -right-12 h-52 w-52 rounded-full bg-cyan-200/20 blur-2xl" />

        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
          Turn Long Links Into Clean, Shareable URLs in Seconds
        </h1>
        <p className="mt-3 max-w-2xl text-base text-blue-50 sm:text-lg">
          Shortly is a modern URL shortener with click analytics, custom aliases, QR support, and fast redirects.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/25 bg-white/10 p-3 text-sm">
            <Zap className="mb-1.5" size={18} />
            Fast API responses and redirects
          </div>
          <div className="rounded-xl border border-white/25 bg-white/10 p-3 text-sm">
            <ShieldCheck className="mb-1.5" size={18} />
            Secure validation and rate limiting
          </div>
          <div className="rounded-xl border border-white/25 bg-white/10 p-3 text-sm">
            <MousePointerClick className="mb-1.5" size={18} />
            Built-in click tracking and stats
          </div>
        </div>
      </motion.section>

      <UrlShortenerForm onShorten={handleShorten} isSubmitting={isSubmitting} />
      {shortenedResult ? <ShortUrlResult result={shortenedResult} /> : null}

      {isFetchingRecent ? (
        <section className="glass-card rounded-3xl p-6">
          <LoadingSpinner label="Loading recent URLs..." />
        </section>
      ) : (
        <RecentUrls urls={recentUrls} />
      )}
    </div>
  );
};

export default HomePage;
