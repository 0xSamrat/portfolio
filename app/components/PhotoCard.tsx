import Image from "next/image";

export function PhotoCard() {
  return (
    <div className="photo-wrap">
      <div className="photo-card">
        <div className="photo-slot">
          <Image
            src="/photo.jpg"
            alt="Samrat Mukherjee, AI engineer, Bengaluru"
            width={640}
            height={800}
            priority
            sizes="(max-width: 400px) 230px, (max-width: 640px) 260px, (max-width: 820px) 280px, 320px"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div className="photo-cap">
          <span className="name">Samrat Mukherjee</span>
          <span>BLR · 2026</span>
        </div>
      </div>

      <div className="floater f1">
        <span className="pulse-d" aria-hidden="true" />
        <span>Agents in production</span>
      </div>
      <div className="floater f2">
        <span className="f-val">88%</span>
        <span>answer coverage</span>
      </div>
    </div>
  );
}
