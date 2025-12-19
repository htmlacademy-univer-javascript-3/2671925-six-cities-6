import React, { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types';

type MapProps = {
  offers: Offer[];
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const Map: React.FC<MapProps> = ({ offers, city }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(mapInstanceRef.current);
    }
  }, [city]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [city]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      offers.forEach((offer) => {
        const marker = leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: defaultCustomIcon,
            }
          )
          .addTo(mapInstanceRef.current!);
        markersRef.current.push(marker);
      });
    }
  }, [offers]);

  return <div ref={mapRef} style={{ height: '100%' }}></div>;
};

export default Map;
