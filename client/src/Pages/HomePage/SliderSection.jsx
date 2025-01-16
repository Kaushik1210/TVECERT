import React from "react";
import image from "../../Assets/dummy";
import "./slidersection.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const SliderSection = () => {
  return (
    <div className="slider-container  flex flex-col items-center  max-md:mx-0">
      <h1 className="slider-title">What We Do</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 3000 }} // Autoplay delay in milliseconds
        initialSlide={2}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 10,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]} // Add Autoplay module here
        className="mySwiper"
      >
        <SwiperSlide className="slide">
          <img src={image.slider1} alt="Exemplar Global" />
          <p className="slide-title">Exemplar Global</p>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={image.slider2} alt="Quality Management Systems" />
          <p className="slide-title">Quality Management Systems</p>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img
            src={image.slider3}
            alt="Occupational Health & Safety Management Systems"
          />
          <p className="slide-title">
            Occupational Health & Safety Management Systems
          </p>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={image.slider4} alt="Environmental Management Systems" />
          <p className="slide-title">Environmental Management Systems</p>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={image.slider5} alt="Food Safety Management Systems" />
          <p className="slide-title">Food Safety Management Systems</p>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={image.slider6} alt="CQI & IRCA" />
          <p className="slide-title">CQI & IRCA</p>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img
            src={image.slider7}
            alt="Information Security Management Systems"
          />
          <p className="slide-title">
            Information Security Management Systems
          </p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderSection;
