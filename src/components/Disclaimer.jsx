import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-bold text-yellow-900">⚠️ Demo Application</p>
        <p className="text-xs text-yellow-800 mt-1">
          This is a student demo app and <span className="font-bold">NOT a real Coinbase application</span>. Do not use real personal information or funds. For educational purposes only.
        </p>
      </div>
    </div>
  );
}
