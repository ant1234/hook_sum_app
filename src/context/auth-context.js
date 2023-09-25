import React, { useState } from "react";

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {},
});

const AuthContextProvider = (props) => {

    const [loginState, setLoginState] = useState(false);

    const loginHandler = () => {
        setLoginState(true);
    };

    return (
    <AuthContext.Provider value={{login: loginHandler, isAuth: loginState}}>
        {props.children}
    </AuthContext.Provider>);
}; 

export default AuthContextProvider;
