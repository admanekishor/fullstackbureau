import AwesomeSlider from "react-awesome-slider";
// import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import banner from "../../../assets/images/banners/4.jpg";
import banner1 from "../../../assets/images/banners/5.jpg";
import './Slidestyle.css';



const AutoplaySlider = withAutoplay(AwesomeSlider);


let HomeSlider = () => {
    // const startupScreen = (
    //     <div>
    //         <img src="/path/to/image-loader.png" />
    //     </div>
    // );

    return (
        <AutoplaySlider
            className="slider"
            play={true}
            interval={3000}
            bullets={false}
        >
            <div
                data-src={banner}
                className="image__description"
            >
              <div className="image_text">
              <h2>In Home Care That <br/>  Elevates the Human Spirit</h2>
                <p>The care you need in the place you want. Discover the difference Visiting Angels will make in the life of your loved one.</p>
              </div>
            </div>
            <div
                data-src={banner1}
                className="image__description"
            >
               <div className="image_text">
               <h2>Quality Home Care Service, <br/>You Can Trust Blindly</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry.</p>
               </div>
            </div>

        </AutoplaySlider>
    );


}
export default HomeSlider;