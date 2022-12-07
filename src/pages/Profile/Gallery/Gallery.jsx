import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./style.scss";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation
} from "swiper/core";
import { Link } from "react-router-dom";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

export default function Gallery({ profile }) {

  if (!profile) return <p>Loading...</p>
  return (
    <div className="container " id="container">
      <div className="title_wrapper">
        <div className="title_">
          <span>{profile.username}</span> Images
        </div>
      </div>
      <Swiper
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        pagination={{
          clickable: true
        }}
        className="mySwiper"
      >
        {profile.images.map(image => <SwiperSlide key={image.image}  >
          <Link to={`/image/${image.image}`}>
            <img src={image.image} alt={image.image} />
          </Link>
        </SwiperSlide>)}
      </Swiper>
    </div>
  );
}
