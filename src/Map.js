import {useState, useEffect, useContext } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {StoreContext} from './Providers/Store';
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

const socket = io("http://edu.project.etherial.fr")

export default function map(){

    const {setTokenStore, tokenStore, coords, setCoords} = useContext(StoreContext)
    const [locationGPS, setLocation] = useState({})
    const [styleMap, setStyleMap] = useState({})
    const locationUrl = useLocation()

    console.log(locationUrl.pathname)

    function modifyStyleMap(){
      if(locationUrl.pathname != "/map"){
        const styles = {
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '500px',
          height: '300px'
        }
        setStyleMap(styles)
      }
    }

    useEffect(()=>{
      modifyStyleMap()
        socket.emit('auth', tokenStore)
        socket.on('positions', ({data}) =>{
          navigator.geolocation.getCurrentPosition(position => {
            const user_404 = {point_lat: position.coords.latitude, point_lon: position.coords.longitude}
            socket.emit('update_position', user_404)
          })
          setLocation(data)
          setCoords(data)
          })
    },[])

    return(
      <div>
        <Link to="/">
          <h3 className="hover:bg-gray-600 bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Retour</h3>
        </Link>
        <div style={styleMap}>
          <MapContainer center={[48.866667, 2.333333]} zoom={10} scrollWheelZoom={false}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            />
            {
              Object.keys(coords).map((key, index) => {
                return(
                  <Marker position={[coords[key].location.latitude, coords[key].location.longitude]}>
                    <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> 
                  </Marker>
                )
              })
            }
          </MapContainer>
        </div>
      </div>
  
    )
}


                // <MapContainer center={[location.latitude, location.longitude]} zoom={13} scrollWheelZoom={false}>
                //   <TileLayer
                //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                //     attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                //   />
                //   <Marker position={[location.latitude, location.longitude]}>
                //     <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> 
                //   </Marker>
                // </MapContainer>