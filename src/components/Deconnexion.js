import {useState, useEffect, useContext } from "react";
import {StoreContext} from '../Providers/Store';

export default function deconnexion(){

    const {setTokenStore, tokenStore} = useContext(StoreContext)

    function disconnect(){
        setTokenStore(localStorage.removeItem("token"))
    }



    return(
        <button onClick={()=> disconnect()} className="hover:bg-gray-600 bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            Déconnexion
        </button>
    )
}