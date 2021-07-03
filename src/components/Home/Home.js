import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { restaurantsList } from '../Utils/Constants';
import homeBanner from './assets/homeBannerRed.jpg'
import './Home.css';
const Home = () => {
    return (
        <section className="homeSection">
            <Row className="homeRow">
                <Col xs={3} md={3} className="">
                    <div>
                        <img src={homeBanner} alt="foodLogo" className="homeBanner"></img>
                    </div>
                </Col>
                <Col xs={9} md={9} className="">
                    <div className="homeBannerText">Restaurants near you :</div>
                    <div className="homeCardsBox">
                        {restaurantsList.map((restaurant) =>
                            <Card>
                                <div className="menuIamgeContainer">
                                    <img src={process.env.PUBLIC_URL + '/images' + restaurant.restaurantLogo} alt="foodLogo" className="restaurantImage"></img>
                                </div>
                                <div className="restaurantName">{restaurant.restaurantName}</div>
                                <div><span className="restaurantNationality">{restaurant.restaurantNationality}</span> <span className="restaurantOffer">{restaurant.restaurantOffers} Off</span></div>
                                <div className="resLocale">{restaurant.restaurantLocality}</div>
                                <button className="orderBtn">Order now</button>
                            </Card>)}
                    </div>

                </Col>
            </Row>

        </section>
    );
};

export default Home;

const Card = styled.div`
  color: black;
  background: white;
  min-width: 11rem;
  margin-left: 2rem;
  height: 13rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;