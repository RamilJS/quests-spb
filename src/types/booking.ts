import { Quest } from './quest';
import { DateSlot } from '../const';

export type BookingFormData = {
  name: string;
  tel: string;
  person: string;
  children: boolean;
  userAgreement: string;
};

export type BookingPostData = {
  questId: string;
  bookingData: BookingData;
};

export type BookingInfo = {
    id: string;
    location: {
      address: string;
      coords: [number, number];
    };
    slots: {
      today: [{
      time: string;
      isAvailable: boolean;
    }];
    tomorrow: [{
      time: string;
      isAvailable: boolean;
    }];
  };
}

export type BookingData = {
  date: DateSlot;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
}

type ModifiedBookingData = Omit<BookingData, 'placeId'>;
type ModifiedBookingInfo = Omit<BookingInfo, 'slots' | 'tomorrow'>;

export type ModifiedQuest = {
  'quest': Quest;
};

export type ReservationQuest = ModifiedBookingData & ModifiedBookingInfo & ModifiedQuest;

export type ReservationQuests = ReservationQuest[];
