import { useEffect, useId } from "react";
import { useGptReady } from "./GptProvider";

const TEST_AD_UNIT = "/6355419/Travel/Europe/France/Paris";

export default function AdSlot({ sizes, label, className = "" }) {
  const ready = useGptReady();
  const rawId = useId();
  const divId = `ad-slot-${rawId.replace(/[:]/g, "")}`;

  useEffect(() => {
    if (!ready) return;

    window.googletag.cmd.push(() => {
      const slot = window.googletag.defineSlot(TEST_AD_UNIT, sizes, divId);
      if (!slot) return;
      slot.addService(window.googletag.pubads());
      window.googletag.display(divId);
    });

    return () => {
      window.googletag.cmd.push(() => {
        const slot = window.googletag
          .pubads()
          .getSlots()
          .find((s) => s.getSlotElementId() === divId);
        if (slot) {
          window.googletag.destroySlots([slot]);
        }
      });
    };
  }, [ready, divId, sizes]);

  const [w, h] = sizes[0];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="mb-1 text-[10px] uppercase tracking-wide text-gray-400">{label}</span>
      <div id={divId} style={{ minWidth: w, minHeight: h }} />
    </div>
  );
}
