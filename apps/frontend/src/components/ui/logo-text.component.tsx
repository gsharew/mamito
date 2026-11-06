import React from 'react';

// Mamito full logo (icon + wordmark). The wordmark is dark, so it sits on a
// light card to stay readable on the dark auth/billing backgrounds.
export const LogoTextComponent = () => {
  return (
    <div className="flex">
      <div className="bg-white rounded-[12px] px-[16px] py-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mamito-logo.png"
          alt="Mamito"
          className="h-[72px] w-auto block"
        />
      </div>
    </div>
  );
};
