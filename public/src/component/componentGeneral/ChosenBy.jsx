import imgRectangle5242 from "../../assets/rectangle-5242.png";
import imgRectangle5243 from "../../assets/rectangle-5243.png";
import imgRectangle5244 from "../../assets/rectangle-5244.png";
import imgRectangle5245 from "../../assets/rectangle-5245.png";
import imgRectangle5246 from "../../assets/rectangle-5246.png";
import imgRectangle5247 from "../../assets/rectangle-5247.png";
import imgRectangle5248 from "../../assets/rectangle-5248.png";
import imgRectangle5249 from "../../assets/rectangle-5249.png";
import imgRectangle5250 from "../../assets/rectangle-5250.png";
import imgRectangle5251 from "../../assets/rectangle-5251.png";
import imgRectangle5252 from "../../assets/rectangle-5252.png";
import imgRectangle5253 from "../../assets/rectangle-5253.png";
import imgRectangle5254 from "../../assets/rectangle-5254.png";
import imgRectangle5255 from "../../assets/rectangle-5255.png";
import imgRectangle5256 from "../../assets/rectangle-5256.png";
import imgRectangle5257 from "../../assets/rectangle-5257.png";
import imgRectangle5258 from "../../assets/rectangle-5258.png";
import imgRectangle5259 from "../../assets/rectangle-5259.png";
import DownloadCompanyProfile from "./DownloadCompanyProfile.jsx";

const images = [
  imgRectangle5242,
  imgRectangle5243,
  imgRectangle5244,
  imgRectangle5245,
  imgRectangle5246,
  imgRectangle5247,
  imgRectangle5248,
  imgRectangle5249,
  imgRectangle5250,
  imgRectangle5251,
  imgRectangle5252,
  imgRectangle5253,
  imgRectangle5254,
  imgRectangle5255,
  imgRectangle5256,
  imgRectangle5257,
  imgRectangle5258,
  imgRectangle5259,
];

export default function ChosenBy() {
  return (
    <div className="content-stretch flex flex-col gap-6 items-center relative size-full">
      <div className="content-stretch flex flex-col gap-1.5 items-center leading-[normal] not-italic relative shrink-0 text-center w-full max-w-121.25 pt-6 pb-12">
        <p
          className="bg-clip-text bg-linear-to-r from-[#4e52fb] relative shrink-0 text-4xl md:text-5xl to-[#20acf7] w-full"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          CHOSEN BY
        </p>
        <p className="relative shrink-0  text-white w-full">
          155.000+ professionals and businesses.
        </p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {images.map((src, index) => (
          <div
            key={index}
            className="h-42.25 w-50 relative rounded-xl shrink-0"
          >
            <img
              alt={`gallery image ${index + 1}`}
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-xl size-full"
              src={src}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center py-11.75 justify-center">
        <DownloadCompanyProfile />
      </div>
    </div>
  );
}
