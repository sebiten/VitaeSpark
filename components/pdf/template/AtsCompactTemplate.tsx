import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { getCvLabels } from "./labels";

const colors = {
  ink: "#111827",
  text: "#1F2937",
  muted: "#5B6472",
  rule: "#CBD5E1",
  softRule: "#E5E7EB",
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 30,
    paddingVertical: 28,
    fontSize: 8.9,
    fontFamily: "Helvetica",
    color: colors.text,
    backgroundColor: "#FFFFFF",
    lineHeight: 1.32,
  },
  header: {
    marginBottom: 11,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
  },
  name: {
    fontSize: 21,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    marginBottom: 3,
  },
  role: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: colors.muted,
    marginBottom: 5,
  },
  contact: {
    fontSize: 8.2,
    color: colors.muted,
    lineHeight: 1.28,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 8.4,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    paddingTop: 4,
    marginBottom: 4,
    borderTopWidth: 0.8,
    borderTopColor: colors.rule,
  },
  summary: {
    fontSize: 8.9,
    color: colors.text,
    textAlign: "justify",
  },
  skillList: {
    fontSize: 8.6,
    color: colors.text,
    lineHeight: 1.3,
  },
  item: {
    marginBottom: 6.5,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1.5,
  },
  itemMain: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 9.4,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
  },
  itemSubtitle: {
    fontSize: 8.4,
    color: colors.muted,
    marginTop: 1,
  },
  itemMeta: {
    width: 115,
    fontSize: 8,
    color: colors.muted,
    textAlign: "right",
  },
  bulletList: {
    marginTop: 2,
    marginLeft: 6,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 1.6,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.ink,
    marginRight: 6,
    marginTop: 4.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.4,
    color: colors.text,
    lineHeight: 1.28,
  },
  educationItem: {
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.softRule,
  },
});

const joinInline = (items: string[]) => items.filter(Boolean).join(" | ");

const ContactLines = ({ items }: { items: string[] }) => (
  <Text style={styles.contact}>{joinInline(items)}</Text>
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

export default function AtsCompactTemplate({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  const labels = getCvLabels(cv);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{cv.nombre}</Text>
          <Text style={styles.role}>{cv.puesto}</Text>
          <ContactLines items={cv.contacto} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.summary}</Text>
          <Text style={styles.summary}>{cv.sobreMi}</Text>
        </View>

        {cv.habilidades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.keySkills}</Text>
            <Text style={styles.skillList}>{joinInline(cv.habilidades)}</Text>
          </View>
        )}

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
                  {[item.fechas, item.ubicacion].filter(Boolean).join(" | ")}
                </Text>
              </View>
              <BulletList items={item.logros} />
            </View>
          ))}
        </View>

        {cv.formacion.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.education}</Text>
            {cv.formacion.map((item, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemMain}>
                    <Text style={styles.itemTitle}>
                      {item.titulo || item.institucion}
                    </Text>
                    <Text style={styles.itemSubtitle}>{item.institucion}</Text>
                  </View>
                  <Text style={styles.itemMeta}>
                    {[item.fechas, item.ubicacion].filter(Boolean).join(" | ")}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {cv.idiomas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.languages}</Text>
            <Text style={styles.skillList}>{joinInline(cv.idiomas)}</Text>
          </View>
        )}

        {cv.informacionAdicional.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.additional}</Text>
            <BulletList items={cv.informacionAdicional} />
          </View>
        )}
      </Page>
    </Document>
  );
}
