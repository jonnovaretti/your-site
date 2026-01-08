'use client';

import { Container } from '@components/ui/container';
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
              currentPath === '/sites/new'
                ? 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3 border-solid border-b-4 border-blue-300'
                : 'flex items-center text-body space-x-3 rtl:space-x-reverse p-3'
            }
          >
            <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
              {currentPath === '/sites/new' ? (
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
                    d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
                  />
                </svg>
              ) : (
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
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              )}
            </span>
            <span>
              <h3 className="font-medium leading-tight">Company info</h3>
              <p className="text-sm">Talk about your company</p>
            </span>
          </li>
          <li
            className={
              currentPath === '/sites/new/templates'
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
                  fill="currentColor"
                  d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                />
              </svg>
            </span>
            <span>
              <h3 className="font-medium leading-tight">Template</h3>
              <p className="text-sm">Define your site structure</p>
            </span>
          </li>
          <li className="flex items-center text-body space-x-3 rtl:space-x-reverse">
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
