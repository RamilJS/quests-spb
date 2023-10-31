import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BookingData, BookingFormData, BookingPostData } from '../../types/booking';
import { getQuest } from '../../store/quest-data/quest-data.selectors';
import { getCurrentQuest } from '../../store/booking-data/booking-data.selectors';
import { postBookingQuestAction } from '../../store/api-actions';
import Loader from '../loader/loader';
import DatesSlotsList from './dates-slots-list';
import { DateSlot, BookingValidationForm } from '../../const';

function BookingForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors , isValid
    },
    reset
  } = useForm<BookingFormData>({
    mode: 'onChange'
  });

  const [currentDate, setCurrentDate] = useState<DateSlot | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  const onDateChange = useCallback((date: DateSlot, time: string): void => {
    setCurrentDate(date);
    setCurrentTime(time);
  }, []);

  const quest = useAppSelector(getQuest);
  const currentQuestPlace = useAppSelector(getCurrentQuest);

  if (!quest || !currentQuestPlace) {
    return <Loader />;
  }

  const [minPersonCount, maxPersonCount] = quest.peopleMinMax;

  const resetBookingFormData = () => {
    setCurrentDate(null);
    setCurrentTime('');
    reset();
  };

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    const bookingData: BookingData = {
      contactPerson: data.name,
      phone: data.tel,
      peopleCount: Number(data.person),
      date: currentDate as DateSlot,
      time: currentTime,
      withChildren: data.children,
      placeId: currentQuestPlace.id
    };

    const bookingPostData: BookingPostData = {
      questId: quest.id,
      bookingData: bookingData
    };

    dispatch(postBookingQuestAction({...bookingPostData, onSuccess: resetBookingFormData}));
  };

  return (
    <form
      className="booking-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <DatesSlotsList onDateChange={onDateChange} slots={currentQuestPlace.slots}/>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">
            Ваше имя
          </label>
          <input
            {...register('name', {
              required: 'Обязательное поле',
              pattern: {
                value: BookingValidationForm.Name,
                message: 'От 1 до 15 символов'
              }
            })}
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
          />
          {errors['name'] && <p>{errors['name']?.message}</p>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">
            Контактный телефон
          </label>
          <input
            {...register('tel', {
              required: 'Обязательное поле',
              pattern: {
                value: BookingValidationForm.Telephone,
                message: 'Введите корректный номер телефона'
              }
            })}
            type="tel"
            id="tel"
            name="tel"
            placeholder="Телефон"
          />
          {errors['tel'] && <p>{errors['tel']?.message}</p>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">
            Количество участников
          </label>
          <input
            {...register('person', {
              required: 'Обязательное поле',
              pattern: {
                value:new RegExp(`^([${minPersonCount}-${maxPersonCount}])$`),
                message: `Количество участников от ${minPersonCount} до ${maxPersonCount}`
              }
            })}
            type="number"
            id="person"
            name="person"
            placeholder="Количество участников"
          />
          {errors['person'] && <p>{errors['person']?.message}</p>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            {...register('children')}
            type="checkbox"
            id="children"
            name="children"
          />
          <span className="custom-checkbox__icon">
            <svg width={20} height={17} aria-hidden="true">
              <use xlinkHref="#icon-tick" />
            </svg>
          </span>
          <span className="custom-checkbox__label">
            Со&nbsp;мной будут дети
          </span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={!isValid}
      >
        Забронировать
      </button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input
          type="checkbox"
          id="id-order-agreement"
          {...register('userAgreement', {
            required: 'This field is required',
          })}
        />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick" />
          </svg>
        </span>
        <span className="custom-checkbox__label">
          Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">
            правилами обработки персональных данных
          </a>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default BookingForm;
