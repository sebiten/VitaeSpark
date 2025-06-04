import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { Avatar } from "@/components/ui/avatar";

// Colores del tema verde
const colors = {
  primary: "#15803D",
  primaryLight: "#22C55E",
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
  sidebar: { width: "30%", backgroundColor: colors.primary, padding: 15 },
  main: { width: "70%", padding: 20 },
  header: { marginBottom: 15 },
  name: { fontSize: 17, fontWeight: 700, color: "#FFF" },
  position: { fontSize: 12, fontWeight: 500, color: "#FFF", marginTop: 4 },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
    color: colors.primary,
    borderBottom: `1px solid ${colors.divider}`,
    paddingBottom: 3,
  },
  textLight: { color: colors.textLight },
  bulletList: { marginLeft: 10 },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.primary,
    marginRight: 5,
    marginTop: 5,
  },

  bulletText: { fontSize: 10, flex: 1 },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  titleText: { fontSize: 11, fontWeight: 700 },
  subtitleText: { fontSize: 9, color: colors.textLight },
  paragraphText: { fontSize: 9, lineHeight: 1.4 },

  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    opacity: 0.15,
    fontSize: 60,
    color: "#1E40AF",
    zIndex: 1,
  },
});

// Componente para la marca de agua
const Watermark = () => (
  <View style={styles.watermarkContainer} fixed>
    <Text style={styles.watermark}>vitaespark.com</Text>
  </View>
);

// Reutilizable para listas con puntos
const BulletList = ({ items }: { items: string[] }) => (
  <View style={styles.bulletList}>
    {items.map((item, i) => (
      <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
        <View style={styles.bulletDot} />
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

// Sidebar personalizado
const Sidebar = ({ cv }: { cv: RespuestaCV["cv"] }) => (
  <View style={styles.sidebar}>
    <View style={styles.header}>
      <Avatar className="aspect-ratio-1/1">
        {cv.foto_url && (
          <Image
          src={cv.foto_url}
          style={{
            width: 68,
            height: 65,
            borderRadius: 30,
            marginBottom: 10,
          }}
        />
        )}
      </Avatar>
      <Text style={styles.name}>{cv.nombre}</Text>
      <Text style={styles.position}>{cv.puesto}</Text>
    </View>
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: "#FFF" }]}>Sobre mí</Text>
      <Text style={{ fontSize: 9, color: "#FFF", lineHeight: 1.6 }}>
        {cv.sobreMi}
      </Text>
    </View>
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: "#FFF" }]}>Contacto</Text>
      {cv.contacto.map((c, i) => (
        <Text key={i} style={{ fontSize: 9, color: "#FFF", marginBottom: 4 }}>
          • {c}
        </Text>
      ))}
    </View>
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: "#FFF" }]}>Habilidades</Text>
      {cv.habilidades.map((h, i) => (
        <Text key={i} style={{ fontSize: 9, color: "#FFF", marginBottom: 4 }}>
          • {h}
        </Text>
      ))}
    </View>
    {cv.idiomas.length > 0 && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: "#FFF" }]}>Idiomas</Text>
        {cv.idiomas.map((l, i) => (
          <Text key={i} style={{ fontSize: 9, color: "#FFF", marginBottom: 4 }}>
            • {l}
          </Text>
        ))}
      </View>
    )}
 
  </View>
);

export default function GreenTemplateW({ cv }: { cv: RespuestaCV["cv"] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Watermark />

        <View style={styles.container}>
          <Sidebar cv={cv} />
          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
              {cv.experiencia.map((e, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: 700 }}>{e.cargo}</Text>
                    <Text style={styles.textLight}>{e.fechas}</Text>
                  </View>
                  <Text style={{ fontSize: 11, marginBottom: 4 }}>
                    {e.empresa}
                  </Text>
                  <BulletList items={e.logros} />
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Formación</Text>
              {cv.formacion.map((f, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.titleText}>{f.institucion}</Text>
                    <Text style={styles.subtitleText}>
                      {[f.fechas, f.ubicacion].filter(Boolean).join(" • ")}
                    </Text>
                  </View>
                  {f.titulo && (
                    <Text style={styles.subtitleText}>{f.titulo}</Text>
                  )}
                </View>
              ))}
            </View>

            {cv.informacionAdicional.length > 0 && (
              <View style={styles.section} wrap={false}>
                <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
                  Información adicional
                </Text>
                {cv.informacionAdicional.map((a, i) => (
                  <Text key={i} style={{ fontSize: 9, marginBottom: 4 }}>
                    • {a}
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
