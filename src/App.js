import './App.css';
import Base from './Base.js'    
import ArticlesDetails from './ArticlesDetails.js'   
import CreateArticle from './CreateArticle.js'
import ArticleAccountPUT from './ArticleAccountPUT.js'; 
import ArticleAccountPUTPAssword from './ArticleAccountPUTPAssword.js';
import Map from './Map.js';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import {StoreProvider} from "./Providers/Store"

function App() {

  
  return (
    <div className="App bg-gray-800 min-h-screen">
        <StoreProvider>
          <BrowserRouter>
            <Routes>
            <Route path="/map" element={<Map />}></Route> 
            <Route path="/" element={<Base />}></Route>
            <Route path='/articles/detail' element={<ArticlesDetails />}></Route>
            <Route path='/articles/createArticle' element={<CreateArticle />}></Route>
            <Route path='/articles/updateAccount' element={<ArticleAccountPUT />}></Route> 
            <Route path='/articles/updatePassword' element={<ArticleAccountPUTPAssword />}></Route>  
            </Routes>
          </BrowserRouter>
        </StoreProvider>
    </div>
  );
}

export default App;
