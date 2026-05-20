import { LOGOS } from "@/data/content";

export function LogosMarquee() {
  // Duplicate the set so the -50% translate loop is seamless.
  const track = [...LOGOS, ...LOGOS];
  return (
    <section
      id="logos"
      className="relative text-white h-fit py-12 section-px flex flex-col items-center justify-center scroll-mt-25"
    >
      <div className="section-container relative overflow-hidden mask-fade-x">
        <div className="logos-marquee flex items-center gap-16 w-max">
          {track.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              loading="lazy"
              decoding="async"
              alt={`Logo ${(i % LOGOS.length) + 1}`}
              className="h-8 w-auto object-contain shrink-0"
              src={src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
