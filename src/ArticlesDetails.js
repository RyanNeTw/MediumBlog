import { useLocation, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react' 


export default function ArticlesDetails() {

  let location = useLocation()
  let navigate = useNavigate()
  let [article, setArticle] = useState([])


  useEffect(() => {

    if (location && location.state && location.state.article) {
        setArticle(location.state.article)
    } else {
        navigate("/articles")
    }

}, [])
  console.log(article)

  return (
    <div>
      {article.content} 
    </div>

  );
}

