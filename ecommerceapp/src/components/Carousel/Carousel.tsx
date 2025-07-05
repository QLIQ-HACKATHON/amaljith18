import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

import banner1 from "../../assets/main_banner_bg.png";
import banner2 from "../../assets/banner.png";

const CarouselSlider = () => {
  const banners = [banner2, banner1];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 500,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {banners.map((img, i) => (
          <img className="carousel-img" key={i} src={img} alt={`slide-${i}`} />
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlider;
