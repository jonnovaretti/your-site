import { Container } from '@components/ui/container';
import { SiteForm } from '@modules/sites/components/site-form';

export default async function Home() {
  return (
    <Container className="mt-10">
      <div className="space-y-10 pb-10">
        <SiteForm />
      </div>
    </Container>
  );
}
