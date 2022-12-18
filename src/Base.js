import {useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import {StoreContext} from './Providers/Store';
import Modal from './components/Modal.js';
import ModalIncription from './components/ModalIncription.js';
import Deconnexion from './components/Deconnexion.js';
import Map from './Map';

export default function Base() {

  const {setArticlesStore, articlesStore, setTokenStore, tokenStore} = useContext(StoreContext)
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [categorie, setCategorie] = useState("")

  useEffect(() =>{
    loadArticles()
    loadCategories()
  },[])


  function loadArticles(){
    fetch('http://edu.project.etherial.fr/articles').then((res) => {
      res.json().then((json) =>{
          setArticles(json.data)
          setArticlesStore([...json.data])
      })
    })
  }

  function loadCategories(){
    fetch('http://edu.project.etherial.fr/articles/categories').then((res) => {
      res.json().then((json) =>{
        setCategories(json.data)
      })
    })
  }

  function chooseCategorie(variable){
    setCategorie(variable)
  }

  return (
    <div>
        {tokenStore && <Map />}
        {!tokenStore && <ModalIncription />}
        {!tokenStore && <Modal />}
        <div className="flex flex-row justify-center p-4">
          {
            tokenStore && 
            <Link to="/articles/createArticle">
              <h3 className="hover:bg-gray-600 bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Create Article</h3>
            </Link>
          }
          {
            tokenStore && 
            <Link to="/articles/updateAccount">
              <h3 className="hover:bg-gray-600 bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Update Account</h3>
            </Link>
          }
          {
            tokenStore && 
            <Link to="/articles/updatePassword">
              <h3 className="hover:bg-gray-600 bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Update Password</h3> 
            </Link>
          }
          {
            tokenStore && 
            <Link to="/map">
              <h3 className="hover:bg-gray-600 bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Map</h3> 
            </Link>
          }
          {tokenStore && <Deconnexion />}
        </div>

        <div className="flex flex-col justify-center">
          <label for="categories"></label>
          <select name="categories" id="categories"  onChange={(e) => {
                  chooseCategorie(e.target.value)
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
          <option value="">Choose a categorie</option>
            {
              categories.map((categorie, index) =>{
                return(
                  <option value={ categorie.id}>{ categorie.name}</option>
                )
              })
            }
          </select>
            {
              articlesStore.map((article, index) => {  
                if(categorie == article.ArticleCategory.id){
                  return(
                    <Link to="/articles/detail" state={{article : article }}>
                      <p className="text-white text-base">{ article.content }</p>
                    </Link>
                  )
                }else if( !categorie.length ){
                  return(
                    <Link to="/articles/detail" state={{article : article }}>
                      <p className="text-white text-base">{ article.content }</p>
                    </Link>
                  )
                }
              })
            } 
        </div>
    </div>

  );
}

