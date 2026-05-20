export function FloatingOrb() {
  return (
    <div className="fixed bottom-12 right-12 z-40 pointer-events-none hidden md:block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pages/home/orb.svg"
        alt=""
        width={80}
        height={80}
        className="opacity-70"
      />
    </div>
  );
}
