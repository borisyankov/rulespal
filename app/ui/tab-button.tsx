import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';

type Props = {
  text: string;
  Icon: LucideIcon;
  href: string;
  isActive: boolean;
};
export default function TabButton({ text, Icon, href, isActive }: Props) {
  return (
    <div>
      <Link
        href={href}
        className="flex flex-row gap-2 rounded-md p-2 hover:bg-primary/25"
      >
        <Icon className="text-primary" />
        <span className="hidden font-semibold text-primary md:block">
          {text}
        </span>
      </Link>
      <div
        className={cn(
          'relative bottom-0 left-0 block h-1 w-full rounded-full',
          isActive && 'bg-primary',
        )}
      />
    </div>
  );
}
