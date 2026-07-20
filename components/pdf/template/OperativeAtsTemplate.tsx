import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { getCvLabels } from "./labels";

const colors = {
  ink: "#17211D",
  accent: "#1E6650",
  muted: "#53625C",
  line: "#CBD4CF",
  soft: "#EAF1ED",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 29,
    paddingHorizontal: 32,
    fontSize: 9.3,
    color: colors.ink,
    backgroundColor: colors.white,
    lineHeight: 1.35,
  },
  header: {
    marginBottom: 11,
  },
  name: {
    fontSize: 21,
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 4,
  },
  role: {
    fontSize: 11.5,
    color: colors.accent,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 5,
  },
  contact: {
    fontSize: 8.5,
    color: colors.muted,
  },
  capabilityBand: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopColor: colors.accent,
    borderBottomColor: colors.accent,
    backgroundColor: colors.soft,
    paddingVertical: 8,
    paddingHorizontal: 9,
    marginBottom: 12,
  },
  capabilityText: {
    fontSize: 8.9,
    fontWeight: 600,
    color: colors.ink,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 10.3,
    fontWeight: 700,
    color: colors.ink,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  summary: {
    fontSize: 9.4,
    lineHeight: 1.45,
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
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 10.2,
    fontWeight: 700,
  },
  itemSubtitle: {
    fontSize: 8.8,
    color: colors.muted,
  },
  itemMeta: {
    width: 126,
    fontSize: 8.2,
    textAlign: "right",
    color: colors.muted,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2.2,
    paddingLeft: 3,
  },
  bulletMark: {
    width: 10,
    fontWeight: 700,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.8,
    lineHeight: 1.35,
  },
  additionalRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  additionalLabel: {
    width: 114,
    fontSize: 8.6,
    fontWeight: 700,
    color: colors.accent,
  },
  additionalValue: {
    flex: 1,
    fontSize: 8.7,
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
  { top: 145, left: 75 },
  { top: 340, left: 260 },
  { top: 535, left: 80 },
  { top: 720, left: 265 },
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
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function OperativeAtsDocument({
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

        {cv.habilidades.length > 0 ? (
          <View style={styles.capabilityBand} wrap={false}>
            <Text style={styles.capabilityText}>
              {cv.habilidades.slice(0, 10).join("  •  ")}
            </Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.summary}</Text>
          <Text style={styles.summary}>{cv.sobreMi}</Text>
        </View>

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

        {cv.informacionAdicional.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.additional}</Text>
            {cv.informacionAdicional.map((item, index) => (
              <View key={index} style={styles.additionalRow} wrap={false}>
                <Text style={styles.additionalLabel}>
                  {index === 0 ? "Disponibilidad y cursos" : ""}
                </Text>
                <Text style={styles.additionalValue}>{item}</Text>
              </View>
            ))}
          </View>
        ) : null}

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

        {cv.idiomas.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.languages}</Text>
            <Text style={styles.summary}>{cv.idiomas.join("  •  ")}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export default function OperativeAtsTemplate({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  return <OperativeAtsDocument cv={cv} />;
}
