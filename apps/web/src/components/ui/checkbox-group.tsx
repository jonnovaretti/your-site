import * as React from 'react';

import { cn } from '@lib/utils';

const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-wrap items-center gap-2', className)}
    {...props}
  />
));
CheckboxGroup.displayName = 'CheckboxGroup';

type CheckboxGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type'
>;

const CheckboxGroupItem = React.forwardRef<
  HTMLInputElement,
  CheckboxGroupItemProps
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'h-4 w-4 rounded border border-primary text-primary shadow-sm accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
CheckboxGroupItem.displayName = 'CheckboxGroupItem';

export { CheckboxGroup, CheckboxGroupItem };
