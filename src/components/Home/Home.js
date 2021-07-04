import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import BaseServices from "./services/Baseservices";
import { restaurantsList } from '../Utils/Constants';
import Loader from "react-loader-spinner";
import homeBanner from './assets/homeBannerRed.jpg'
import SorryImage from '../Home/assets/sorryClosed.jpg'
import './Home.css';
import { useState } from 'react';
const Home = () => {
    const [loading, setLoading] = useState(false);
    const [menuPage, setMenuPage] = useState(false);
    const [menuObject, setMenuObject] = useState({});
    const [orderedRestaurant, setOrderedRestaurant] = useState(null);

    const orderPageHandler = async (restaurant) => {
        setLoading(true);
        // Service Call to Menu LIst
        const restaurantValue = await BaseServices.GetMenuList(restaurant.restaurantId);
        setOrderedRestaurant(restaurantValue.restaurantName);
        setMenuObject(restaurantValue);
        setLoading(false);
        setMenuPage(true);
    };

    const backtoRestaurant = () => {
        setMenuPage(false);
    };



    return (
        <section className="homeSection">
            {loading && <LoaderContainer>
                <Loader
                    type="Bars"
                    color="brown"
                    height={100}
                    width={100}
                />
            </LoaderContainer>
            }

            <Row className="homeRow">
                <Col xs={3} md={3} className="">
                    <div>
                        <img src={homeBanner} alt="foodLogo" className="homeBanner"></img>
                    </div>
                </Col>
                {!loading && !menuPage ?
                    <Col xs={9} md={9} className="">
                        <div className="homeBannerText">Restaurants near you :</div>
                        <div className="homeCardsBox">
                            {restaurantsList.map((restaurant) =>
                                <Card key={restaurant.restaurantId}>
                                    <div className="menuIamgeContainer">
                                        <img src={process.env.PUBLIC_URL + '/images' + restaurant.restaurantLogo} alt="foodLogo" className="restaurantImage"></img>
                                    </div>
                                    <div className="restaurantName">{restaurant.restaurantName}</div>
                                    <div><span className="restaurantNationality">{restaurant.restaurantNationality}</span> <span className="restaurantOffer">{restaurant.restaurantOffers} Off</span></div>
                                    <div className="resLocale">{restaurant.restaurantLocality}</div>
                                    <button className="orderBtn" value={restaurant} onClick={() => orderPageHandler(restaurant)}>Order now</button>
                                </Card>)}
                        </div>

                    </Col> : menuPage &&
                    <Col xs={9} md={9} className="">
                        <button className="restaurantBtn" onClick={backtoRestaurant}>Go to Restaurant List</button>
                        {menuObject.menuItems.length > 0 ?
                            <>
                                <div className="homeBannerText">{orderedRestaurant} has below Menu Items : </div>
                                <div className="homeCardsBox">
                                    {menuObject.menuItems.map((menu) =>
                                        <Card key={menu.MenuId}>
                                            <div className="menuIamgeContainer">
                                                <img src={process.env.PUBLIC_URL + '/images/menuItems/' + menu.menuLogo} alt="foodLogo" className="restaurantImage"></img>
                                            </div>
                                            <div className="restaurantName">{menu.MenuName}</div>
                                            <div><span className="restaurantNationality">{menu.MenuNationality}</span></div>
                                            <button className="orderBtn">Add to cart</button>
                                        </Card>)}
                                </div></> : <div className="errorCardsBox">
                                <div><img src={SorryImage} alt="SorryImage"></img>
                                    <div style={{ marginTop: "7%" }}>Currently We are Not Serving! Sorry for the inconvinience </div></div>
                            </div>}

                    </Col>
                }
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
const LoaderContainer = styled.div`
    position: absolute;
    margin-left: 60%;
    margin-top: 14%;
`;