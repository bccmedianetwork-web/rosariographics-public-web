/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com https://connect.facebook.net https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com https://px.ads.linkedin.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
              "connect-src 'self' https://challenges.cloudflare.com https://graph.facebook.com https://www.google.com https://www.googleadservices.com https://analytics.google.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://www.googletagmanager.com",
              "frame-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com",
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://www.rosariographics.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
