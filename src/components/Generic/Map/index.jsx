
import React, { useState } from 'react';
// import { Container, Title, Wrapper, WrapperDetails, WrapprDescription, MapStyle } from "./style";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '98%',
    height: '400px'
};
const Map = ({ position }) => {
    const [center, setCenter] = useState({
        lat: 41.2559,
        lng: 69.2401
    });
    const onClickMap = (e) => {
        setCenter({
            lat: e?.lanLng?.lan(),
            lng: e?.latLng?.lng()
        })
        position({ lat: e?.latLng?.lat(), lng: e?.latLng?.lng() });
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAkkKvMyf8Tk3Q8s7MWXin6njbtjIjq2S4"
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return (
        <>
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={onClickMap}
                    >
                        <Marker position={{ ...center }} />
                        <Marker position={{ ...center }} />
                    </GoogleMap>
                ) : <></>
            }
        </>
    );
}
export default Map