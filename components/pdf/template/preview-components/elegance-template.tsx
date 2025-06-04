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

// Colores del tema azul profesional
const colors = {
  primary: "#1E40AF",
  primaryLight: "#3B82F6",
  accent: "#EFF6FF",
  text: "#111827",
  textLight: "#6B7280",
  background: "#FFFFFF",
  divider: "#E5E7EB",
  headerBg: "#F8FAFC",
};

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
    padding: 30,
    lineHeight: 1.4,
  },
  header: {
    backgroundColor: colors.headerBg,
    padding: 20,
    marginBottom: 16,
    borderLeft: `4px solid ${colors.primary}`,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 16,
  },
  position: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textLight,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  contactItem: {
    fontSize: 10,
    color: colors.textLight,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottom: `2px solid ${colors.primary}`,
    paddingBottom: 5,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    color: colors.textLight,
    fontStyle: "italic",
    marginBottom: 5,
  },
  dateRange: {
    fontSize: 9,
    color: colors.textLight,
    fontWeight: 500,
  },
  description: {
    fontSize: 10,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  achievementsList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  achievement: {
    fontSize: 9,
    color: colors.text,
    marginBottom: 3,
    flexDirection: "row",
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: 8,
    marginTop: 4,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    backgroundColor: colors.accent,
    padding: "4 8",
    borderRadius: 3,
    fontSize: 9,
    fontWeight: 500,
  },
  twoColumnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  aboutSection: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
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

// Componente para la marca de agua
const Watermark = () => (
  <View style={styles.watermarkContainer} fixed>
    <Text style={styles.watermark}>vitaespark.com</Text>
  </View>
);

// Componente para logros con bullets
const AchievementsList = ({ items }: { items: string[] }) => (
  <View style={styles.achievementsList}>
    {items.map((item, i) => (
      <View key={i} style={styles.achievement}>
        <View style={styles.bullet} />
        <Text style={{ flex: 1, fontSize: 9 }}>{item}</Text>
      </View>
    ))}
  </View>
);

// Componente para habilidades en formato grid
const SkillsGrid = ({ skills }: { skills: string[] }) => (
  <View style={styles.skillsGrid}>
    {skills.map((skill, i) => (
      <Text key={i} style={styles.skillItem}>
        {skill}
      </Text>
    ))}
  </View>
);

export default function ProfessionalBlueTemplate({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  console.log(
    "Rendering Professional Blue Template with CV data:",
    cv,
    cv.foto_url
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Watermark />

        {/* Header Section */}
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
          <View style={styles.contactRow}>
            {cv.contacto.map((contact, i) => (
              <Text key={i} style={styles.contactItem}>
                {contact}
              </Text>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text
            style={[
              styles.sectionTitle,
              { borderBottom: "none", marginBottom: 8 },
            ]}
          >
            Perfil Profesional
          </Text>
          <Text style={styles.description}>{cv.sobreMi}</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
          {cv.experiencia.map((exp, i) => (
            <View key={i} style={{ marginBottom: 15 }}>
              <View style={styles.twoColumnRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subsectionTitle}>{exp.cargo}</Text>
                  <Text style={styles.company}>{exp.empresa}</Text>
                </View>
                <Text style={styles.dateRange}>{exp.fechas}</Text>
              </View>
              <AchievementsList items={exp.logros} />
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formación Académica</Text>
          {cv.formacion.map((edu, i) => (
            <View key={i} style={styles.twoColumnRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subsectionTitle}>{edu.titulo}</Text>
                <Text style={styles.company}>{edu.institucion}</Text>
              </View>
              <Text style={styles.dateRange}>{edu.fechas}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competencias Técnicas</Text>
          <SkillsGrid skills={cv.habilidades} />
        </View>

        {/* Languages Section */}
        {cv.idiomas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            <View style={styles.skillsGrid}>
              {cv.idiomas.map((lang, i) => (
                <Text key={i} style={styles.skillItem}>
                  {lang}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Additional Information */}
        {cv.informacionAdicional.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Adicional</Text>
            <AchievementsList items={cv.informacionAdicional} />
          </View>
        )}
      </Page>
    </Document>
  );
}
