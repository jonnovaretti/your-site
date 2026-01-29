'use client';

import { Container } from '@components/ui/container';
import {
  AngleDown,
  Building,
  Check,
  LaptopFile,
} from 'flowbite-react-icons/outline';
import { usePathname } from 'next/navigation';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  console.log(currentPath);

  return (
    <Container>
      <div className="flex flex-row">
        <ol className="flex w-full items-center justify-center gap-8 rtl:space-x-reverse">
          <li
            className={
              currentPath === '/app/sites'
                ? 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3 border-solid border-b-4 border-blue-300'
                : 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3'
            }
          >
            <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
              {currentPath === '/app/sites' ? <Building /> : <Check />}
            </span>
            <span>
              <h3 className="font-medium leading-tight">Company info</h3>
              <p className="text-sm">Talk about your company</p>
            </span>
          </li>
          <li
            className={
              currentPath.includes('templates')
                ? 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3 border-solid border-b-4 border-blue-300'
                : 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3'
            }
          >
            <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
              {currentPath.includes('editor') ? <Check /> : <LaptopFile />}
            </span>
            <span>
              <h3 className="font-medium leading-tight">Template</h3>
              <p className="text-sm">Define your site structure</p>
            </span>
          </li>
          <li
            className={
              currentPath.includes('editor')
                ? 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3 border-solid border-b-4 border-blue-300'
                : 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3'
            }
          >
            <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.35709 16V5.78571c0-.43393.34822-.78571.77777-.78571H18.5793c.4296 0 .7778.35178.7778.78571V16M5.35709 16h-1c-.55229 0-1 .4477-1 1v1c0 .5523.44771 1 1 1H20.3571c.5523 0 1-.4477 1-1v-1c0-.5523-.4477-1-1-1h-1M5.35709 16H19.3571M9.35709 8l2.62501 2.5L9.35709 13m4.00001 0h2"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Edit design</h3>
              <p className="text-sm">Customize your site</p>
            </span>
          </li>
        </ol>
      </div>
      <div className="space-y-10 pb-10">{children}</div>
    </Container>
  );
}
