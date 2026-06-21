import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { getCvLabels } from "../labels";

const colors = {
  ink: "#171717",
  softInk: "#424242",
  muted: "#666666",
  rule: "#B8B8B8",
  lightRule: "#E5E5E5",
  watermark: "#1E40AF",
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 38,
    paddingVertical: 34,
    fontSize: 9.6,
    fontFamily: "Times-Roman",
    color: colors.ink,
    backgroundColor: "#FFFFFF",
    lineHeight: 1.38,
  },
  header: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1.2,
    borderBottomColor: colors.ink,
  },
  name: {
    fontSize: 23,
    fontFamily: "Times-Bold",
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  role: {
    fontSize: 11.2,
    fontFamily: "Times-Italic",
    color: colors.softInk,
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 8.7,
    color: colors.muted,
    lineHeight: 1.3,
  },
  summary: {
    fontSize: 9.3,
    marginBottom: 7,
    textAlign: "justify",
    color: colors.softInk,
  },
  sectionHeader: {
    fontSize: 9.4,
    fontFamily: "Times-Bold",
    marginTop: 9,
    marginBottom: 5,
    textTransform: "uppercase",
    borderBottomWidth: 0.8,
    borderBottomColor: colors.rule,
    paddingBottom: 2,
    letterSpacing: 0.8,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  leftColumn: {
    flexDirection: "column",
    flex: 1,
    paddingRight: 10,
  },
  rightColumn: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: 118,
  },
  company: {
    fontSize: 10.2,
    fontFamily: "Times-Bold",
  },
  position: {
    fontSize: 9.5,
    fontFamily: "Times-Italic",
    color: colors.softInk,
    marginTop: 1,
  },
  meta: {
    fontSize: 8.4,
    color: colors.muted,
    textAlign: "right",
  },
  bulletList: {
    marginLeft: 7,
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2.2,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.ink,
    marginRight: 7,
    marginTop: 5,
  },
  bulletText: {
    fontSize: 8.9,
    lineHeight: 1.34,
    flex: 1,
    color: colors.softInk,
  },
  inlineList: {
    fontSize: 9,
    lineHeight: 1.35,
    color: colors.softInk,
  },
  educationItem: {
    paddingBottom: 4,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightRule,
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
    opacity: 0.24,
    fontSize: 34,
    color: colors.watermark,
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
      <Text
        key={index}
        style={[styles.watermark, { top: item.top, left: item.left }]}
      >
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

const joinInline = (items: string[]) => items.filter(Boolean).join(" | ");

export default function HarvardTemplateW({ cv }: { cv: RespuestaCV["cv"] }) {
  const labels = getCvLabels(cv);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Watermark />
        <View style={styles.header}>
          <Text style={styles.name}>{cv.nombre}</Text>
          <Text style={styles.role}>{cv.puesto}</Text>
          <ContactLines items={cv.contacto} />
        </View>

        <Text style={styles.sectionHeader}>{labels.summary}</Text>
        <Text style={styles.summary}>{cv.sobreMi}</Text>

        <Text style={styles.sectionHeader}>{labels.experience}</Text>
        {cv.experiencia.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <View style={styles.leftColumn}>
                <Text style={styles.company}>{item.cargo}</Text>
                <Text style={styles.position}>{item.empresa}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.meta}>{item.fechas}</Text>
                <Text style={styles.meta}>{item.ubicacion}</Text>
              </View>
            </View>
            <BulletList items={item.logros} />
          </View>
        ))}

        {cv.formacion.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>{labels.education}</Text>
            {cv.formacion.map((item, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <View style={styles.itemHeader}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.company}>
                      {item.titulo || item.institucion}
                    </Text>
                    <Text style={styles.position}>{item.institucion}</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.meta}>{item.fechas}</Text>
                    <Text style={styles.meta}>{item.ubicacion}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {cv.habilidades.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>{labels.skills}</Text>
            <Text style={styles.inlineList}>{joinInline(cv.habilidades)}</Text>
          </>
        )}

        {cv.idiomas.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>{labels.languages}</Text>
            <Text style={styles.inlineList}>{joinInline(cv.idiomas)}</Text>
          </>
        )}

        {cv.informacionAdicional.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>{labels.additional}</Text>
            <BulletList items={cv.informacionAdicional} />
          </>
        )}
      </Page>
    </Document>
  );
}
