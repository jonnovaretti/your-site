import { TemplateResponse } from '@apps/shared/types/template-response';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { toast } from '@hooks/use-toast';
import { apiClient } from '@lib/api-client';
import { getIndustryText } from '@lib/industries-options';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import router from 'next/router';

interface TemplateCardProps {
  template: TemplateResponse;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const searchParams = useParams();
  const siteId = searchParams.siteId;

  console.log(searchParams);

  const selectTemplate = useMutation({
    mutationFn: (templateId: number) =>
      apiClient.put(`/sites/${siteId}/templates`, {
        templateId,
      }),
    onSuccess: response => {
      toast({
        title: 'Move user to templates',
        description: 'Your profile has been successfully updated.',
      });
      router.push(`/app/sites/${response.data.data}/editor`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    },
  });

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
          <div className="flex-none w-60">
            <h3 className="font-medium">{template.name}</h3>
          </div>
          <div className="flex-2">
            <Link href={template.url}>
              <Badge className="m-1 bg-green-200 text-black-800 hover:bg-blue-200">
                View demo
              </Badge>
            </Link>
          </div>
          <div className="flex-1">
            <Badge
              onClick={() => selectTemplate.mutate(template.id)}
              className="m-1 bg-green-200 text-black-800 hover:bg-blue-200"
            >
              Select
            </Badge>
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
