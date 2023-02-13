import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import './leaflet/dist/leaf/leaflet.css'
import styles from './Map.module.scss'

const position = [51.505, -0.09]

const Map = ({ className }) => {

    let mapClassName = styles.map;

    if(className) {
        mapClassName = `${mapClassName}${className}`
    }

    return (
        <MapContainer className={mapClassName} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map