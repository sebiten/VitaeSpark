// components/CVPreviewStepPurple.tsx
"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import {
  ShieldCheck,
  Loader2,
  CheckCircle,
  ArrowLeft,
  LockKeyhole,
  Maximize2,
  Palette,
  Mail,
  X,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getLandingAttribution } from "@/lib/analytics-attribution";
import {
  recordAnalyticsEvent,
  recordGaFunnelEvent,
} from "@/lib/analytics-events";
import type { AppLanguage } from "@/lib/i18n";
import { PRICING } from "@/lib/pricing";
import { calculateCvScore } from "@/lib/cv-score";
import { ConversionProof } from "@/components/ConversionProof";
import { MarketSelector } from "@/components/MarketSelector";
import { useMarket } from "@/hooks/use-market";
import type { PhotoSyncState } from "@/lib/guest-photo";
import {
  GUEST_CHECKOUT_EMAIL_KEY,
  normalizeCheckoutEmail,
  type CheckoutUser,
} from "@/lib/guest-checkout";

const PDFViewerPane = dynamic(() => import("./pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white text-sm text-slate-500">
      Preparing preview...
    </div>
  ),
});

const checkoutCopy = {
  es: {
    loadingPreview: "Preparando vista previa...",
    title: "Tu CV ya esta generado",
    subtitle:
      "Pagas una vez, descargas el PDF limpio y queda editable desde tu perfil.",
    protectedTitle: "Vista previa protegida",
    protectedText: "La marca de agua se elimina despues del pago.",
    viewCv: "Ver CV",
    unlock: "Desbloquear PDF",
    close: "Cerrar",
    closePreview: "Seguir viendo",
    back: "Volver y editar datos",
    changeTemplate: "Cambiar plantilla",
    finalTitle: "Desbloquea el PDF final",
    finalText:
      "Tu CV queda guardado en tu perfil para editar datos y volver a descargarlo con la plantilla elegida.",
    singlePayment: "Pago unico",
    previousPrice: PRICING.mercadoPago.previousLabel,
    noSubscription: "Sin suscripcion",
    previewBeforePay: "Marca de agua temporal",
    secure: "Mercado Pago procesa el pago de forma segura",
    priceValue: PRICING.mercadoPago.shortLabel,
    priceCurrency: PRICING.mercadoPago.currency,
    processingPayment: "Procesando pago...",
    processing: "Procesando...",
    also: "o tambien",
    includedTitle: "Despues del pago",
    includedItems: [
      "Descarga inmediata del PDF sin marca de agua",
      "CV guardado y editable desde tu perfil",
      "Nuevas descargas con la plantilla elegida",
    ],
    mpButton: "Pagar con Mercado Pago",
    paypalButton: "Pagar con PayPal",
    paypalButtonNote: "Alternativa internacional",
    mpError: "No se pudo iniciar el pago. Intenta nuevamente.",
    paypalError: "No se pudo iniciar el pago con PayPal. Intenta nuevamente.",
    paymentError: "Error al procesar el pago. Intenta nuevamente.",
    signInToPay: `Iniciá sesión para pagar ${PRICING.mercadoPago.label}`,
    signInToPayInternational: `Iniciá sesión para pagar ${PRICING.paypal.label}`,
    signInReturn:
      "Después volvés a este mismo CV para completar el pago, sin generarlo otra vez.",
    paymentMethodsAfterLogin:
      "Mercado Pago y PayPal se habilitan después de iniciar sesión.",
    photoSyncing: "Guardando tu foto de forma segura...",
    photoSyncingDetail:
      "El CV ya está listo. El pago se habilita apenas termina esta carga.",
    photoSyncError: "No pudimos guardar la foto todavía.",
    photoSyncErrorDetail:
      "Reintentá la carga o continuá sin foto. El resto del CV está guardado.",
    retryPhoto: "Reintentar",
    continueWithoutPhoto: "Continuar sin foto",
    emailTitle: "¿Dónde te enviamos tu CV?",
    emailText:
      "Usaremos este email para identificar la compra y enviarte el acceso permanente después del pago.",
    emailLabel: "Email de entrega",
    emailPlaceholder: "tu@email.com",
    emailContinue: "Continuar al pago",
    emailPrivacy: "Sin suscripción ni mensajes promocionales.",
    emailInvalid: "Ingresá un email válido para recibir tu CV.",
    guestAccess:
      "Después del pago podés descargarlo en este navegador y te enviamos un acceso permanente por email.",
  },
  en: {
    loadingPreview: "Preparing preview...",
    title: "Your resume is generated",
    subtitle:
      "Pay once, download the clean PDF, and keep it editable from your profile.",
    protectedTitle: "Protected resume preview",
    protectedText: "The watermark is removed after payment.",
    viewCv: "View resume",
    unlock: "Unlock PDF",
    close: "Close",
    closePreview: "Keep viewing",
    back: "Back and edit details",
    changeTemplate: "Change template",
    finalTitle: "Unlock the final PDF",
    finalText:
      "Your resume stays saved in your profile, ready to edit and download again with the selected template.",
    singlePayment: "One-time payment",
    previousPrice: PRICING.paypal.previousLabel,
    noSubscription: "No subscription",
    previewBeforePay: "Temporary watermark",
    secure: "Secure checkout with trusted payment providers",
    priceValue: PRICING.paypal.shortLabel,
    priceCurrency: PRICING.paypal.currency,
    processingPayment: "Processing payment...",
    processing: "Processing...",
    also: "or pay with",
    includedTitle: "After payment",
    includedItems: [
      "Immediate PDF download without watermark",
      "Resume saved and editable from your profile",
      "New downloads with the selected template",
    ],
    mpButton: "Mercado Pago",
    paypalButton: "Unlock PDF",
    paypalButtonNote: "International payment in USD",
    mpError: "Could not start Mercado Pago checkout. Try again.",
    paypalError: "Could not start PayPal checkout. Try again.",
    paymentError: "Payment error. Try again.",
    signInToPay: `Sign in to pay ${PRICING.mercadoPago.label}`,
    signInToPayInternational: `Sign in to pay ${PRICING.paypal.label}`,
    signInReturn:
      "You will return to this same resume to complete payment without generating it again.",
    paymentMethodsAfterLogin:
      "Mercado Pago and PayPal become available after you sign in.",
    photoSyncing: "Saving your photo securely...",
    photoSyncingDetail:
      "Your resume is ready. Payment becomes available when this upload finishes.",
    photoSyncError: "We could not save the photo yet.",
    photoSyncErrorDetail:
      "Retry the upload or continue without a photo. The rest of your resume is saved.",
    retryPhoto: "Retry",
    continueWithoutPhoto: "Continue without photo",
    emailTitle: "Where should we send your resume?",
    emailText:
      "We use this email to identify the purchase and send your permanent access after payment.",
    emailLabel: "Delivery email",
    emailPlaceholder: "you@email.com",
    emailContinue: "Continue to payment",
    emailPrivacy: "No subscription or promotional emails.",
    emailInvalid: "Enter a valid email to receive your resume.",
    guestAccess:
      "After payment, download it in this browser and receive permanent access by email.",
  },
} as const;

