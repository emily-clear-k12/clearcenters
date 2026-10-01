/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/teacher/assign", destination: "/teacher/class?tab=work", permanent: false },
      { source: "/teacher/roster", destination: "/teacher/class?tab=students", permanent: false },
      { source: "/teacher/roster/:classId", destination: "/teacher/class?class=:classId&tab=students", permanent: false },
      // Sept 30, 2026: ClearCode was renamed ClearDecode.
      { source: "/code", destination: "/decode", permanent: true },
      { source: "/code/:path*", destination: "/decode/:path*", permanent: true },
      { source: "/teacher/clearcode", destination: "/teacher/cleardecode", permanent: true },
      { source: "/teacher/clearcode/:path*", destination: "/teacher/cleardecode/:path*", permanent: true },
      { source: "/teacher/settings", destination: "/teacher/class?tab=look", permanent: false },
    ];
  },
};

export default nextConfig;
