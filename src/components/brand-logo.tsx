import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex items-center gap-4" aria-label="Spectehnika Rent">
      <Image
        src="/brand/logo-excavator.png"
        width={145}
        height={74}
        alt=""
        priority
        className="h-9 w-auto object-contain sm:h-12"
      />
      <div className="min-w-0">
        <div className="h-1 w-full bg-zinc-950" />
        <div className="flex items-baseline pt-1 font-black italic leading-none tracking-normal">
          <span className="text-[13px] text-zinc-950 sm:text-[17px] md:text-[20px]">SPECTEHNIKA</span>
          <span className="pl-1 text-[13px] text-[#f2b705] sm:text-[17px] md:text-[20px]">RENT</span>
        </div>
        <div className="mt-1 h-1 w-full skew-x-[-28deg] bg-[#f2b705]" />
      </div>
    </div>
  );
}
