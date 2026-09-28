/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/teacher/assign", destination: "/teacher/class?tab=work", permanent: false },
      { source: "/teacher/roster", destination: "/teacher/class?tab=students", permanent: false },
      { source: "/teacher/roster/:classId", destination: "/teacher/class?class=:classId&tab=students", permanent: false },
      { source: "/teacher/settings", destination: "/teacher/class?tab=look", permanent: false },
    ];
  },
};

export default nextConfig;
