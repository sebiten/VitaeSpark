type CheckoutInsightInput = {
  generated: number;
  paymentStarts: number;
  paymentStartToCompleted: number;
  generatedToPreview: number;
  previewToPaymentStart: number;
};

export function getCheckoutInsight(input: CheckoutInsightInput): {
  value: string;
  text: string;
  tone: "neutral" | "warn";
} {
  if (input.paymentStarts > 0 && input.paymentStartToCompleted === 0) {
    return {
      value: "Pagos sin aprobación",
      text: `${input.paymentStarts} sesiones iniciaron el pago y ninguna tiene aprobación atribuida. Revisa abandonos, rechazos y notificaciones del proveedor. Esto no demuestra por sí solo un fallo del checkout.`,
      tone: "warn",
    };
  }
  // An operational floor for triage, not a statistical significance threshold.
  if (input.generated < 30 || input.paymentStarts < 10) {
    return {
      value: "Muestra insuficiente",
      text: "Todavía no hay datos suficientes para declarar sano el funnel ni atribuir una causa al abandono. Verifica el recorrido y reúne más sesiones.",
      tone: "neutral",
    };
  }
  if (input.generatedToPreview < 30) {
    return {
      value: "CV a vista previa",
      text: "Revisa si la vista previa carga después de generar el CV.",
      tone: "warn",
    };
  }
  if (input.previewToPaymentStart < 15) {
    return {
      value: "Vista previa a pago",
      text: "Revisa visibilidad del precio, calidad del resultado y acceso a los medios de pago.",
      tone: "warn",
    };
  }
  return {
    value: "Revisar cierre del pago",
    text: `${input.paymentStartToCompleted.toFixed(1)}% de las sesiones que iniciaron el pago tienen aprobación atribuida. Compara por país y proveedor antes de escalar tráfico.`,
    tone: "neutral",
  };
}
