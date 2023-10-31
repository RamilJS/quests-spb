import { DateSlot } from '../../const';
import { formatTime } from '../../utils';
import { Slot } from '../../types/booking-map';

type TimeRadioButtonProps = {
  day: DateSlot;
  slot: Slot;
  onDateChange: (date: DateSlot, time: string) => void;
}

function TimeRadioButton({day, slot, onDateChange}: TimeRadioButtonProps): JSX.Element {
  const { time, isAvailable } = slot;

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        name="date"
        id={`${day}${formatTime(time)}`}
        disabled={!isAvailable}
        value={`${day}${formatTime(time)}`}
        onChange={() => onDateChange(day, time)}
        required
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default TimeRadioButton;
