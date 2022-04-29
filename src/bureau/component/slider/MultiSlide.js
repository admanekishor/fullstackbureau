import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import "./styles.css";
import service from '../../../assets/images/services/service-4.jpg';
import service1 from '../../../assets/images/services/service-5.jpg';
import service2 from '../../../assets/images/services/service-6.jpg';

export default function MultiSlide() {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
        }
      }
    return (
        <div>

            <div style={{ position: "relative" }}>
                <Carousel 
                responsive={responsive} 
                centerMode={true} 
                infinite={true} 
                autoPlay={true} 
                // centerMode={true}
                autoPlaySpeed={3000}
                itemClass="carousel-item-padding-40-px"
                >
                    <div ><img src={service} /> </div>
                    <div ><img src={service1} /> </div>
                    <div ><img src={service2} /> </div>
                    <div ><img src={service} /> </div>
                    <div ><img src={service1} /> </div>
                    <div ><img src={service2} /> </div>
                    <div ><img src={service} /> </div>
                    <div ><img src={service1} /> </div>
                    <div ><img src={service2} /> </div>
                </Carousel>
            </div>
        </div>
    );
}