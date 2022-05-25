import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsUserAuthenticated } from "../redux/slices/userAuthenticationSlice";
import { setUserFavoritesIndicator } from "../redux/slices/userFavoritesIndicatorSlice";

export function Logout() {
    const dispatch = useDispatch();
    useEffect(() => {
        AsyncStorage.removeItem("auth").then(()=> {}).catch((e) => {});
        AsyncStorage.removeItem("indicator").then(()=> {}).catch((e) => {});
        dispatch(setIsUserAuthenticated(false));
        dispatch(setUserFavoritesIndicator(0));
    })

    return (<></>);
}
