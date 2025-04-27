export interface DatosCVFormulario {
  nombre: string
  puesto: string
  contacto: string
  sobreMi: string
  experiencia: string
  formacion: string
  habilidades: string
  idiomas: string
  informacionAdicional?: string
}

export interface ExperienciaCV {
  cargo: string
  empresa: string
  fechas: string
  logros: string[]
}

export interface FormacionCV {
  institucion: string
  titulo: string
  fechas: string
}

export interface CV {
  nombre: string
  puesto: string
  contacto: string[]
  sobreMi: string
  experiencia: ExperienciaCV[]
  formacion: FormacionCV[]
  habilidades: string[]
  idiomas: string[]
  informacionAdicional: string[]
}

export interface RespuestaCV {
  cv: CV
}

export interface PaymentStatus {
  status: "idle" | "pending" | "success" | "error"
  message?: string
}
