const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] px-4 py-6 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-sm muted sm:flex-row">
        <p>Developed by <a href="https://github.com/thedarkworldprogrammer" target="_blank"><b>The Dark World</b></a>.</p>
        <p>Shortly {new Date().getFullYear()}.</p>
      </div>
    </footer>
  );
};

export default Footer;
