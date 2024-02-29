import lightWave from "public/lightgreenwave.svg";
import mediumWave from "public/mediumgreenwave.svg";
import darkWave from "public/darkgreenwave.svg";
import Image from "next/image";

export default function GreenWaves() {
  return (
    <span className="-z-10">
      <div className="h-1/5 m-0 relative overflow-hidden">
        <Image
          src={lightWave}
          className="filter drop-shadow-wave fixed left-0 bottom-0 w-screen"
          alt="decorative green waves"
        />
      </div>

      <div className="h-1/5 m-0 relative overflow-hidden">
        <Image
          src={mediumWave}
          className="filter drop-shadow-wave fixed left-0 right-0 bottom-0 w-screen"
          alt="decorative green waves"
        />
      </div>

      <div className="h-1/5 m-0 relative overflow-hidden">
        <Image
          src={darkWave}
          className="filter drop-shadow-wave fixed left-0 bottom-0 w-screen"
          alt="decorative green waves"
        />
      </div>
    </span>
  );
}