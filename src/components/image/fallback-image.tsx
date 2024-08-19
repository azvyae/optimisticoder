'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
interface FallbackImageProps extends ImageProps {
  fallback: string | StaticImport;
}
const FallbackImage = ({
  alt,
  src,
  fallback,
  ...props
}: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <Image
      alt={alt}
      {...props}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export { FallbackImage };
