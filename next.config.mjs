/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'idnrocx8ghz6ymou.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: '*.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;
