"use client";

import { Globe2, MapPin } from "lucide-react";
import type { MarketMode } from "@/lib/market";

export function MarketSelector({
  market,
  onChange,
  compact = false,
}: {
  market: MarketMode;
  onChange: (market: MarketMode) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 border-white/10 sm:flex-row sm:items-center sm:justify-between ${
        compact
          ? "border-t pt-3"
          : "rounded-2xl border bg-white/[0.025] p-3"
      }`}
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
          Región de pago
        </p>
        {!compact ? (
          <p className="mt-1 text-xs leading-5 text-white/54">
            Ajustamos moneda y medio de pago según tu ubicación.
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/8 bg-black/20 p-1">
        <MarketOption
          active={market === "argentina"}
          onClick={() => onChange("argentina")}
          icon={MapPin}
          label="Argentina"
        />
        <MarketOption
          active={market === "international"}
          onClick={() => onChange("international")}
          icon={Globe2}
          label="Otro país"
        />
      </div>
    </div>
  );
}

function MarketOption({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-[#F6F2EA] text-[#111113]"
          : "text-white/56 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
