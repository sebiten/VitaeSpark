import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/glosario/que-es-currriculum-vitae",
        destination: "/glosario/que-es-curriculum-vitae",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/cvpreview/**",
      },
    ],
  },
};

module.exports = nextConfig;
