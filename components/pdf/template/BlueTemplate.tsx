import React from "react"
import {
  Font,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer"
import type { RespuestaCV } from "@/lib/types/cv"



// Colores del tema azul
const colors = {
  primary: "#1E40AF",
  primaryLight: "#3B82F6",
  text: "#1F2937",
  textLight: "#4B5563",
  background: "#FFF",
  divider: "#E5E7EB",
}

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    backgroundColor: colors.primary,
    padding: 15,
  },
  main: {
    width: "70%",
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: "#FFF",
  },
  position: {
    fontSize: 12,
    fontWeight: 500,
    color: "#FFF",
    marginTop: 4,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
    color: colors.primary,
    borderBottom: `1px solid ${colors.divider}`,
    paddingBottom: 3,
  },
  textLight: {
    color: colors.textLight,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.primary,
    marginRight: 5,
    marginTop: 5,
  },
  bulletText: {
    fontSize: 9,
    flex: 1,
  },
})

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
)

// Sidebar personalizado
const Sidebar = ({ cv }: { cv: RespuestaCV["cv"] }) => (
  <View style={styles.sidebar}>
    <View style={styles.header}>
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

    {cv.informacionAdicional.length > 0 && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: "#FFF" }]}>
          Información adicional
        </Text>
        {cv.informacionAdicional.map((a, i) => (
          <Text key={i} style={{ fontSize: 9, color: "#FFF", marginBottom: 4 }}>
            • {a}
          </Text>
        ))}
      </View>
    )}
  </View>
)

export default function BlueTemplate({ cv }: { cv: RespuestaCV["cv"] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Sidebar cv={cv} />
          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
              {cv.experiencia.map((e, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between" }}
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
                <View key={i} style={{ marginBottom: 6 }}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between" }}
                  >
                    <Text style={{ fontWeight: 500 }}>{f.institucion}</Text>
                    <Text style={styles.textLight}>{f.fechas}</Text>
                  </View>
                  <Text style={{ fontSize: 10 }}>{f.titulo}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
