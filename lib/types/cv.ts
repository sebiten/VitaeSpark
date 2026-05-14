export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface DatosCVFormulario {
  foto_url?: string;
  template?: string;
  language?: "es" | "en";
  nombre: string;
  puesto: string;
  contacto: string;
  sobreMi: string;
  experiencia: string;
  formacion: string;
  habilidades: string;
  idiomas: string;
  informacionAdicional?: string;
}

export interface ExperienciaCV {
  ubicacion: string;
  cargo: string;
  empresa: string;
  fechas: string;
  logros: string[];
}

export interface FormacionCV {
  ubicacion: string;
  institucion: string;
  titulo: string;
  fechas: string;
}

export interface CV {
  language?: "es" | "en";
  foto_url?: string;
  id?: string;
  previewImage?: string;
  nombre: string;
  puesto: string;
  contacto: string[];
  sobreMi: string;
  experiencia: ExperienciaCV[];
  formacion: FormacionCV[];
  habilidades: string[];
  idiomas: string[];
  informacionAdicional: string[];
}

export interface RespuestaCV {
  cv: CV;
}

export interface PaymentStatus {
  status: "idle" | "pending" | "success" | "error";
  message?: string;
}

export interface CVRecord {
  id: string;
  cv_data: CV;
  template: string | null;
}
