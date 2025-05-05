/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/login", "/api/*", "/admin/*"],
  sourceDir: ".next", // 👈 explícitamente le decimos dónde está el build
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
