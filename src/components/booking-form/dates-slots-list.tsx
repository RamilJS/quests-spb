import TimeRadioButton from './time-radio-button';
import { DateSlot, SlotName } from '../../const';
import Loader from '../loader/loader';
import { Slots } from '../../types/booking-map';

type SlotsConstProps = {
  slots: Slots;
  onDateChange: (date: DateSlot, time: string) => void;
}

function DatesSlotsList({slots, onDateChange}: SlotsConstProps): JSX.Element {

  if (!slots) {
    return <Loader />;
  }

  return (
    <>
      {Object.entries(slots).map(([date, infoList]) => (
        <fieldset className="booking-form__date-section" key={date}>
          <legend className="booking-form__date-title">{SlotName[date]}</legend>
          <div className="booking-form__date-inner-wrapper">
            {infoList.map((info) => (
              <TimeRadioButton
                key={info.time}
                day={date as DateSlot}
                slot={info}
                onDateChange={onDateChange}
              />
            ))}
          </div>
        </fieldset>
      ))}
    </>
  );
}

export default DatesSlotsList;
