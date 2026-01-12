import { TemplateResponse } from '@apps/shared/types/template-response';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { getIndustryText } from '@lib/industries-options';
import Image from 'next/image';
import router from 'next/router';

interface TemplateCardProps {
  template: TemplateResponse;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden transition-colors hover:bg-accent">
      <div className="relative aspect-square p-10">
        <Image
          src={template.thumbnailsUrls[0]}
          alt={template.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
      </div>
      <div className="p-3 border-t border-border">
        <div className="flex flex-cols">
          <div className="flex-none w-72">
            <h3 className="font-medium">{template.name}</h3>
          </div>
          <div className="flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(template.url)}
            >
              View demo
            </Button>
          </div>
        </div>
        <div className="p-2 items-center justify-between">
          {template.industries?.map(industry => {
            return (
              <Badge
                key={industry}
                className="m-1 bg-purple-100 text-purple-800 hover:bg-purple-100"
              >
                {getIndustryText(industry)}
              </Badge>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
