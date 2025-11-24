import React, { useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
};

const defaultCenter: LatLngLiteral = {
    lat: 34.72660,
    lng: -82.26081,
};

const GoogleMapView: React.FC = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(15);

    const places = useMemo(
        () => [
            {
                id: "office",
                label: "Grandview Office",
                position: defaultCenter,
                zoom: 17,
            },
        ],
        []
    );

    const handlePlaceClick = (place: any) => {
        setCenter(place.position);
        setZoom(place.zoom);
    };

    if (loadError) return <p className="text-red-500">Map failed to load.</p>;
    if (!isLoaded) return <p>Loading map…</p>;

    return (
        <div className="w-full space-y-4">
            <div className="flex gap-2">
                {places.map((place) => (
                    <button
                        key={place.id}
                        onClick={() => handlePlaceClick(place)}
                        className="px-3 py-1 border rounded-lg cursor-pointer bg-red-500/85 text-white hover:bg-white hover:text-red-500"
                    >
                        {place.label}
                    </button>
                ))}
            </div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                {places.map((place) => (
                    <Marker
                        key={place.id}
                        position={place.position}
                        onClick={() => handlePlaceClick(place)}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapView;
