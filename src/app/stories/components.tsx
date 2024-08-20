'use client';

function BackgroundGrid() {
  return (
    <>
      <div
        className="w-full h-[70vh] absolute bg-center bg-[length:64px_64px] md:bg-[length:128px_128px]"
        style={{
          backgroundImage: `linear-gradient(to right, #8b8b8b49 1px, transparent 1px), linear-gradient(to bottom, #8b8b8b49 1px, transparent 1px)`,
        }}
      />
      <div className="w-full h-[70vh] absolute bg-gradient-to-t from-light via-[#fff0] to-[#fff0] dark:from-bgdark dark:via-[#24242400] dark:to-[#24242400]" />
    </>
  );
}

export { BackgroundGrid };
