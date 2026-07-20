import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { getCvLabels } from "./labels";

const colors = {
  ink: "#162029",
  accent: "#315A72",
  muted: "#53616B",
  line: "#C8D0D5",
  soft: "#EEF2F4",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 30,
    paddingHorizontal: 34,
    fontSize: 9.4,
    color: colors.ink,
    backgroundColor: colors.white,
    lineHeight: 1.36,
  },
  header: {
    paddingBottom: 12,
    marginBottom: 13,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 0.2,
    lineHeight: 1.15,
    marginBottom: 4,
  },
  role: {
    fontSize: 11.5,
    fontWeight: 600,
    color: colors.accent,
    lineHeight: 1.2,
    marginBottom: 5,
  },
  contact: {
    fontSize: 8.6,
    color: colors.muted,
    lineHeight: 1.4,
  },
  summary: {
    fontSize: 9.6,
    lineHeight: 1.45,
    marginBottom: 4,
  },
  section: {
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 10.2,
    fontWeight: 700,
    color: colors.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.line,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemMain: {
    flex: 1,
    paddingRight: 12,
  },
  itemTitle: {
    fontSize: 10.2,
    fontWeight: 700,
  },
  itemSubtitle: {
    fontSize: 8.9,
    color: colors.muted,
  },
  itemMeta: {
    width: 124,
    fontSize: 8.3,
    textAlign: "right",
    color: colors.muted,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 10,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.8,
    lineHeight: 1.35,
  },
  compactBand: {
    paddingVertical: 7,
    paddingHorizontal: 9,
    backgroundColor: colors.soft,
    marginBottom: 10,
  },
  inlineText: {
    fontSize: 8.9,
    lineHeight: 1.4,
  },
  watermarkLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  watermark: {
    position: "absolute",
    transform: "rotate(-34deg)",
    opacity: 0.18,
    fontSize: 34,
    color: colors.accent,
  },
});

const watermarkPositions = [
  { top: 150, left: 74 },
  { top: 345, left: 264 },
  { top: 540, left: 78 },
  { top: 725, left: 270 },
];

function Watermark() {
  return (
    <View style={styles.watermarkLayer} fixed>
      {watermarkPositions.map((position, index) => (
        <Text key={index} style={[styles.watermark, position]}>
          www.vitaespark.com
        </Text>
      ))}
    </View>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletRow} wrap={false}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function ModernAtsDocument({
  cv,
  watermark = false,
}: {
  cv: RespuestaCV["cv"];
  watermark?: boolean;
}) {
  const labels = getCvLabels(cv);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {watermark ? <Watermark /> : null}

        <View style={styles.header}>
          <Text style={styles.name}>{cv.nombre}</Text>
          <Text style={styles.role}>{cv.puesto}</Text>
          <Text style={styles.contact}>{cv.contacto.join("  |  ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.summary}</Text>
          <Text style={styles.summary}>{cv.sobreMi}</Text>
        </View>

        {cv.habilidades.length > 0 ? (
          <View style={styles.compactBand} wrap={false}>
            <Text style={styles.inlineText}>
              {cv.habilidades.join("  •  ")}
            </Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.experience}</Text>
          {cv.experiencia.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader} wrap={false}>
                <View style={styles.itemMain}>
                  <Text style={styles.itemTitle}>{item.cargo}</Text>
                  <Text style={styles.itemSubtitle}>{item.empresa}</Text>
                </View>
                <Text style={styles.itemMeta}>
                  {[item.fechas, item.ubicacion].filter(Boolean).join(" · ")}
                </Text>
              </View>
              <BulletList items={item.logros} />
            </View>
          ))}
        </View>

        {cv.formacion.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.education}</Text>
            {cv.formacion.map((item, index) => (
              <View key={index} style={styles.itemHeader} wrap={false}>
                <View style={styles.itemMain}>
                  <Text style={styles.itemTitle}>{item.titulo}</Text>
                  <Text style={styles.itemSubtitle}>{item.institucion}</Text>
                </View>
                <Text style={styles.itemMeta}>
                  {[item.fechas, item.ubicacion].filter(Boolean).join(" · ")}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {cv.idiomas.length > 0 || cv.informacionAdicional.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.additional}</Text>
            {cv.idiomas.length > 0 ? (
              <Text style={styles.inlineText}>{cv.idiomas.join("  •  ")}</Text>
            ) : null}
            {cv.informacionAdicional.length > 0 ? (
              <BulletList items={cv.informacionAdicional} />
            ) : null}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export default function ModernAtsTemplate({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  return <ModernAtsDocument cv={cv} />;
}
