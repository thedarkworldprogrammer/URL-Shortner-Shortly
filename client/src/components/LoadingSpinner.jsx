const LoadingSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium muted">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500 dark:border-slate-600 dark:border-t-blue-400" />
      <span>{label}</span>
    </div>
  );
};

export default LoadingSpinner;
