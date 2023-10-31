import { useEffect, useRef } from 'react';
import { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { ContactsMapLocation, CONTACTS_MAP_ZOOM, defaultCustomIcon } from '../../const';

function ContactsMap(): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, [ContactsMapLocation.lat, ContactsMapLocation.lng], CONTACTS_MAP_ZOOM);

  useEffect(() => {
    if (map) {
      const marker = new Marker({
        lat: ContactsMapLocation.lat,
        lng: ContactsMapLocation.lng
      });

      marker
        .setIcon(defaultCustomIcon)
        .addTo(map);
    }
  }, [map]);

  return (
    <div className="map">
      <div className="map__container" ref={mapRef}/>
    </div>
  );
}

export default ContactsMap;
