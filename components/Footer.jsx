export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-border bg-surface-elevated py-4 px-4 mt-auto">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
        {/* CC Enterprises logo mark */}
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gold text-white text-xs font-bold font-serif flex-shrink-0">
          CC
        </div>
        <p className="text-xs text-ink-muted">
          Powered by{' '}
          <span className="font-semibold text-ink-secondary">CC Enterprises Software</span>
        </p>
      </div>
    </footer>
  );
}
