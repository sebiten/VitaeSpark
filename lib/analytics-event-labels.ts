export const FLYER_QR_SCAN_LABEL = "flyer_qr_scan";
export const CAMPAIGN_LANDING_VIEW_LABEL = "campaign_landing_view";

export function isAttributedVisitLabel(label: string | null | undefined) {
  return (
    label === FLYER_QR_SCAN_LABEL ||
    label === CAMPAIGN_LANDING_VIEW_LABEL
  );
}
