import "./Landingpage.css";
import travel_01 from "../../assets/travel-01.jpg";
import travel_02 from "../../assets/travel-02.jpg";
import travel_03 from "../../assets/travel-03.jpg";
import Headers from "./Headers";
import Hero from "./Hero";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import Kosong from "../helper/Kosong";
import Footer from "../footer/Footer";

function Landingpage(){
    let navigate = useNavigate();
    const navbarLinks = [
        { navigate: "/", title: "Home" },
        { navigate: "#", title: "About Us" },
        { navigate: "/login", title: "Login" },
    ];

    return(
    <>
        
        <div className="landing-page">
            <Headers navbarLinks = {navbarLinks} />
            <Hero imageSrc = { travel_01 } /> 
            <Slider imageSrc = { travel_02 }
                title = { "Be an explorer." }
                subtitle = { "Our platform offers a wide variety of unique travel locations!" }/> 
            <Slider imageSrc = { travel_03 }
                title = { "Memories for a lifetime." }
                subtitle = { "Your dream vacation is only a few clicks away." }
                flipped = { true } />
        </div>
    <Kosong />
    <Footer/>
    </>
        
    )
}

export default Landingpage;