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
  primary: "#7E22CE",
  primarySoft: "#F3E8FF",
  primaryPale: "#FAF5FF",
  sidebarText: "#F5F3FF",
  sidebarMuted: "#DDD6FE",
  text: "#1F2937",
  textLight: "#4B5563",
  background: "#FFF",
  divider: "#E5E7EB",
};

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
  },
  container: { flex: 1, flexDirection: "row" },
  sidebar: { width: "31%", backgroundColor: colors.primary, padding: 16 },
  main: { width: "69%", padding: 20 },
  header: { marginBottom: 18 },
  photo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    objectFit: "cover",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#C4B5FD",
  },
  name: { fontSize: 18, fontWeight: 700, color: "#FFF", lineHeight: 1.08 },
  position: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.sidebarMuted,
    marginTop: 5,
    lineHeight: 1.25,
  },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    color: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    paddingBottom: 3,
    textTransform: "uppercase",
  },
  profileBox: {
    marginBottom: 14,
    padding: 10,
    backgroundColor: colors.primaryPale,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  titleText: { fontSize: 10.8, fontWeight: 700 },
  subtitleText: { fontSize: 8.5, color: colors.textLight },
  paragraphText: { fontSize: 9, lineHeight: 1.45 },
  bulletList: { marginLeft: 8, marginTop: 4 },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: 6,
    marginTop: 5,
  },
  bulletText: { fontSize: 8.8, lineHeight: 1.35, flex: 1 },
  skillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  skillChip: {
    fontSize: 8,
    color: colors.text,
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    marginRight: 5,
    marginBottom: 5,
  },
  sidebarSection: { marginBottom: 16 },
  sidebarTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: "#FFF",
    letterSpacing: 0.6,
    marginBottom: 7,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#C4B5FD",
    textTransform: "uppercase",
  },
  sidebarText: {
    fontSize: 8.8,
    color: colors.sidebarText,
    lineHeight: 1.45,
    marginBottom: 6,
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
      <View
        key={index}
        style={{ flexDirection: "row", marginBottom: 2 }}
        wrap={false}
      >
        <View style={styles.bulletDot} />
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const SkillList = ({ items }: { items: string[] }) => (
  <View style={styles.skillWrap}>
    {items.map((item, index) => (
      <Text key={index} style={styles.skillChip}>
        {item}
      </Text>
    ))}
  </View>
);

const Sidebar = ({ cv }: { cv: RespuestaCV["cv"] }) => (
  <View style={styles.sidebar}>
    <View style={styles.header}>
      {cv.foto_url ? <Image src={cv.foto_url} style={styles.photo} /> : null}
      <Text style={styles.name}>{cv.nombre}</Text>
      <Text style={styles.position}>{cv.puesto}</Text>
    </View>

    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarTitle}>Contacto</Text>
      {cv.contacto.map((item, index) => (
        <Text key={index} style={styles.sidebarText}>
          {item}
        </Text>
      ))}
    </View>

    {cv.idiomas.length > 0 && (
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Idiomas</Text>
        {cv.idiomas.map((item, index) => (
          <Text key={index} style={styles.sidebarText}>
            {item}
          </Text>
        ))}
      </View>
    )}
  </View>
);

export default function PurpleTemplateW({ cv }: { cv: RespuestaCV["cv"] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Watermark />
        <View style={styles.container}>
          <Sidebar cv={cv} />
          <View style={styles.main}>
            <View style={styles.profileBox}>
              <Text style={styles.sectionTitle}>Perfil profesional</Text>
              <Text style={styles.paragraphText}>{cv.sobreMi}</Text>
            </View>

            {cv.habilidades.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades clave</Text>
                <SkillList items={cv.habilidades} />
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencia laboral</Text>
              {cv.experiencia.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <View
                    wrap={false}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <Text style={styles.titleText}>{item.cargo}</Text>
                    <Text style={styles.subtitleText}>
                      {[item.fechas, item.ubicacion].filter(Boolean).join(" • ")}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 9.5, marginBottom: 3 }}>
                    {item.empresa}
                  </Text>
                  <BulletList items={item.logros} />
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Formación</Text>
              {cv.formacion.map((item, index) => (
                <View key={index} style={{ marginBottom: 9 }} wrap={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.titleText}>{item.institucion}</Text>
                    <Text style={styles.subtitleText}>
                      {[item.fechas, item.ubicacion].filter(Boolean).join(" • ")}
                    </Text>
                  </View>
                  {item.titulo ? (
                    <Text style={styles.subtitleText}>{item.titulo}</Text>
                  ) : null}
                </View>
              ))}
            </View>

            {cv.informacionAdicional.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información adicional</Text>
                {cv.informacionAdicional.map((item, index) => (
                  <Text key={index} style={{ fontSize: 8.8, marginBottom: 4 }}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
