import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    const indexNowKey = process.env.INDEXNOW_KEY?.trim();
    if (!indexNowKey || !/^[A-Za-z0-9-]{8,128}$/.test(indexNowKey)) {
      return [];
    }

    return [
      {
        source: `/${indexNowKey}.txt`,
        destination: `/api/indexnow-key?verification=${indexNowKey}`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
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
