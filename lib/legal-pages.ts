type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalContent = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const legalUpdatedAt = "23 de julio de 2026";
export const legalUpdatedAtEn = "July 23, 2026";

export const termsContent: LegalContent = {
  title: "Terminos de servicio",
  intro:
    "Estos terminos regulan el uso de VitaeSpark, una herramienta online para crear, mejorar y descargar curriculums vitae profesionales.",
  sections: [
    {
      title: "Informacion del titular",
      paragraphs: [
        "El sitio web VitaeSpark es administrado por Sergio Sebastian Burgos, persona fisica residente en Argentina, identificado con CUIL 20-41422966-3.",
      ],
    },
    {
      title: "Uso del servicio",
      paragraphs: [
        "VitaeSpark permite cargar informacion personal, laboral y academica para generar un curriculum vitae en formato digital. El usuario es responsable de que los datos ingresados sean correctos, reales y tenga derecho a utilizarlos.",
        "El servicio puede incluir funciones gratuitas de vista previa y funciones pagas para desbloquear la version final del CV sin marca de agua o acceder a descargas adicionales.",
      ],
    },
    {
      title: "Cuenta y seguridad",
      paragraphs: [
        "Para guardar y descargar CVs puede ser necesario iniciar sesion. El usuario es responsable de mantener el acceso a su cuenta y de no compartir credenciales con terceros.",
        "Podemos suspender o limitar el acceso si detectamos uso abusivo, intentos de fraude, actividad automatizada o incumplimiento de estos terminos.",
      ],
    },
    {
      title: "Pagos",
      paragraphs: [
        "Los pagos se procesan mediante Mercado Pago o PayPal, segun el medio elegido por el usuario.",
        "El precio de desbloqueo del CV se muestra antes de confirmar la compra. VitaeSpark no almacena datos completos de tarjetas.",
      ],
    },
    {
      title: "Contenido generado",
      paragraphs: [
        "El CV generado depende de la informacion proporcionada por el usuario y de las herramientas de redaccion disponibles. VitaeSpark no garantiza contrataciones, entrevistas ni resultados laborales concretos.",
        "El usuario puede revisar, editar y adaptar el contenido antes de usarlo en postulaciones laborales.",
      ],
    },
    {
      title: "Propiedad intelectual",
      paragraphs: [
        "VitaeSpark, su marca, interfaz, textos base, plantillas y componentes visuales pertenecen a sus titulares. El usuario conserva los derechos sobre la informacion personal que ingresa.",
        "No esta permitido copiar, revender, automatizar o explotar comercialmente la plataforma sin autorizacion expresa.",
      ],
    },
    {
      title: "Contacto",
      paragraphs: [
        "Para consultas sobre el servicio, pagos o acceso a la cuenta, puedes escribir a soporte@vitaespark.com.",
      ],
    },
  ],
};

export const privacyContent: LegalContent = {
  title: "Politica de privacidad",
  intro:
    "Esta politica explica que informacion puede tratar VitaeSpark y como se utiliza para prestar el servicio de generacion y descarga de curriculums.",
  sections: [
    {
      title: "Informacion del titular",
      paragraphs: [
        "El sitio web VitaeSpark es administrado por Sergio Sebastian Burgos, persona fisica residente en Argentina, identificado con CUIL 20-41422966-3.",
      ],
    },
    {
      title: "Informacion que proporcionas",
      paragraphs: [
        "Podemos tratar datos que ingresas en el formulario de CV, como nombre, datos de contacto, experiencia, estudios, habilidades, idiomas, enlaces profesionales y fotografia si decides subirla.",
        "Tambien podemos tratar informacion de cuenta, como correo electronico, identificadores de usuario y datos necesarios para iniciar sesion.",
      ],
    },
    {
      title: "Uso de la informacion",
      paragraphs: [
        "Usamos la informacion para generar, guardar, mostrar y permitir la descarga de tu CV, mejorar la experiencia de usuario, brindar soporte y mantener la seguridad de la plataforma.",
        "La informacion tambien puede usarse de forma agregada o estadistica para entender el uso del producto y mejorar rendimiento, contenido y funcionalidades.",
      ],
    },
    {
      title: "Pagos y proveedores externos",
      paragraphs: [
        "Los pagos se procesan mediante Mercado Pago y PayPal. Esos proveedores pueden tratar datos necesarios para completar la transaccion, emitir comprobantes y prevenir fraude.",
        "VitaeSpark no almacena numeros completos de tarjeta ni codigos de seguridad.",
      ],
    },
    {
      title: "Servicios tecnicos",
      paragraphs: [
        "Podemos utilizar servicios de infraestructura, autenticacion, analitica, seguridad, almacenamiento y generacion de contenido para operar la plataforma.",
        "Estos proveedores solo reciben la informacion necesaria para cumplir su funcion dentro del servicio.",
        "Si eliges personalizar una herramienta gratuita con inteligencia artificial, el puesto, nivel de experiencia, contexto opcional y habilidades base se envian temporalmente a OpenAI para generar el resultado. El contexto libre no se guarda en nuestra base de datos ni en los eventos de analitica.",
      ],
    },
    {
      title: "Conservacion y eliminacion",
      paragraphs: [
        "Conservamos la informacion mientras sea necesaria para prestar el servicio, cumplir obligaciones legales, resolver disputas, prevenir fraude o mantener registros operativos.",
        "Puedes solicitar soporte sobre acceso, correccion o eliminacion de datos escribiendo a soporte@vitaespark.com.",
      ],
    },
    {
      title: "Contacto",
      paragraphs: [
        "Para consultas de privacidad, puedes contactarnos en soporte@vitaespark.com.",
      ],
    },
  ],
};

