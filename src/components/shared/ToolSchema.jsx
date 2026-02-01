import { Helmet } from 'react-helmet-async';

const ToolSchema = ({ tool }) => {
  // 1️⃣ SoftwareApplication schema (always)
  const softwareSchema = {
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

  // 2️⃣ FAQ schema (ONLY if FAQs exist)
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": tool.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      : null;

  return (
    <Helmet>
      {/* SoftwareApplication schema */}
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>

      {/* FAQ schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default ToolSchema;
