import { useParams, Navigate } from 'react-router-dom';
import Seo from '../components/shared/Seo';
import ToolSchema from '../components/shared/ToolSchema';
import { getToolBySlug } from '../features/tools/registry';

const ToolPage = () => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const ToolComponent = tool.component;
  const seo = tool.seo || {};

  return (
    <>
      {/* SEO Meta */}
      <Seo
        title={seo.title || tool.name}
        description={seo.description || tool.description}
        keywords={seo.keywords}
        canonical={`https://jsonandmore.com/${tool.slug}`}
      />

      {/* 🔥 Schema.org */}
      <ToolSchema tool={tool} />

      {/* Tool UI */}
      <ToolComponent />
    </>
  );
};

export default ToolPage;
