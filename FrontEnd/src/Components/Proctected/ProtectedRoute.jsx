import React from "react";
import { userContext } from "../../App";
import AccessDeniedPage from "../AcessDenied";

function ProtectedComponent({ children }) {
    const { state } = React.useContext(userContext);
    console.log(state);
    if (state.usertype === ' ') {
        return <AccessDeniedPage />;
    } else {
        return children;
    }
}
export default ProtectedComponent;