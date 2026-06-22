export const PRICING = {
  mercadoPago: {
    amount: 1999,
    currency: "ARS",
    shortLabel: "$1.999",
    label: "$1.999 ARS",
    previousLabel: "Antes $2.500",
    value: "1999",
  },
  paypal: {
    amount: 2.99,
    currency: "USD",
    shortLabel: "US$2.99",
    label: "US$2.99",
    previousLabel: "Before US$4.99",
    value: "2.99",
  },
  copy: {
    singlePayment: "Pago unico",
    noSubscription: "Sin suscripcion",
    seoLine: "Pago unico de $1.999 ARS, sin suscripcion.",
    faqQuestion: "Cuanto cuesta descargar el CV?",
    faqAnswer:
      "El desbloqueo del PDF final cuesta $1.999 ARS. Es un pago unico, sin suscripcion.",
  },
} as const;
