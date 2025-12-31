import { Container } from '@components/ui/container';
import { getTemplates } from '@modules/templates/actions/get-templates';
import { TemplatesGrid } from '@modules/templates/components/templates-grid.component';

export default async function Home() {
  const { items, pages } = await getTemplates(1, 10);
  return (
    <Container className="mt-10">
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <div className="flex justify-center mt-8">
            <TemplatesGrid templates={items} />
          </div>
        </div>
      </div>
    </Container>
  );
}
