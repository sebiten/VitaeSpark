"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { createClient } from "@/utils/supabase/client";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import type { CVRecord } from "@/lib/types/cv";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, Loader2, User, X } from "lucide-react";
import UserPayments from "@/components/UserPayment";
import { CVThumbnail } from "./CvThumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PerfilCVs() {
  const [cvs, setCvs] = useState<CVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [paidCv, setPaidCv] = useState<CVRecord | null>(null);
  const [selectedCV, setSelectedCV] = useState<CVRecord | null>(null);
  const [profileInfo, setProfileInfo] = useState<{
    name: string;
    email: string;
    imgUrl: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  function getTemplateClass(template: string) {
    switch (template) {
      case "green":
        return "bg-green-600 text-white";
      case "blue":
        return "bg-blue-600 text-white";
      case "elegance":
        return "bg-sky-800 text-white";
      case "purple":
        return "bg-purple-600 text-white";
      case "harvard":
        return "bg-white text-black";
      default:
        return "bg-purple-600 text-white";
    }
  }

  function getTemplateLabel(template: string): string {
    switch (template) {
      case "green":
        return "Verde";
      case "blue":
        return "Azul";
      case "elegance":
        return "Elegance";
      case "purple":
        return "Púrpura";
      case "harvard":
        return "Harvard";
      default:
        return "Púrpura";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfileInfo({
          name: profileData.full_name || user.email?.split("@")[0] || "Usuario",
          email: user.email || "No disponible",
          imgUrl: user.user_metadata?.avatar_url,
        });
      }

      const { data } = await supabase
        .from("cvs")
        .select("id, cv_data, template, created_at")
        .eq("profile_id", user.id)
        .eq("status", "paid")
        .order("created_at", { ascending: false });

      if (data) {
        setCvs(data);
        const cvId = searchParams.get("cv_id");

        if (cvId) {
          const found = data.find((cv) => cv.id === cvId);
          if (found) {
            setPaidCv(found);
            setShowCongrats(true);
            router.replace("/perfil");
          }
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="bg-gradient-to-br from-[#1F1F22] to-[#141416] px-8 py-6 rounded-2xl shadow-2xl border border-[#2A2A2D] flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-white" />
          <span className="text-[#E4E4E7] font-semibold text-lg tracking-wide">
            Cargando tus CVs...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-10 space-y-8 bg-[#0F0F10]">
      {/* ... */}
      {/* Tu componente sigue igual, no es necesario repetirlo todo para no recargar el mensaje */}
      {/* ... */}

      <UserPayments />
    </div>
  );
}

function EmptyState({ router }: { router: any }) {
  return (
    <div className="text-center py-16 px-6 bg-[#0F0F10] rounded-xl border border-[#2A2A2D] max-w-md mx-auto">
      <User className="w-12 h-12 text-secondary mx-auto mb-4 opacity-50" />
      <h3 className="text-xl font-semibold text-[#F4F4F5] mb-2">
        Sin CVs disponibles
      </h3>
      <p className="text-[#A1A1AA] mb-6">
        No tienes CVs generados y aprobados aún.
      </p>
      <Button
        onClick={() => router.push("/crear")}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Crear mi primer CV
      </Button>
    </div>
  );
}
