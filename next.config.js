// @type {import('next').NextConfig}

const nextConfig = {
  experimental: {
    serverActions: true, //! v13
    mdxRs: true,
    serverComponentsExternalPackages: ['mongoose']
  }
}

module.exports = nextConfig