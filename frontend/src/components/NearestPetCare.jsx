import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ onMove }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleMove = () => {
      const center = map.getCenter();
      onMove(center.lat, center.lng, map.getZoom());
    };

    map.on('moveend', handleMove);
    return () => {
      map.off('moveend', handleMove);
    };
  }, [map, onMove]);

  return null;
};

const NearestPetCare = () => {
  const [location, setLocation] = useState(null);
  const [petCareLocations, setPetCareLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(14);

  // Custom icons
  const petIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Strict filter for pet-related locations only
  const isPetRelated = (tags) => {
    if (!tags) return false;
    
    // List of valid pet-related OSM tags
    const validPetAmenities = [
      'veterinary',
      'animal_shelter',
      'animal_boarding',
      'animal_clinic',
      'pet_care',
      'animal_hospital'
    ];
    
    const validPetShops = [
      'pet',
      'dog',
      'cat',
      'bird',
      'fish',
      'animal'
    ];

    // Check if it's a valid pet amenity or shop
    if (validPetAmenities.includes(tags.amenity) )return true;
    if (validPetShops.includes(tags.shop)) return true;
    
    // Additional checks for healthcare=veterinary
    if (tags.healthcare === 'veterinary') return true;
    
    // Check name for pet-related keywords
    const petKeywords = ['vet', 'veterinary', 'animal', 'pet', 'dog', 'cat', 'puppy', 'kitten'];
    if (tags.name) {
      const lowerName = tags.name.toLowerCase();
      return petKeywords.some(keyword => lowerName.includes(keyword));
    }
    
    return false;
  };

  const fetchPetCareLocations = useCallback(async (lat, lng, zoom) => {
    setLoading(true);
    try {
      const radius = zoom < 10 ? 50000 : // 50km when zoomed out
                    zoom < 12 ? 20000 : // 20km
                    zoom < 14 ? 10000 : // 10km
                    5000; // 5km default

      // More specific query for pet-related locations only
      const overpassQuery = `
        [out:json];
        (
          node["amenity"~"veterinary|animal_shelter|animal_boarding|animal_clinic|pet_care|animal_hospital"](around:${radius},${lat},${lng});
          node["shop"~"pet|dog|cat|bird|fish|animal"](around:${radius},${lat},${lng});
          node["healthcare"="veterinary"](around:${radius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
      const data = await response.json();

      // Apply additional filtering to ensure only pet-related locations
      const locations = data.elements
        .filter(loc => loc.lat && loc.lon && isPetRelated(loc.tags))
        .map(loc => ({
          ...loc,
          name: loc.tags?.name || 'Pet Service',
          type: loc.tags?.amenity || loc.tags?.shop || 'pet',
          phone: loc.tags?.phone || loc.tags?.["contact:phone"],
          whatsapp: loc.tags?.["contact:whatsapp"],
          website: loc.tags?.website,
          address: loc.tags?.address
        }));

      setPetCareLocations(prev => {
        // Merge new locations with existing ones, avoiding duplicates
        const newLocations = locations.filter(newLoc => 
          !prev.some(existing => 
            Math.abs(existing.lat - newLoc.lat) < 0.0001 && 
            Math.abs(existing.lon - newLoc.lon) < 0.0001
          )
        );
        return [...prev, ...newLocations];
      });
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load pet care locations. Try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchPetCareLocations(latitude, longitude, currentZoom);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Please enable location access to find nearby pet services.');
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
    }
  }, [fetchPetCareLocations, currentZoom]);

  const handleMapMove = useCallback((lat, lng, zoom) => {
    setCurrentZoom(zoom);
    fetchPetCareLocations(lat, lng, zoom);
  }, [fetchPetCareLocations]);

  return (
    <div style={{ height: '100vh', width: '100%', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Pet Care Services Near You</h1>
      
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

      {!location ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          {loading ? 'Detecting your location...' : 'Please enable location access'}
        </div>
      ) : (
        <>
          <MapContainer
            center={location}
            zoom={currentZoom}
            style={{ height: '80vh', width: '100%', borderRadius: '10px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <LocationMarker onMove={handleMapMove} />

            <Marker position={[location.lat, location.lng]} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>

            {petCareLocations.map((loc, index) => (
              <Marker
                key={`${loc.id || index}`}
                position={[loc.lat, loc.lon]}
                icon={petIcon}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <h3 style={{ marginTop: 0 }}>{loc.name}</h3>
                    <p><strong>Type:</strong> {loc.type}</p>
                    {loc.address && <p><strong>Address:</strong> {loc.address}</p>}
                    {loc.phone && (
                      <p>
                        <strong>Phone:</strong> <a href={`tel:${loc.phone}`}>{loc.phone}</a>
                        {loc.whatsapp && (
                          <span style={{ marginLeft: '10px' }}>
                            <a 
                              href={`https://wa.me/${loc.whatsapp}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#25D366' }}
                            >
                              WhatsApp
                            </a>
                          </span>
                        )}
                      </p>
                    )}
                    {loc.website && (
                      <p>
                        <strong>Website:</strong>{' '}
                        <a href={loc.website} target="_blank" rel="noopener noreferrer">
                          {loc.website.replace(/^https?:\/\//, '')}
                        </a>
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            {loading ? (
              'Loading pet services...'
            ) : (
              `Showing ${petCareLocations.length} pet services in visible area`
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NearestPetCare;