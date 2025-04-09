import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/NearestPetCare.css'; // Import the CSS file

const NearestPetCare = () => {
  const [location, setLocation] = useState(null);
  const [petCareLocations, setPetCareLocations] = useState([]);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchPetCareLocations(latitude, longitude);
      });
    }
  }, []);

  const fetchPetCareLocations = (lat, lng) => {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="veterinary"](around:5000,${lat},${lng});node["amenity"="animal_shelter"](around:5000,${lat},${lng});node["shop"="pet"](around:5000,${lat},${lng});node["amenity"="animal_clinic"](around:5000,${lat},${lng});node["amenity"="pet_care"](around:5000,${lat},${lng});node["amenity"="veterinary_health"](around:5000,${lat},${lng});node["amenity"="animal_hospital"](around:5000,${lat},${lng});node["animal"](around:5000,${lat},${lng}););out;`;
    
    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        setPetCareLocations(data.elements);
      })
      .catch(error => {
        console.error('Error fetching data from Overpass API:', error);
      });
  };

  // Custom red dot icon for markers
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="nearest-pet-care-container">
      <h2>Find Nearest Pet Care Locations</h2>

      {location ? (
        <MapContainer
          center={location}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User's Location Marker */}
          <Marker position={location} icon={customIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Pet Care Locations */}
          {petCareLocations.map((location, index) => {
            if (location.lat && location.lon) {
              const position = [location.lat, location.lon];
              return (
                <Marker key={index} position={position} icon={customIcon}>
                  <Popup className="marker-popup">
                    <h3>{location.tags.name || 'Pet Care Location'}</h3>
                    <p>{location.tags.address || 'No address available'}</p>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

export default NearestPetCare;
