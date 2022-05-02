import Header from "./template/Header/Header";
import Footer from './template/Footer';
// import bureau from './assets/css/Custom.module.css';
import '../assets/css/layout.scss';
import { Container } from "react-bootstrap";
let NotFoundPage = () =>{
    return(
        <div>
            <Header/>
            <div className="aboutsection">
                <Container className="aboutbreadCrumb">
                    <h1>Page Not Found</h1>
                    <p>Home / About</p>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}
export default NotFoundPage;