export const refundContent: LegalContent = {
  title: "Politica de reembolsos",
  intro:
    "Esta politica describe cuando puede solicitarse un reembolso por compras digitales realizadas en VitaeSpark.",
  sections: [
    {
      title: "Informacion del titular",
      paragraphs: [
        "El sitio web VitaeSpark es administrado por Sergio Sebastian Burgos, persona fisica residente en Argentina, identificado con CUIL 20-41422966-3.",
      ],
    },
    {
      title: "Producto digital",
      paragraphs: [
        "VitaeSpark ofrece un producto digital: generacion, desbloqueo y descarga de un curriculum vitae profesional. Por su naturaleza digital, una vez que el CV final fue desbloqueado o descargado, el reembolso puede no estar disponible salvo casos excepcionales.",
      ],
    },
    {
      title: "Casos en los que podemos revisar un reembolso",
      paragraphs: [
        "Podemos revisar solicitudes cuando exista un pago duplicado, error tecnico que impida acceder al CV pagado, cobro incorrecto o imposibilidad comprobable de utilizar el producto despues del pago.",
        "Para evaluar el caso puede ser necesario que nos envies el correo de tu cuenta, fecha de pago, proveedor utilizado y comprobante o identificador de transaccion.",
      ],
    },
    {
      title: "Casos no cubiertos",
      paragraphs: [
        "No se garantiza reembolso por cambios de opinion despues de desbloquear el CV, errores en la informacion cargada por el usuario, expectativas de conseguir empleo o entrevistas, o uso parcial del servicio.",
        "El usuario puede revisar la vista previa y editar sus datos antes de pagar.",
      ],
    },
    {
      title: "Plazo para solicitar revision",
      paragraphs: [
        "Las solicitudes de reembolso deben enviarse dentro de los 7 dias posteriores a la compra. Revisaremos cada caso de buena fe y responderemos al correo indicado por el usuario.",
      ],
    },
    {
      title: "Como solicitarlo",
      paragraphs: [
        "Escribi a soporte@vitaespark.com con el asunto 'Solicitud de reembolso' e inclui el correo de tu cuenta, fecha de compra, proveedor de pago y una descripcion clara del problema.",
      ],
    },
  ],
};

export const termsContentEn: LegalContent = {
  title: "Terms of service",
  intro:
    "These terms govern the use of VitaeSpark, an online tool to create, improve and download professional resumes.",
  sections: [
    {
      title: "Owner information",
      paragraphs: [
        "The VitaeSpark website is operated by Sergio Sebastian Burgos, an individual resident in Argentina, identified with CUIL 20-41422966-3.",
      ],
    },
    {
      title: "Use of the service",
      paragraphs: [
        "VitaeSpark allows users to upload personal, work and academic information to generate a digital resume. The user is responsible for making sure the submitted information is accurate, lawful and theirs to use.",
        "The service may include free preview features and paid features to unlock the final resume without watermark or access additional downloads.",
      ],
    },
    {
      title: "Account and security",
      paragraphs: [
        "Signing in may be required to save and download resumes. Users are responsible for protecting access to their account and not sharing credentials with third parties.",
        "We may suspend or restrict access if we detect abusive use, fraud attempts, automated activity or violations of these terms.",
      ],
    },
    {
      title: "Payments",
      paragraphs: [
        "Payments are processed through Mercado Pago or PayPal, depending on the payment method chosen by the user.",
        "The resume unlock price is shown before confirming the purchase. VitaeSpark does not store full card details.",
      ],
    },
    {
      title: "Generated content",
      paragraphs: [
        "The generated resume depends on the information provided by the user and the writing tools available. VitaeSpark does not guarantee job offers, interviews or employment outcomes.",
        "Users can review, edit and adapt the content before using it in job applications.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "VitaeSpark, its brand, interface, base copy, templates and visual components belong to their respective owners. The user keeps the rights to the personal information they provide.",
        "Copying, reselling, automating or commercially exploiting the platform without express authorization is not allowed.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "For questions about the service, payments or account access, contact soporte@vitaespark.com.",
      ],
    },
  ],
};

