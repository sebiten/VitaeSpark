const roles = [
  {
    role: "cajero",
    path: "https://vitaespark.com/cv-para-cajero",
    pain: "queres postularte a supermercados, farmacias o comercios",
  },
  {
    role: "atencion al cliente",
    path: "https://vitaespark.com/cv-para-atencion-al-cliente",
    pain: "mandas CV para atencion al cliente y no te llaman",
  },
  {
    role: "call center",
    path: "https://vitaespark.com/cv-call-center",
    pain: "buscas trabajo en soporte, ventas telefonicas o contact center",
  },
  {
    role: "vendedor",
    path: "https://vitaespark.com/cv-para-vendedor",
    pain: "queres mostrar mejor tus ventas, objetivos y trato con clientes",
  },
  {
    role: "recepcionista",
    path: "https://vitaespark.com/cv-para-recepcionista",
    pain: "buscas un puesto de recepcion, agenda o atencion presencial",
  },
  {
    role: "administrativo",
    path: "https://vitaespark.com/cv-para-administrativo",
    pain: "queres ordenar mejor tareas de oficina, datos y documentacion",
  },
  {
    role: "repositor",
    path: "https://vitaespark.com/cv-para-repositor",
    pain: "buscas trabajo en supermercado, deposito o reposicion",
  },
  {
    role: "limpieza",
    path: "https://vitaespark.com/cv-para-limpieza",
    pain: "queres postularte a limpieza, mantenimiento o servicios generales",
  },
];

const templates = [
  ({ role, path }) =>
    `Tu CV para ${role} puede estar frenando tus oportunidades.\nCrealo con IA y optimizalo para ATS en ${path}`,
  ({ role, pain, path }) =>
    `Si ${pain}, no mandes un CV generico.\nArmalo con IA, ejemplo y formato ATS en ${path}`,
  ({ role, path }) =>
    `Un buen perfil puede perder entrevistas por un mal CV.\nCrea tu CV para ${role} con IA en ${path}`,
  ({ role, path }) =>
    `Estas buscando trabajo de ${role}?\nVitaeSpark te ayuda a crear un CV mas claro, profesional y optimizado para ATS.\n${path}`,
  ({ role, path }) =>
    `Tu experiencia importa, pero como la presentas tambien.\nCrea tu CV para ${role} con IA y descargalo en PDF.\n${path}`,
];

const days = 30;
const campaign = "oficios_organico";
const rows = [["dia", "canal", "rubro", "publicacion", "url"]];
const channels = ["facebook", "tiktok", "reels"];

function buildTrackedUrl(path, index, role, channel) {
  const url = new URL(path);
  url.searchParams.set("utm_source", channel);
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", `day-${index + 1}-${channel}-${role}`);
  return url.toString();
}

for (let index = 0; index < days; index += 1) {
  const role = roles[index % roles.length];
  const template = templates[index % templates.length];
  const slug = role.role.replaceAll(" ", "-");

  channels.forEach((channel) => {
    const url = buildTrackedUrl(role.path, index, slug, channel);
    rows.push([
      String(index + 1),
      channel,
      role.role,
      template({ ...role, path: url }),
      url,
    ]);
  });
}

const csv = rows
  .map((row) =>
    row
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(",")
  )
  .join("\n");

console.log(csv);
