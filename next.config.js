/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // swcMinify: true, // use SWC (default in modern Next.js)
  // webpack(config, { dev, isServer }) {
  //   if (!dev && !isServer) {
  //     // Only for client-side production builds
  //     config.optimization.minimizer.forEach((minimizer) => {
  //       if (minimizer.options && minimizer.options.terserOptions) {
  //         minimizer.options.terserOptions.compress.drop_console = true;
  //       }
  //     });
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;