export const privacyContentEn: LegalContent = {
  title: "Privacy policy",
  intro:
    "This policy explains what information VitaeSpark may process and how it is used to provide resume generation and download features.",
  sections: [
    {
      title: "Owner information",
      paragraphs: [
        "The VitaeSpark website is operated by Sergio Sebastian Burgos, an individual resident in Argentina, identified with CUIL 20-41422966-3.",
      ],
    },
    {
      title: "Information you provide",
      paragraphs: [
        "We may process the information you enter in the resume form, including name, contact details, work experience, education, skills, languages, professional links and a photo if you choose to upload one.",
        "We may also process account information such as email address, user identifiers and the data required to sign in.",
      ],
    },
    {
      title: "How we use information",
      paragraphs: [
        "We use information to generate, store, display and enable download of your resume, improve the user experience, provide support and keep the platform secure.",
        "Information may also be used in aggregated or statistical form to understand product usage and improve performance, content and features.",
      ],
    },
    {
      title: "Payments and external providers",
      paragraphs: [
        "Payments are processed through Mercado Pago and PayPal. These providers may process the data required to complete the transaction, issue receipts and prevent fraud.",
        "VitaeSpark does not store full card numbers or security codes.",
      ],
    },
    {
      title: "Technical services",
      paragraphs: [
        "We may use infrastructure, authentication, analytics, security, storage and content-generation services to operate the platform.",
        "These providers only receive the information needed to perform their role within the service.",
        "If you choose to personalize a free tool with artificial intelligence, the role, experience level, optional context and base skills are sent temporarily to OpenAI to generate the result. The free-text context is not stored in our database or analytics events.",
      ],
    },
    {
      title: "Retention and deletion",
      paragraphs: [
        "We keep information for as long as necessary to provide the service, comply with legal obligations, resolve disputes, prevent fraud or maintain operational records.",
        "You may request support regarding data access, correction or deletion by writing to soporte@vitaespark.com.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "For privacy questions, contact soporte@vitaespark.com.",
      ],
    },
  ],
};

export const refundContentEn: LegalContent = {
  title: "Refund policy",
  intro:
    "This policy describes when a refund may be requested for digital purchases made on VitaeSpark.",
  sections: [
    {
      title: "Owner information",
      paragraphs: [
        "The VitaeSpark website is operated by Sergio Sebastian Burgos, an individual resident in Argentina, identified with CUIL 20-41422966-3.",
      ],
    },
    {
      title: "Digital product",
      paragraphs: [
        "VitaeSpark offers a digital product: resume generation, unlock and download. Because it is a digital good, once the final resume has been unlocked or downloaded, a refund may not be available except in exceptional cases.",
      ],
    },
    {
      title: "Cases we may review",
      paragraphs: [
        "We may review requests in cases of duplicate payment, technical errors that prevent access to a paid resume, incorrect charges or a verified inability to use the product after payment.",
        "To review the case, we may ask for the account email, payment date, provider used and a receipt or transaction identifier.",
      ],
    },
    {
      title: "Cases not covered",
      paragraphs: [
        "Refunds are not guaranteed for change of mind after unlocking the resume, errors in information entered by the user, expectations of getting a job or interview, or partial use of the service.",
        "The user can review the preview and edit their information before paying.",
      ],
    },
    {
      title: "Request window",
      paragraphs: [
        "Refund requests must be sent within 7 days of the purchase. We review each case in good faith and respond to the email provided by the user.",
      ],
    },
    {
      title: "How to request one",
      paragraphs: [
        "Write to soporte@vitaespark.com with the subject 'Refund request' and include your account email, purchase date, payment provider and a clear description of the issue.",
      ],
    },
  ],
};