type Props = {
  cvData: RespuestaCV["cv"];
  template: string;
  onBack: () => void;
  onChangeTemplate: () => void;
  currentUser: CheckoutUser | null;
  guestCheckoutEnabled: boolean;
  onPrepareGuestCheckout: (
    contactEmail: string,
  ) => Promise<RespuestaCV["cv"]>;
  onAuthRequired: () => void;
  photoSyncState: PhotoSyncState;
  onRetryPhotoSync: () => void;
  onContinueWithoutPhoto: () => void;
  language: AppLanguage;
  initialCountryCode?: string | null;
};

export default function CVPreviewStepPurple({
  cvData,
  template,
  onBack,
  onChangeTemplate,
  currentUser,
  guestCheckoutEnabled,
  onPrepareGuestCheckout,
  onAuthRequired,
  photoSyncState,
  onRetryPhotoSync,
  onContinueWithoutPhoto,
  language,
  initialCountryCode,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [loadingPayPal, setLoadingPayPal] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [canRenderInlinePreview, setCanRenderInlinePreview] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 640px)").matches,
  );
  const [pendingCvId, setPendingCvId] = useState<string | null>(null);
  const [guestEmailOpen, setGuestEmailOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestEmailError, setGuestEmailError] = useState("");
  const [preparingGuestCheckout, setPreparingGuestCheckout] = useState(false);
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState<
    "mercado_pago" | "paypal" | null
  >(null);
  const { market, setMarket } = useMarket(initialCountryCode);
  const checkoutViewedTracked = useRef(false);
  const copy = checkoutCopy[language];
  const cvScore = useMemo(() => calculateCvScore(cvData), [cvData]);
  const passedChecks = cvScore.items.filter((item) => item.passed).length;

  const handlePayPal = async (
    paymentCv: RespuestaCV["cv"] = cvData,
    contactEmail?: string,
  ) => {
    if (photoSyncState !== "idle") return;

    let failureTracked = false;
    const attribution = getLandingAttribution();

    setLoadingPayPal(true);
    track("Payment Started", {
      template,
      price: PRICING.paypal.amount,
      currency: PRICING.paypal.currency,
      method: "paypal",
      language,
      ...attribution,
    });
    try {
      const res = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: pendingCvId ?? undefined,
          cvData: paymentCv,
          template,
          language,
          contactEmail,
          attribution,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData?.cvId) setPendingCvId(errorData.cvId);
        track("PayPal Order Failed", {
          status: res.status,
          template,
          language,
          ...attribution,
        });
        failureTracked = true;
        console.error("Error creating PayPal order:", errorData);
        toast.error(copy.paypalError);
        return;
      }

      const { cvId, approveUrl } = await res.json();

      if (cvId) setPendingCvId(cvId);

      if (approveUrl) {
        track("Payment Redirected", {
          template,
          price: PRICING.paypal.amount,
          currency: PRICING.paypal.currency,
          method: "paypal",
          language,
          ...attribution,
        });
        recordGaFunnelEvent("payment_started", {
          template,
          language,
          value: PRICING.paypal.amount,
          currency: PRICING.paypal.currency,
          payment_type: "paypal",
          ...attribution,
        });
        window.location.href = approveUrl;
      } else {
        track("PayPal Order Failed", { template, ...attribution });
        failureTracked = true;
        toast.error(copy.paypalError);
      }
    } catch (error) {
      if (!failureTracked) {
        track("PayPal Order Failed", { template, ...attribution });
      }
      console.error("Error en handlePayPal:", error);
      toast.error(copy.paymentError);
    } finally {
      setLoadingPayPal(false);
    }
  };

  const handlePay = async (
    paymentCv: RespuestaCV["cv"] = cvData,
    contactEmail?: string,
  ) => {
    if (photoSyncState !== "idle") return;

    let failureTracked = false;
    const attribution = getLandingAttribution();

    setLoading(true);
    track("Payment Started", {
      template,
      price: PRICING.mercadoPago.amount,
      currency: PRICING.mercadoPago.currency,
      method: "mercado_pago",
      language,
      ...attribution,
    });
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: pendingCvId ?? undefined,
          cvData: paymentCv,
          template,
          language,
          contactEmail,
          attribution,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData?.cvId) setPendingCvId(errorData.cvId);
        track("Payment Preference Failed", {
          status: res.status,
          template,
          language,
          ...attribution,
        });
        failureTracked = true;
        console.error("Error al crear preferencia:", errorData);
        toast.error(copy.mpError);
        return;
      }

      const { cvId, init_point } = await res.json();

      if (cvId) setPendingCvId(cvId);

      if (init_point) {
        track("Payment Redirected", {
          template,
          price: PRICING.mercadoPago.amount,
          currency: PRICING.mercadoPago.currency,
          method: "mercado_pago",
          language,
          ...attribution,
        });
        recordGaFunnelEvent("payment_started", {
          template,
          language,
          value: PRICING.mercadoPago.amount,
          currency: PRICING.mercadoPago.currency,
          payment_type: "mercado_pago",
          ...attribution,
        });
        window.location.href = init_point;
      } else {
        track("Payment Preference Failed", { template, ...attribution });
        failureTracked = true;
        toast.error(copy.mpError);
      }
    } catch (error) {
      if (!failureTracked) {
        track("Payment Preference Failed", {
          template,
          ...getLandingAttribution(),
        });
      }
      console.error("Error en handlePay:", error);
      toast.error(copy.paymentError);
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = useMemo(() => {
    return (
      <PDFViewerPane
        cv={cvData}
        template={template}
        watermark
        className="h-full w-full border-0"
      />
    );
  }, [cvData, template]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const syncPreviewMode = () => setCanRenderInlinePreview(mediaQuery.matches);

    syncPreviewMode();
    mediaQuery.addEventListener("change", syncPreviewMode);

    return () => {
      mediaQuery.removeEventListener("change", syncPreviewMode);
    };
  }, []);

  useEffect(() => {
    const storedEmail = window.sessionStorage.getItem(
      GUEST_CHECKOUT_EMAIL_KEY,
    );
    if (storedEmail) setGuestEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (checkoutViewedTracked.current) return;
    checkoutViewedTracked.current = true;
    const attribution = getLandingAttribution();
    const isGuest = !currentUser || currentUser.isAnonymous;
    track("Checkout Viewed", {
      template,
      language,
      is_guest: isGuest,
      ...attribution,
    });
    recordAnalyticsEvent({
      event_name: "preview_viewed",
      language,
      template,
      is_guest: isGuest,
      ...attribution,
    });
    recordAnalyticsEvent({
      event_name: "checkout_viewed",
      language,
      template,
      is_guest: isGuest,
      ...attribution,
    });
  }, [currentUser, language, template]);

  const scrollToCheckout = () => {
    document
      .getElementById("checkout-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const paymentInProgress = loading || loadingPayPal || preparingGuestCheckout;
  const paymentUnavailable =
    paymentInProgress || photoSyncState !== "idle";
  const isPermanentUser = Boolean(currentUser && !currentUser.isAnonymous);
  const showDirectCheckout = isPermanentUser || guestCheckoutEnabled;
  const paypalIsPrimary = market === "international";
  const primaryPayment = paypalIsPrimary ? PRICING.paypal : PRICING.mercadoPago;
  const primaryPaymentPrice = primaryPayment.label;
  const primaryPreviousPrice =
    paypalIsPrimary && language === "es"
      ? PRICING.paypal.previousLabelEs
      : primaryPayment.previousLabel;
  const primaryPaymentCta = showDirectCheckout
    ? paypalIsPrimary
      ? language === "en"
        ? copy.unlock
        : `Pagar ${PRICING.paypal.label}`
      : `Pagar ${PRICING.mercadoPago.label}`
    : paypalIsPrimary
      ? copy.signInToPayInternational
      : copy.signInToPay;
  const securePaymentCopy = paypalIsPrimary
    ? language === "en"
      ? copy.secure
      : "Pago internacional seguro con PayPal, en USD"
    : copy.secure;

  const openGuestEmail = (method: "mercado_pago" | "paypal") => {
    setPendingPaymentMethod(method);
    setGuestEmailError("");
    setGuestEmailOpen(true);
  };

  const requestPayment = (method: "mercado_pago" | "paypal") => {
    if (photoSyncState !== "idle") return;
    if (!currentUser && guestCheckoutEnabled) {
      openGuestEmail(method);
      return;
    }
    if (currentUser?.isAnonymous) {
      if (!guestCheckoutEnabled) {
        onAuthRequired();
        return;
      }
      const email = normalizeCheckoutEmail(guestEmail);
      if (!email) {
        openGuestEmail(method);
        return;
      }
      void (method === "paypal"
        ? handlePayPal(cvData, email)
        : handlePay(cvData, email));
      return;
    }
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    void (method === "paypal" ? handlePayPal() : handlePay());
  };

  const handleGuestEmailSubmit = async () => {
    const email = normalizeCheckoutEmail(guestEmail);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setGuestEmailError(copy.emailInvalid);
      return;
    }

    const method = pendingPaymentMethod ?? (paypalIsPrimary ? "paypal" : "mercado_pago");
    setGuestEmailError("");
    setPreparingGuestCheckout(true);
    recordAnalyticsEvent({
      event_name: "guest_email_submitted",
      language,
      template,
      is_guest: true,
      ...getLandingAttribution(),
    });

    try {
      const preparedCv = await onPrepareGuestCheckout(email);
      setGuestEmail(email);
      setGuestEmailOpen(false);
      if (method === "paypal") {
        await handlePayPal(preparedCv, email);
      } else {
        await handlePay(preparedCv, email);
      }
    } catch (error) {
      console.error("No se pudo preparar el checkout invitado", error);
      toast.error(
        error instanceof Error ? error.message : copy.paymentError,
      );
    } finally {
      setPreparingGuestCheckout(false);
      setPendingPaymentMethod(null);
    }
  };

  const handlePrimaryPayment = () => {
    requestPayment(paypalIsPrimary ? "paypal" : "mercado_pago");
  };

  const handlePrimaryPaymentFromPreview = () => {
    setMobilePreviewOpen(false);
    handlePrimaryPayment();
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 overflow-x-hidden pb-24 sm:pb-0">
      <div className="mx-auto max-w-[340px] space-y-2 text-left sm:max-w-none sm:text-center">
        <h2 className="text-[1.65rem] font-bold leading-tight text-white sm:text-3xl">
          {copy.title}
        </h2>
        <p className="max-w-[320px] text-sm leading-6 text-slate-400 sm:mx-auto sm:max-w-none sm:text-base">
          {copy.subtitle}
        </p>
      </div>

      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#2A2A2D] shadow-2xl shadow-black/30 sm:bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#15151A] px-4 py-3 text-white sm:hidden">
            <div className="min-w-0">
              <p className="text-sm font-semibold">{copy.protectedTitle}</p>
              <p className="mt-0.5 text-xs text-white/65">
                {copy.protectedText}
              </p>
            </div>
            <LockKeyhole className="h-5 w-5 flex-shrink-0 text-[#38BDF8]" />
          </div>
          <div
            className="pointer-events-none relative mx-auto h-[360px] w-full max-w-full overflow-hidden sm:pointer-events-auto sm:aspect-[1/1.414] sm:h-auto sm:min-h-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {canRenderInlinePreview ? (
              renderTemplate
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#15151A] px-6 text-center text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#C4B5FD]">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{copy.protectedTitle}</p>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    {language === "en"
                      ? "Tap View resume to load the full preview."
                      : "Toca Ver CV para cargar la vista completa."}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent px-4 pb-4 pt-12 text-center sm:block">
            <p className="hidden text-sm font-medium text-white sm:block">
              {language === "en"
                ? "Swipe to preview the resume"
                : "Desliza con el dedo para ver todo el CV"}
            </p>
            <p className="hidden text-xs text-white/80 sm:mt-1 sm:block">
              {copy.protectedText}
            </p>
          </div>
        </div>

        <div className="-mt-3 grid grid-cols-[0.9fr_1.1fr] gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setMobilePreviewOpen(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#111113] px-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition hover:bg-[#1C1C22]"
          >
            <Maximize2 className="h-4 w-4" />
            {copy.viewCv}
          </button>
          <button
            type="button"
            onClick={scrollToCheckout}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#7C3AED] px-3 text-sm font-bold text-white shadow-lg shadow-[#7C3AED]/25 transition hover:bg-[#6D28D9]"
          >
            {copy.unlock}
          </button>
        </div>

        <Dialog open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
          <DialogContent className="fixed inset-0 left-0 top-0 z-50 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-[#0F0F10] p-0 text-white shadow-none sm:hidden [&>button]:hidden">
            <DialogTitle className="sr-only">{copy.protectedTitle}</DialogTitle>
            <DialogDescription className="sr-only">
              {language === "en"
                ? "Partial watermarked resume preview before unlocking."
                : "Muestra parcial del curriculum con marca de agua antes del desbloqueo."}
            </DialogDescription>

            <div className="sticky top-0 z-20 border-b border-white/10 bg-[#111113]/95 px-4 py-3 backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{copy.protectedTitle}</p>
                  <p className="mt-0.5 text-xs text-white/65">
                    {copy.protectedText}
                  </p>
                </div>
                <DialogClose asChild>
                  <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#7C3AED] px-4 text-sm font-semibold text-white">
                    <X className="h-4 w-4" />
                    {copy.close}
                  </button>
                </DialogClose>
              </div>
            </div>

            <div className="h-[calc(100dvh-96px)] touch-pan-x touch-pan-y overflow-auto bg-[#2A2A2D] px-3 py-4">
              <div className="mx-auto h-[82vh] min-h-[620px] w-[94vw] overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40">
                {renderTemplate}
              </div>
            </div>

            <div className="sticky bottom-0 z-20 border-t border-white/10 bg-[#111113]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <button
                  type="button"
                  onClick={handlePrimaryPaymentFromPreview}
                  disabled={paymentUnavailable}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${
                    paypalIsPrimary
                      ? "bg-[#0070BA] hover:bg-[#005EA6]"
                      : "bg-[#009EE3] hover:bg-[#008FCC]"
                  }`}
                >
                  {paymentInProgress || photoSyncState === "uploading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LockKeyhole className="h-4 w-4" />
                  )}
                  {photoSyncState === "uploading"
                    ? copy.photoSyncing
                    : primaryPaymentCta}
                </button>
                <DialogClose asChild>
                  <button className="flex h-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm font-semibold text-white/80">
                    {copy.closePreview}
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card
          id="checkout-panel"
          className="scroll-mt-24 min-w-0 border-white/10 bg-[#15151A] text-white shadow-2xl shadow-black/30"
        >
          <CardContent className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/68 transition hover:border-white/18 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {copy.back}
              </button>

              <button
                type="button"
                onClick={onChangeTemplate}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-[#C4B5FD] transition hover:border-[#A78BFA]/40 hover:text-white"
              >
                <Palette className="h-4 w-4" />
                {copy.changeTemplate}
              </button>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#111115] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/16 text-[#C4B5FD] ring-1 ring-[#7C3AED]/25">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A78BFA]">
                    {copy.previewBeforePay}
                  </p>
                  <h3 className="mt-1 text-xl font-bold leading-tight text-white sm:text-2xl">
                    {copy.finalTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {isPermanentUser ? copy.finalText : copy.guestAccess}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#38BDF8] sm:text-xs">
                    {copy.singlePayment}
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/48">
                    <span className="line-through">{primaryPreviousPrice}</span>
                    <span className="mx-2 text-white/25">|</span>
                    <span>{copy.noSubscription}</span>
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-end gap-2">
                  <span className="text-4xl font-black leading-none text-white sm:text-5xl">
                    {primaryPayment.shortLabel}
                  </span>
                  <span className="pb-1 text-sm font-semibold text-white/62">
                    {primaryPayment.currency}
                  </span>
                </div>
              </div>
            </div>

            <MarketSelector market={market} onChange={setMarket} />

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Chequeo de claridad
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-white">
                    Lo que ya está resuelto en tu CV
                  </h4>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-white/72">
                  {passedChecks}/{cvScore.items.length} claros
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {cvScore.items.map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <CheckCircle
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                        item.passed ? "text-emerald-300" : "text-white/28"
                      }`}
                    />
                    <div>
                      <p className="text-xs font-semibold text-white/82">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-white/52">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {photoSyncState === "uploading" ? (
              <div
                role="status"
                className="flex items-start gap-3 rounded-2xl border border-[#67D2FF]/18 bg-[#67D2FF]/[0.07] p-4"
              >
                <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-[#67D2FF]" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {copy.photoSyncing}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/58">
                    {copy.photoSyncingDetail}
                  </p>
                </div>
              </div>
            ) : null}

            {photoSyncState === "error" ? (
              <div
                role="alert"
                className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-4"
              >
                <p className="text-sm font-semibold text-amber-100">
                  {copy.photoSyncError}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/58">
                  {copy.photoSyncErrorDetail}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onRetryPhotoSync}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[#F6F2EA] px-4 text-xs font-semibold text-[#121114]"
                  >
                    {copy.retryPhoto}
                  </button>
                  <button
                    type="button"
                    onClick={onContinueWithoutPhoto}
                    className="inline-flex h-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold text-white/72"
                  >
                    {copy.continueWithoutPhoto}
                  </button>
                </div>
              </div>
            ) : null}

            {showDirectCheckout ? (
              <div className="flex flex-col gap-2.5">
              <Button
                disabled={paymentUnavailable}
                onClick={() => requestPayment("mercado_pago")}
                className={`group w-full overflow-hidden rounded-xl border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
                  paypalIsPrimary
                    ? "order-3 h-12 border-[#008FCC] bg-[#009EE3] text-white shadow-none hover:border-[#007EB5] hover:bg-[#008FCC] hover:shadow-none sm:h-14"
                    : "order-1 h-14 border-[#008FCC] bg-[#009EE3] text-white shadow-none hover:border-[#007EB5] hover:bg-[#008FCC] hover:shadow-none sm:h-14"
                }`}
              >
                {loading ? (
                  <div
                    className="flex items-center justify-center gap-2 text-white"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{copy.processingPayment}</span>
                  </div>
                ) : (
                  <div className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 px-1">
                    <span className="flex h-9 w-10 shrink-0 items-center justify-center">
                      <Image
                        src="/logompsolomano.png"
                        alt="Mercado Pago"
                        width={36}
                        height={36}
                        className="h-8 w-8 object-contain"
                      />
                    </span>
                    <span className="min-w-0 text-center text-[15px] font-semibold tracking-[-0.01em] sm:text-base">
                      {copy.mpButton}
                    </span>
                    <span className="shrink-0 rounded-md bg-white/14 px-2 py-1 text-xs font-semibold text-white sm:text-sm">
                      {PRICING.mercadoPago.label}
                    </span>
                  </div>
                )}
              </Button>

              <div className="order-2 flex items-center justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-8 bg-white/14" />
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    {copy.also}
                  </span>
                  <div className="h-px w-8 bg-white/14" />
                </div>
              </div>

              <Button
                disabled={paymentUnavailable}
                onClick={() => requestPayment("paypal")}
                className={`w-full rounded-2xl border text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
                  paypalIsPrimary
                    ? "order-1 h-14 border-[#0070BA]/25 bg-[#0070BA] shadow-lg shadow-[#0070BA]/15 hover:bg-[#005EA6] sm:h-16"
                    : "order-3 h-12 border-white/10 bg-white/[0.045] shadow-none hover:bg-white/[0.07] sm:h-14"
                }`}
              >
                {loadingPayPal ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{copy.processing}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Image
                      src="/paypal.png"
                      alt="PayPal"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                    <span className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                      <span className="text-base font-bold sm:text-lg">
                        {copy.paypalButton}
                      </span>
                      <span className="hidden text-[11px] font-medium text-white/60 sm:block">
                        {paypalIsPrimary && language === "es"
                          ? "Pago internacional en USD"
                          : copy.paypalButtonNote}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-sm font-semibold sm:text-base">
                      {PRICING.paypal.label}
                    </span>
                  </div>
                )}
              </Button>
              {!isPermanentUser ? (
                <p className="order-4 text-center text-[11px] leading-5 text-white/48">
                  {copy.emailPrivacy}{" "}
                  <button
                    type="button"
                    onClick={onAuthRequired}
                    className="font-semibold text-[#C4B5FD] underline-offset-4 hover:underline"
                  >
                    {language === "en" ? "I already have an account" : "Ya tengo cuenta"}
                  </button>
                </p>
              ) : null}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#D7C8FF]/18 bg-[#D7C8FF]/[0.055] p-3.5">
                <Button
                  onClick={onAuthRequired}
                  className="h-14 w-full rounded-xl border border-[#F6F2EA]/15 bg-[#F6F2EA] px-4 text-sm font-bold text-[#121114] shadow-none transition hover:bg-white sm:text-base"
                >
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  {paypalIsPrimary
                    ? copy.signInToPayInternational
                    : copy.signInToPay}
                </Button>
                <p className="mt-3 text-center text-xs leading-5 text-white/64 sm:text-sm">
                  {copy.signInReturn}
                </p>
                <p className="mt-1.5 text-center text-[11px] leading-5 text-white/42">
                  {copy.paymentMethodsAfterLogin}
                </p>
              </div>
            )}

            <div className="flex items-start gap-2 rounded-2xl border border-emerald-500/18 bg-emerald-500/[0.08] px-4 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
              <span className="text-sm font-semibold leading-5 text-emerald-300">
                {securePaymentCopy}
              </span>
            </div>

            <ConversionProof variant="checkout" />

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3.5">
              <p className="mb-3 text-sm font-semibold text-white">
                {copy.includedTitle}
              </p>
              <div className="grid gap-2">
                {copy.includedItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A78BFA]" />
                    <span className="text-xs leading-5 text-white/72 sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={guestEmailOpen}
        onOpenChange={(open) => {
          if (!preparingGuestCheckout) setGuestEmailOpen(open);
        }}
      >
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-[1.75rem] border-white/10 bg-[#15151A] p-0 text-white shadow-2xl shadow-black/50 [&>button]:text-white/55">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleGuestEmailSubmit();
            }}
          >
            <div className="border-b border-white/8 px-5 py-5 sm:px-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#67D2FF]/20 bg-[#67D2FF]/10 text-[#67D2FF]">
                <Mail className="h-5 w-5" />
              </div>
              <DialogTitle className="mt-4 text-xl font-bold tracking-[-0.02em]">
                {copy.emailTitle}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-6 text-white/58">
                {copy.emailText}
              </DialogDescription>
            </div>

            <div className="space-y-4 px-5 py-5 sm:px-6">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  {copy.emailLabel}
                </span>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  value={guestEmail}
                  onChange={(event) => {
                    setGuestEmail(event.target.value);
                    if (guestEmailError) setGuestEmailError("");
                  }}
                  placeholder={copy.emailPlaceholder}
                  aria-invalid={Boolean(guestEmailError)}
                  className="mt-2 h-12 w-full rounded-xl border border-white/12 bg-[#0F0F12] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#67D2FF]/55 focus:ring-2 focus:ring-[#67D2FF]/12"
                />
              </label>
              {guestEmailError ? (
                <p className="text-xs font-medium text-rose-300">
                  {guestEmailError}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={preparingGuestCheckout}
                className="h-13 w-full rounded-xl bg-[#F6F2EA] text-sm font-bold text-[#121114] shadow-none hover:bg-white disabled:cursor-wait"
              >
                {preparingGuestCheckout ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LockKeyhole className="mr-2 h-4 w-4" />
                )}
                {preparingGuestCheckout
                  ? copy.processing
                  : copy.emailContinue}
              </Button>
              <p className="text-center text-[11px] leading-5 text-white/42">
                {copy.emailPrivacy}
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#101013]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl shadow-black/40 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-none text-white">
              {primaryPaymentPrice}
            </p>
            <p className="mt-1 truncate text-[11px] font-medium text-white/55">
              {copy.noSubscription}
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrimaryPayment}
            disabled={paymentUnavailable}
            className={`inline-flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${
              paypalIsPrimary
                ? "bg-[#0070BA] hover:bg-[#005EA6]"
                : "bg-[#009EE3] hover:bg-[#008FCC]"
            }`}
          >
            {paymentInProgress || photoSyncState === "uploading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LockKeyhole className="h-4 w-4" />
            )}
            {photoSyncState === "uploading"
              ? copy.photoSyncing
              : primaryPaymentCta}
          </button>
        </div>
      </div>
    </div>
  );
}
