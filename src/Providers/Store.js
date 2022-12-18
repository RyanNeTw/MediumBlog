import { createContext, useEffect, useState} from "react";

export const StoreContext = createContext()

export function StoreProvider(props){

    const [articlesStore, setArticlesStore] = useState([])
    const [tokenStore, setTokenStore] = useState([])
    const [coords, setCoords] = useState([])

    useEffect(()=>{
        setTokenStore(localStorage.getItem('token'))  
    },[])

    return(
        <StoreContext.Provider value={{
            articlesStore: articlesStore, 
            setArticlesStore: setArticlesStore,
            setTokenStore: setTokenStore,
            tokenStore: tokenStore,
            coords: coords,
            setCoords: setCoords,
        }}>
            {props.children}
        </StoreContext.Provider>
    )

}