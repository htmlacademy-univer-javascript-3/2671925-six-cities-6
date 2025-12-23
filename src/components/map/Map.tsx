import React, { useRef, useEffect, memo } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types';
import { MapConfig } from '../../const';

type MapProps = {
  offers: Offer[];
  activeOfferId?: string | null;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom?: number;
    };
  };
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: MapConfig.IconSize,
  iconAnchor: MapConfig.IconAnchor,
});

const activeCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: MapConfig.IconSize,
  iconAnchor: MapConfig.IconAnchor,
});

const Map: React.FC<MapProps> = ({ offers, activeOfferId = null, city }) => {
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
        zoom: city.location.zoom ?? MapConfig.DefaultZoom,
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
        city.location.zoom ?? MapConfig.DefaultZoom
      );
    }
  }, [city]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      offers.forEach((offer) => {
        const icon = offer.id === activeOfferId ? activeCustomIcon : defaultCustomIcon;
        const marker = leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon,
            }
          )
          .addTo(mapInstanceRef.current!);
        markersRef.current.push(marker);
      });
    }
  }, [offers, activeOfferId]);

  return <div ref={mapRef} style={{ height: '100%' }}></div>;
};

const MemoizedMap = memo(Map);

export default MemoizedMap;
