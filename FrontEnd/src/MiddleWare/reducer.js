import { useEffect } from "react";

export const initialState = {
    login: null,
    usertype: null,
    UserName: null,
};
export const reducer = (state, action) => {
    if (action.type === "USER") {
        return {
            ...state,
            login: action.payload.login,
            usertype: action.payload.usertype,
            UserName: action.payload.UserName,
        };
    }
    return state;
}
