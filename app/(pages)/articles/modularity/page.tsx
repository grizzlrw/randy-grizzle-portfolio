import Content from './content.mdx';
import ArticleTemplate from '@/app/components/templates/ArticleTemplate';

export default function ArticlePage() {
  return (
    <ArticleTemplate title="Modularity">
      <Content />
    </ArticleTemplate>
  );
}