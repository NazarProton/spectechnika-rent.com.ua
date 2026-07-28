import Image from "next/image";

export function BrandLogo() {
  return (
    <Image
      src="/brand/logo-full-transparent.png"
      width={1420}
      height={318}
      alt="Spectehnika Rent"
      priority
      className="h-9 w-auto object-contain sm:h-12"
    />
  );
}
