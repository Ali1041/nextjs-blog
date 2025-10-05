import Head from 'next/head';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage, 
  ogType = 'website',
  structuredData 
}) => {
  const fullTitle = title ? `${title} | Ijaad Labs` : 'Ijaad Labs - Full-Stack Software Development & AI Solutions';
  const fullDescription = description || 'Leading software development agency specializing in full-stack web development, mobile apps, AI solutions, and digital transformation.';
  const fullKeywords = keywords || 'software development, web development, mobile app development, AI solutions, generative AI, digital transformation, cloud computing, full-stack development, custom software, enterprise solutions';
  const fullCanonical = canonical || 'https://ijaadlabs.com';
  const fullOgImage = ogImage || 'https://ijaadlabs.com/assets/images/business.jpeg';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Ijaad Labs" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@ijaadlabs" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
