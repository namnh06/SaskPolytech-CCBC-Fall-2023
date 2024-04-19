import { BoltIcon } from '@heroicons/react/24/outline';
import { martelsans } from '@/app/ui/fonts';

export function FlashXLogo() {
  return (
    <div
      className={`${martelsans.className} flex flex-row items-center leading-none text-white`}
    >
      <BoltIcon className="h-12 w-12 rotate-[15deg]" />
      <h1 className="text-[44px]">FlashYXE</h1>
    </div>
  );
}

export function FlashXLogoNoIcon() {
  return (
    <div
      className={`${martelsans.className} flex flex-row items-center leading-none text-white`}
    >
      <h1 className="text-[44px]">FlashYXE</h1>
    </div>
  );
}
