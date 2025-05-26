import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    fontFamily: "Times-Roman",
    backgroundColor: "#0B0F1A", // fondo más oscuro
    color: "#E5E7EB", // texto claro
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155", // gris oscuro
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    color: "#F8FAFC", // blanco casi puro
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 10,
    color: "#60A5FA", // azul claro
    fontFamily: "Times-Bold",
    marginTop: 2,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    color: "#60A5FA",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B", // borde oscuro
    paddingBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    color: "#D1D5DB",
    textAlign: "justify",
    backgroundColor: "#1E293B", // fondo oscuro
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#60A5FA",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  company: {
    fontFamily: "Times-Bold",
    fontSize: 11,
  },
  position: {
    fontSize: 10,
    color: "#60A5FA",
    marginBottom: 2,
  },
  location: {
    fontSize: 9,
    color: "#9CA3AF", // gris medio oscuro
  },
  date: {
    fontSize: 9,
    fontFamily: "Times-Bold",
    color: "#D1D5DB", // gris claro
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontWeight: "bold",
    color: "#60A5FA",
  },
  bulletText: {
    fontSize: 10,
    color: "#E5E7EB", // texto claro
    flex: 1,
  },
  educationItem: {
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillBox: {
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#1E293B",
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 9,
    color: "#93C5FD", // azul más claro
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    opacity: 0.15,
    fontSize: 60,
    color: "#1E40AF",
    zIndex: 1,
  },
});

const Watermark = () => (
  <View style={styles.watermarkContainer} fixed>
    <Text style={styles.watermark}>vitaespark.com</Text>
  </View>
);

const BulletList = ({ items }: { items: string[] }) => (
  <View style={styles.bulletList}>
    {items.map((item, i) => (
      <View key={i} style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const EleganceTemplate = ({ cv }: { cv: RespuestaCV["cv"] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{cv.nombre}</Text>
        <Text style={styles.contactInfo}>{cv.contacto.join(" • ")}</Text>
      </View>

      <Text style={styles.summary}>{cv.sobreMi}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
        {cv.experiencia.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.company}>{exp.empresa}</Text>
              <View>
                <Text style={styles.location}>{exp.ubicacion}</Text>
                <Text style={styles.date}>{exp.fechas}</Text>
              </View>
            </View>
            <Text style={styles.position}>{exp.cargo}</Text>
            <BulletList items={exp.logros} />
          </View>
        ))}
      </View>

      {/* Educación */}
      <Text style={styles.sectionTitle}>Educación</Text>

      {cv.formacion.map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <View style={styles.experienceHeader}>
            <View style={styles.company}>
              <Text style={styles.company}>{edu.institucion}</Text>
              <Text style={styles.position}>{edu.titulo || ""}</Text>
            </View>
            <View style={styles.location}>
              <Text style={styles.location}>{edu.ubicacion}</Text>
              <Text style={styles.date}>{edu.fechas}</Text>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.skillsContainer}>
          {cv.habilidades.map((skill, i) => (
            <View key={i} style={styles.skillBox}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {cv.idiomas.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idiomas</Text>
          <BulletList items={cv.idiomas} />
        </View>
      )}

      {cv.informacionAdicional.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Adicional</Text>
          <BulletList items={cv.informacionAdicional} />
        </View>
      )}
    </Page>
  </Document>
);

export default EleganceTemplate;
