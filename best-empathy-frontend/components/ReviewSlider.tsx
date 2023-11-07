import React, { useEffect, useState } from "react";
import review1 from "../assets/images/signup/reviews/reviewer-1-rodrigo-dos-reis.jpg";
import review2 from "../assets/images/signup/reviews/reviewer-2-shipman-northcutt.jpg";
import review3 from "../assets/images/signup/reviews/reviewer-3-michelle-dam.jpg";
import review4 from "../assets/images/signup/reviews/reviewer-4-chiebuka-oganihu.jpg";
import review5 from "../assets/images/signup/reviews/reviewer-5-michael-tran.jpg";
import review6 from "../assets/images/signup/reviews/reviewer-6-phillip-rosenberg.jpg";
import review7 from "../assets/images/signup/reviews/reviewer-7-precious-ahabueze.jpg";
import review8 from "../assets/images/signup/reviews/reviewer-8-abdulluah-shankar.jpg";
import review9 from "../assets/images/signup/reviews/reviewer-9-maddy-zhang.jpg";
import review10 from "../assets/images/signup/reviews/reviewer-10-lucy-collins.jpg";

import Card from "./Card";
import Slider from "react-slick";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { progress } from "framer-motion";

const data = [
  { img: review1 },
  { img: review2 },
  { img: review3 },
  { img: review4 },
  { img: review5 },
  { img: review6 },
  { img: review7 },
];

const NextArrow = ({ onClick }) => {
  return (
    <div
      className=" -bottom-[110px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-[50px]"
      onClick={onClick}
    >
      <div className="bg-[#fab1a0] h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer">
        <BsChevronRight />
      </div>
    </div>
  );
};
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="-bottom-[110px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-[-50px]"
      onClick={onClick}
    >
      <div className="bg-[#fab1a0] h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer">
        <BsChevronLeft />
      </div>
    </div>
  );
};

const ReviewSlider = () => {
  const [progress, setProgress] = useState(4);
  const [slideToShow, setSlideToShow] = useState(4);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(3);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 650) {
      setSlideToShow(1);
    }
  };

  useEffect(() => {
    setSlides();
    setProgress(100 / (data.length - slideToShow + 1));
    window.addEventListener("resize", () => {
      setSlides();
    });
  }, []);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (current) => {
      setProgress((100 / (data.length - slideToShow + 1)) * (current + 1));
      console.log(slideToShow);
    },
  };
  return (
    <div className="relative">
      <Slider {...settings}>
        {data.map((reviewer_img, index) => (
          <Card key={index} img={reviewer_img.img} />
        ))}
      </Slider>

      <div className="h-[2px] bg-gray-300 w-[250px] absolute -bottom-[20px]   left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="bg-[#fab1a0] absolute h-[100%] transition-all"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ReviewSlider;
