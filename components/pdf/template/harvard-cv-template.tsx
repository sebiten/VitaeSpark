import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";

// Estilos minimalistas en blanco y negro, optimizados para ATS
const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingTop: 40,
    fontSize: 10,
    fontFamily: "Times-Roman",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 10,
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "Times-Roman",
    marginBottom: 5,
    fontWeight: "800",
  },
  contactInfo: {
    fontSize: 11,
    color: "#1E40AF",
    marginBottom: 2,
    marginTop: 4,
    textAlign: "center",
  },
  summary: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: "justify",
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    marginTop: 10,
    marginBottom: 5,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },

  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  companyPosition: {
    flexDirection: "column",
  },
  company: {
    fontSize: 11,
    fontFamily: "Times-Bold",
  },
  position: {
    fontSize: 11,
    fontStyle: "italic",
  },
  locationDate: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  location: {
    fontSize: 10,
    textAlign: "right",
  },
  date: {
    fontSize: 10,
    textAlign: "right",
  },
  bulletList: {
    marginLeft: 15,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    textAlign: "center",
    marginRight: 5,
  },
  bulletText: {
    fontSize: 9,
    flex: 1,
  },
  educationItem: {
    marginBottom: 5,
  },
  institution: {
    fontSize: 11,
    fontFamily: "Times-Bold",
  },
  degree: {
    fontSize: 11,
    fontStyle: "italic",
  },
  skillItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  divider: {
    borderBottom: "1px solid black",
    marginTop: 5,
    marginBottom: 5,
  },
});

// Componente para listas con viñetas
const BulletList = ({ items }: { items: string[] }) => (
  <View style={styles.bulletList} wrap={false}>
    {items.map((item, i) => (
      <View key={i} style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

// Plantilla principal del documento PDF
export default function HarvardTemplate({ cv }: { cv: RespuestaCV["cv"] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con nombre y datos de contacto */}
        <View style={styles.header}>
          <Text style={styles.name}>{cv.nombre}</Text>
          <Text style={styles.contactInfo}>{cv.contacto.join(" • ")}</Text>
        </View>

        {/* Resumen profesional */}
        <Text style={styles.summary}>{cv.sobreMi}</Text>

        {/* Experiencia Profesional */}
        <Text style={styles.sectionHeader}>Experiencia Profesional</Text>

        {cv.experiencia.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={styles.companyPosition}>
                <Text style={styles.company}>{exp.empresa}</Text>
                <Text style={styles.position}>{exp.cargo}</Text>
              </View>
              <View style={styles.locationDate}>
                <Text style={styles.location}>{exp.ubicacion}</Text>
                <Text style={styles.date}>{exp.fechas}</Text>
              </View>
            </View>
            <BulletList items={exp.logros} />
          </View>
        ))}

        {/* Educación */}
        <Text style={styles.sectionHeader}>Educación</Text>

        {cv.formacion.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <View style={styles.experienceHeader}>
              <View style={styles.companyPosition}>
                <Text style={styles.institution}>{edu.institucion}</Text>
                <Text style={styles.degree}>{edu.titulo || ""}</Text>
              </View>
              <View style={styles.locationDate}>
                <Text style={styles.location}>{edu.ubicacion}</Text>
                <Text style={styles.date}>{edu.fechas}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Skills Adicionales */}
        <View break>
          <Text style={styles.sectionHeader}>
            Habilidades
          </Text>
        </View>

        <BulletList items={cv.habilidades} />

        {/* Idiomas si existen */}
        {cv.idiomas.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Idiomas</Text>
            <BulletList items={cv.idiomas} />
          </>
        )}

        {/* Información Adicional si existe */}
        {cv.informacionAdicional.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionHeader}>Información Adicional</Text>
            <BulletList items={cv.informacionAdicional} />
          </View>
        )}
      </Page>
    </Document>
  );
}
