import React from "react";
import { userContext } from "../../App";
import LoginPage from "../Login/Login";

function LoginRequired({ children }) {
    const { state } = React.useContext(userContext);
    console.log(state);
    if (state.usertype === null) {                 
        window.location.href = '/Login';

    } else {
        return children;
    }
}
export default LoginRequired;