import { Helmet } from 'react-helmet-async';

const ToolSchema = ({ tool }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.longDescription || tool.description,
    "applicationCategory": tool.category,
    "operatingSystem": "Web",
    "url": `https://jsonandmore.com/${tool.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "JSON and More",
      "url": "https://jsonandmore.com"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ToolSchema;
