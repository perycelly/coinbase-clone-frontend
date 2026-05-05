export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
            <p className="text-xs font-bold text-yellow-900 mb-2">⚠️ DISCLAIMER</p>
            <p className="text-xs text-yellow-800">
              This is a student demo application and is <span className="font-bold">NOT affiliated with or endorsed by Coinbase</span>. This is for educational purposes only. Do not use real personal information, credentials, or funds.
            </p>
          </div>

          {/* Footer Content */}
          <div className="text-center text-text-dim text-xs font-semibold">
            <p>© 2026 Demo App. For learning purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
