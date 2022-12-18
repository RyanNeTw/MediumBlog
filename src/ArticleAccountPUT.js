import {useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import {StoreContext} from './Providers/Store';
import Map from './Map';

export default function ArticleAccountPUT(){

    useEffect(()=>{

    },[])

    const {setArticlesStore, articlesStore, setTokenStore, tokenStore} = useContext(StoreContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function updateArticle(data){
        const birthdate = new Date(data.birthdate)
        fetch('http://edu.project.etherial.fr/users/me', {  
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }, 
            body: JSON.stringify({
                firstname: data.fistname,
                lastname: data.lastname,
                birthdate: birthdate.toISOString(),
            })
          }).then((res) => {
            res.json().then((json) =>{
                navigate("/articles");
            })
           })
    }

    const onSubmit = data => updateArticle(data);

    return(
        <div>
            {tokenStore && <Map />}
            <h1 className="text-white text-3xl p-4">Modifier son compt</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="py-6 px-6 lg:px-8 flex flex-col gap-4">
                <input placeholder="Firstname" {...register("fistname", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                {errors.fistname && <span>This field is required</span>}

                <input placeholder="Lastname" {...register("lastname", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                {errors.lastname && <span>This field is required</span>}

                <input placeholder="Birthdate" type="date" {...register("birthdate", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                {errors.birthdate && <span>This field is required</span>} 
                
                <input type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
            </form>
        </div>
    )
}