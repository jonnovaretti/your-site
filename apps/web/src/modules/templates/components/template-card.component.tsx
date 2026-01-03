import { TemplateResponse } from '@apps/shared/types/template.response';
import { Card } from '@components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface TemplateCardProps {
  template: TemplateResponse;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/templates/${template.id}`}>
      <Card className="h-full overflow-hidden transition-colors hover:bg-accent">
        <div className="relative aspect-square">
          <Image
            src={template.thumbnailsUrls[0]}
            alt={template.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </div>
        <div className="p-4 border-t border-border">
          <h3 className="font-medium">{template.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg">{template.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
