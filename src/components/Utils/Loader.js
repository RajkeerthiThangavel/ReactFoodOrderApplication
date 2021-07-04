import * as React from "react";
import Lottie from "react-lottie";
import animationData from "./assets/9192-loader.json"

export const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData
}
export const Loading = (props) => {
    const { width = 100, height = 100 } = props;
    return <Lottie width={width} height={height} options={loaderOptions}/>;
};