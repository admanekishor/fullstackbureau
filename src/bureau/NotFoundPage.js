import Header from "./Header/Header";
import Footer from './Footer';
import bureau from './assets/css/Custom.module.css';
import { Container } from "react-bootstrap";
let NotFoundPage = () =>{
    return(
        <div>
            <Header/>
            <div className={bureau.aboutsection}>
                <Container className={bureau.aboutbreadCrumb}>
                    <h1>Page Not Found</h1>
                    <p>Home / About</p>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}
export default NotFoundPage;