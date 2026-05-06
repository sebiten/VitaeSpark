import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingTop: 34,
    fontSize: 10,
    fontFamily: "Times-Roman",
    color: "#111111",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.42,
  },
  header: { marginBottom: 10, textAlign: "center" },
  name: {
    fontSize: 19,
    fontFamily: "Times-Bold",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  role: { fontSize: 11, fontFamily: "Times-Italic", marginBottom: 4 },
  contactInfo: {
    fontSize: 9.5,
    color: "#222222",
    textAlign: "center",
    lineHeight: 1.25,
  },
  summary: { fontSize: 9.6, marginBottom: 6, textAlign: "justify" },
  sectionHeader: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    marginTop: 8,
    marginBottom: 4,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    paddingBottom: 1.5,
    letterSpacing: 0.3,
  },
  item: { marginBottom: 7 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1.5,
  },
  leftColumn: { flexDirection: "column", flex: 1, paddingRight: 10 },
  rightColumn: { flexDirection: "column", alignItems: "flex-end", width: 105 },
  company: { fontSize: 10.5, fontFamily: "Times-Bold" },
  position: { fontSize: 10, fontFamily: "Times-Italic" },
  meta: { fontSize: 9, textAlign: "right" },
  bulletList: { marginLeft: 12 },
  bulletItem: { flexDirection: "row", marginBottom: 1.8 },
  bullet: { width: 7, marginRight: 4 },
  bulletText: { fontSize: 9.2, flex: 1 },
  inlineList: { fontSize: 9.5, lineHeight: 1.35 },
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
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
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
      <Text key={index} style={styles.contactInfo}>
        {line.join(" | ")}
      </Text>
    ))}
  </>
);

export default function HarvardTemplateW({ cv }: { cv: RespuestaCV["cv"] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Watermark />
        <View style={styles.header}>
          <Text style={styles.name}>{cv.nombre}</Text>
          <Text style={styles.role}>{cv.puesto}</Text>
          <ContactLines items={cv.contacto} />
        </View>

        <Text style={styles.sectionHeader}>Perfil profesional</Text>
        <Text style={styles.summary}>{cv.sobreMi}</Text>

        <Text style={styles.sectionHeader}>Experiencia profesional</Text>
        {cv.experiencia.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <View style={styles.leftColumn}>
                <Text style={styles.company}>{item.empresa}</Text>
                <Text style={styles.position}>{item.cargo}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.meta}>{item.ubicacion}</Text>
                <Text style={styles.meta}>{item.fechas}</Text>
              </View>
            </View>
            <BulletList items={item.logros} />
          </View>
        ))}

        <Text style={styles.sectionHeader}>Formación</Text>
        {cv.formacion.map((item, index) => (
          <View key={index} style={styles.item} wrap={false}>
            <View style={styles.itemHeader}>
              <View style={styles.leftColumn}>
                <Text style={styles.company}>{item.institucion}</Text>
                <Text style={styles.position}>{item.titulo || ""}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.meta}>{item.ubicacion}</Text>
                <Text style={styles.meta}>{item.fechas}</Text>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.sectionHeader}>Habilidades</Text>
        <Text style={styles.inlineList}>{cv.habilidades.join(" • ")}</Text>

        {cv.idiomas.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Idiomas</Text>
            <Text style={styles.inlineList}>{cv.idiomas.join(" • ")}</Text>
          </>
        )}

        {cv.informacionAdicional.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Información adicional</Text>
            <BulletList items={cv.informacionAdicional} />
          </>
        )}
      </Page>
    </Document>
  );
}

