import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import testimonial from '../../../assets/images/testimonial/3.jpg';
import './testimonial.css';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
let data = [
    {
        "name": "Daniel Keystone",
        "designation": "Engineer",
        "msg": "It's freeing to be able to catch up on customized news and not be distracted by a social media element on the same site",
        "imgurl": testimonial
    },
    {
        "name": "Theo Sorel",
        "designation": "Software Engineer",
        "msg": " The simple and intuitive design makes it easy for me use. I highly recommend Fetch to my peers.",
        "imgurl": testimonial
    },
    {
        "name": "Theo Sorel",
        "designation": "Software Engineer",
        "msg": " The simple and intuitive design makes it easy for me use. I highly recommend Fetch to my peers.",
        "imgurl": testimonial
    }
]
let Testimonial = () => {
    return (
        <Carousel
            responsive={responsive}
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
        >
            

            {data.map((post, i) => {
                return (
                    <div key={i}>
                        <img src={testimonial} alt={testimonial} />
                        <div className="myCarousel">
                            <h3>{post.name}</h3>
                            <h4>{post.designation}</h4>
                            <p>
                                {post.msg}
                            </p>
                        </div>
                    </div>
                )
            })}



        </Carousel>
    );
}
export default Testimonial;