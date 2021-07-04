// import axios from "axios";
// import { getMenuList } from "./services";
import { restaurantsList } from '../../Utils/Constants';

export const GetMenuList = (restaurantId) => {
    let restaurantMenu = restaurantsList.find(element => element.restaurantId === restaurantId);
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(restaurantMenu)
        }, 2000)
    });
}

export default {
    GetMenuList
};

// Later Axios Implementation


//Configure Url Later in .envdev1//dev2//production

//const api = process.env.REACT_APP_FOOD_API;

// const getHeaders = (headers = {}) => ({
//     "content-Type": "application/json",
//     Authorization: window.localStorage.getItem(),
//     ...headers
// });

// export const GetMenuList = (restaurantId) =>{
//     setTimeout(
//         function() {
//             return restaurantsList;
//         },
//         3000
//     );
// }
// const GetMenuList = new Promise((resolve, reject) => {
//     if (restaurantsList) {
//         resolve(restaurantsList);
//     } else {
//         reject(Error("Promise rejected"));
//     }

// });

// export const GetMenuList = (restaurantId) =>{
//    axios.get(`${api}${getMenuList}`,{headers: getHeaders()});
// }