import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    errorMsg: null,
    onLogout: () => { },
    onLogin: (email, password, loginType) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {

        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = (email, password, loginType) => {
        if (loginType === 'mainLogin') {
            if (email === 'rajkeerthi@react.com' && password === '1234567') {
                localStorage.setItem('isLoggedIn', '1');
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem('isLoggedIn');
                setErrorMsg("Invalid Credentials!");
                setIsLoggedIn(false);
            }
        } else {
            localStorage.setItem('isLoggedIn', '1');
            setIsLoggedIn(true);
        }


    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                errorMsg: errorMsg,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
