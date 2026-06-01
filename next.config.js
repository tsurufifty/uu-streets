/** @type {import('next').NextConfig} */

// Достаём хост из NEXT_PUBLIC_STRAPI_URL, если он задан, и добавляем его в
// remotePatterns — иначе next/image отвалится с ошибкой при попытке загрузить
// картинку из Strapi.
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
let strapiPattern = null;
if (strapiUrl) {
  try {
    const u = new URL(strapiUrl);
    strapiPattern = {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      port: u.port || undefined,
      pathname: "/uploads/**",
    };
  } catch (e) {
    // ignore
  }
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      ...(strapiPattern ? [strapiPattern] : []),
    ],
  },
};

module.exports = nextConfig;
