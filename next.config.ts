/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xkfpzmyhtsqvjnepkxrz.supabase.co",
        pathname: "/storage/v1/object/public/cvpreview/**",
      },
    ],
  },
};

module.exports = nextConfig;
