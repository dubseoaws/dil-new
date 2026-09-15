import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Imported route markup keeps its original <img> tags, so the image optimiser is not used.
  images: { unoptimized: true },
  agentRules: false,
}

export default nextConfig
