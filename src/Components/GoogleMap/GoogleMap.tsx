import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface GoogleMapProps {
    lat: number;
    lng: number;
    zoom: number;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ lat, lng, zoom }) => {
    const mapStyles = {
        height: "400px",
        width: "100%"
    };

    const defaultCenter = {
        lat: lat,
        lng: lng
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={zoom}
                center={defaultCenter}
            >
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;