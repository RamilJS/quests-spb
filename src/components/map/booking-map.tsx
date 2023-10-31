import { Marker, layerGroup } from 'leaflet';
import { useCallback, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useMap from '../../hooks/use-map';
import { changeCurrentPlace } from '../../store/booking-data/booking-data.slice';
import { BookingQuest } from '../../types/booking-map';
import { getBookingQuests, getCurrentQuest } from '../../store/booking-data/booking-data.selectors';
import { BOOKING_MAP_ZOOM, defaultCustomIcon, currentCustomIcon } from '../../const';

function BookingMap(): JSX.Element {
  let currentQuest = useAppSelector(getCurrentQuest);
  const bookingQuests = useAppSelector(getBookingQuests);
  const dispatch = useAppDispatch();
  const mapRef = useRef(null);

  if (!currentQuest) {
    currentQuest = bookingQuests[0];
  }

  const map = useMap(mapRef, [currentQuest.location.coords[0],currentQuest.location.coords[1]], BOOKING_MAP_ZOOM);

  const handleMarkerClick = useCallback((questPlace: BookingQuest): void => {
    dispatch(changeCurrentPlace(questPlace));
  }, [dispatch]);

  useEffect(() => {
    if (map && currentQuest) {
      map
        .setView(currentQuest.location.coords);

      const markerLayer = layerGroup().addTo(map);

      bookingQuests.forEach((questPlace) => {
        const marker = new Marker({
          lat: questPlace.location.coords[0],
          lng: questPlace.location.coords[1]
        });

        marker
          .setIcon(
            currentQuest && questPlace.location.address === currentQuest.location.address
              ? currentCustomIcon
              : defaultCustomIcon
          ).on('click', () => handleMarkerClick(questPlace))
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, bookingQuests, currentQuest, handleMarkerClick]);


  return (
    <div className="booking-map">
      <div className="map">
        <div className="map__container" ref={mapRef}/>
      </div>
      <p className="booking-map__address">
      Вы&nbsp;выбрали: {currentQuest.location.address}
      </p>
    </div>
  );
}

export default BookingMap;
