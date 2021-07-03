import { Container, Row, Col } from 'react-bootstrap';
import foodBanner from './assets/images/foodLoginBanner.jpg'
import LoginForm from '../LoginForm/LoginForm';
import  "./Login.css";

const Login = () =>{
    return(
    <>
        <Container>
            <Row className="loginRow">
                <Col xs={6} md={6} className="loginBanner">
                    <div>
                        <img src={foodBanner} alt="foodLogo" className="foodBanner"></img>
                    </div>
                </Col>
                <Col xs={6} md={6} className="loginForm">
                    <LoginForm/>
                </Col>
            </Row>
        </Container>
    </>);
};

export default Login;