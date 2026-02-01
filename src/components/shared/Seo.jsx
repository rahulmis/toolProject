import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, keywords, canonical, jsonLd }) => {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta */}
      {description && (
        <meta name="description" content={description} />
      )}

      {keywords && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Canonical */}
      {canonical && (
        <link rel="canonical" href={canonical} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && (
        <meta property="og:description" content={description} />
      )}
      {canonical && (
        <meta property="og:url" content={canonical} />
      )}
      <meta property="og:type" content="website" />

      {/* 🔥 JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
