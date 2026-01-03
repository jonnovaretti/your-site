import { Container } from '@components/ui/container';
import { SiteForm } from '@modules/sites/components/site-form';
import { getTemplates } from '@modules/templates/actions/get-templates';
import { TemplatesGrid } from '@modules/templates/components/templates-grid.component';

export default async function Home() {
  const { items, pages } = await getTemplates(1, 10);
  return (
    <Container className="mt-10">
      <div className="space-y-10 pb-10">
        <SiteForm />
      </div>
    </Container>
  );
}
