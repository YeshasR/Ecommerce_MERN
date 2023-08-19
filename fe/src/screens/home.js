import Footer from '../components/footer';
import Header from '../components/header';
import Logo from '../assests/logo.png';
import Homebg from '../assests/homebg.jpg';
import '../styles/Home.css';
import Slider from '../components/slider';

function Home() {
    const addtocartHandler = () => {
        alert('Item added to cart');
    }
    return (
        <div className="Home">
            <Header />
            <div className="HomeCover">
                <img src={Homebg} alt="Homepage" id="homepagebg" />
                <img src={Logo} alt="logo of website" id="logohomepage" />
                <div className="text-center"><span id="brandmoto">"Shop Your Dreams, Unveil Your Style: Your Ultimate Fashion Destination!"</span></div>
            </div>

            {/* SLIDER */}
            <Slider add={addtocartHandler} />
            <Footer />
        </div>
    )
}

export default Home;