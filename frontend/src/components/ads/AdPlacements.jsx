import AdSlot from "./AdSlot";

export function TopBannerAd() {
  return <AdSlot sizes={[[728, 90], [320, 50]]} label="Advertisement" className="my-4" />;
}

export function BottomBannerAd() {
  return <AdSlot sizes={[[728, 90], [320, 50]]} label="Advertisement" className="my-6" />;
}

export function SidebarAd() {
  return <AdSlot sizes={[[300, 250]]} label="Advertisement" className="sticky top-20" />;
}

export function InContentAd() {
  return (
    <AdSlot sizes={[[300, 250], [336, 280]]} label="Advertisement" className="col-span-full my-6" />
  );
}

export function StickyFooterAd() {
  return (
    <div className="sticky-footer-ad border-t border-gray-200 bg-white/95 py-1 backdrop-blur">
      <AdSlot sizes={[[320, 50]]} label="Advertisement" />
    </div>
  );
}
