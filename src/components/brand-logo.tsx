import Image from "next/image";

export function BrandLogo() {
  return (
    <Image
      src="/brand/logo-full-transparent.png"
      width={1472}
      height={374}
      alt="Spectehnika Rent"
      priority
      className="h-9 w-auto object-contain sm:h-12"
    />
  );
}
