'use client';

// Mamito icon used in the sidebar and compact layouts.
export const Logo = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/mamito-icon.png"
      alt="Mamito"
      width={60}
      height={60}
      className="mt-[8px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] object-contain"
    />
  );
};
