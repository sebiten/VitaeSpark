export interface CVFormData {
    name: string;
    title: string;
    contact: string;
    about: string;           // nuevo
    experience: string;
    education: string;
    skills: string;
    languages: string;
    additional?: string;
  }
  
  export interface CVResponse {
    cv: string;
  }
  