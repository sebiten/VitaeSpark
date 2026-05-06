import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";

const colors = {
  primary: "#0F172A",
  accent: "#2563EB",
  soft: "#EFF6FF",
  text: "#111827",
  muted: "#6B7280",
  line: "#D1D5DB",
};

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, color: colors.text, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary,
  },
  photo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    objectFit: "cover",
    marginRight: 14,
  },
  headerText: { flex: 1 },
  name: { fontSize: 23, fontWeight: 700, color: colors.primary, marginBottom: 4 },
  position: { fontSize: 11.5, color: colors.accent, fontWeight: 600, marginBottom: 5 },
  contact: { fontSize: 8.8, color: colors.muted, lineHeight: 1.35 },
  profileBox: {
    backgroundColor: colors.soft,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    marginBottom: 14,
  },
  section: { marginBottom: 13 },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: 700,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  description: { fontSize: 9.2, lineHeight: 1.45 },
  item: { marginBottom: 10 },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  itemTitle: { fontSize: 10.8, fontWeight: 700, color: colors.text },
  company: { fontSize: 9.2, color: colors.muted, marginBottom: 3 },
  date: { fontSize: 8.4, color: colors.muted, textAlign: "right" },
  bulletList: { marginLeft: 8 },
  bulletItem: { flexDirection: "row", marginBottom: 2 },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginRight: 6,
    marginTop: 5,
  },
  bulletText: { fontSize: 8.8, lineHeight: 1.35, flex: 1 },
  chipWrap: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    fontSize: 8,
    color: colors.primary,
    backgroundColor: colors.soft,
    borderRadius: 8,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    marginRight: 5,
    marginBottom: 5,
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  watermark: {
    position: "absolute",
    transform: "rotate(-35deg)",
    opacity: 0.3,
    fontSize: 36,
    color: "#1E40AF",
    zIndex: 1,
  },
});

const watermarkItems = [
  { top: 140, left: 70 },
  { top: 330, left: 260 },
  { top: 520, left: 80 },
  { top: 710, left: 270 },
];

const Watermark = () => (
  <View style={styles.watermarkContainer} fixed>
    {watermarkItems.map((item, index) => (
      <Text key={index} style={[styles.watermark, { top: item.top, left: item.left }]}>
        www.vitaeSpark.com
      </Text>
    ))}
  </View>
);

const BulletList = ({ items }: { items: string[] }) => (
  <View style={styles.bulletList}>
    {items.map((item, index) => (
      <View key={index} style={styles.bulletItem} wrap={false}>
        <View style={styles.bullet} />
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const ChipList = ({ items }: { items: string[] }) => (
  <View style={styles.chipWrap}>
    {items.map((item, index) => (
      <Text key={index} style={styles.chip}>
        {item}
      </Text>
    ))}
  </View>
);

const chunkItems = (items: string[], size = 3) =>
  items.reduce<string[][]>((chunks, item, index) => {
    if (index % size === 0) chunks.push([]);
    chunks[chunks.length - 1].push(item);
    return chunks;
  }, []);

const ContactLines = ({ items }: { items: string[] }) => (
  <>
    {chunkItems(items).map((line, index) => (
      <Text key={index} style={styles.contact}>
        {line.join(" | ")}
      </Text>
    ))}
  </>
);

export default function ProfessionalBlueTemplate({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Watermark />
        <View style={styles.header}>
          {cv.foto_url ? <Image src={cv.foto_url} style={styles.photo} /> : null}
          <View style={styles.headerText}>
            <Text style={styles.name}>{cv.nombre}</Text>
            <Text style={styles.position}>{cv.puesto}</Text>
            <ContactLines items={cv.contacto} />
          </View>
        </View>

        <View style={styles.profileBox}>
          <Text style={styles.sectionTitle}>Perfil profesional</Text>
          <Text style={styles.description}>{cv.sobreMi}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia profesional</Text>
          {cv.experiencia.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader} wrap={false}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.itemTitle}>{item.cargo}</Text>
                  <Text style={styles.company}>{item.empresa}</Text>
                </View>
                <Text style={styles.date}>
                  {[item.fechas, item.ubicacion].filter(Boolean).join(" • ")}
                </Text>
              </View>
              <BulletList items={item.logros} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades clave</Text>
          <ChipList items={cv.habilidades} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formación</Text>
          {cv.formacion.map((item, index) => (
            <View key={index} style={styles.itemHeader} wrap={false}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.itemTitle}>{item.titulo || item.institucion}</Text>
                <Text style={styles.company}>{item.institucion}</Text>
              </View>
              <Text style={styles.date}>
                {[item.fechas, item.ubicacion].filter(Boolean).join(" • ")}
              </Text>
            </View>
          ))}
        </View>

        {cv.idiomas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            <ChipList items={cv.idiomas} />
          </View>
        )}

        {cv.informacionAdicional.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información adicional</Text>
            <BulletList items={cv.informacionAdicional} />
          </View>
        )}
      </Page>
    </Document>
  );
}

