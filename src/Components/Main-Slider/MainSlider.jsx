import Slider from "react-slick";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MainSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="absolute bottom-6 w-full flex justify-center">
        <ul className=" flex justify-center items-center space-x-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-8 bg-gray-100 rounded-lg overflow-hidden">
        <Slider {...settings}>
          <div>
            <img src={slider1} alt="Slide 1" className="w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover rounded-lg" />
          </div>
          <div>
            <img src={slider2} alt="Slide 2" className="w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover rounded-lg" />
          </div>
          <div>
            <img src={slider3} alt="Slide 3" className="w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover rounded-lg" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </div>
  );
}
