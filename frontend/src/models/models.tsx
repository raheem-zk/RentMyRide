export interface CarOwnerSignupForm {
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  email: string;
  password: string;
  pincode: string;
  license: string;
  place: string;
  address: string;
}

export interface DropdownProps {
  data: Spec[];
  title: string;
  AddingForm: any;
  HandleForm: (value: any) => void;
  Reload: () => void;
  handleCarDetailsChange: (e) => void;
}

export interface AddingFunction {
  title: string;
  handleAdding: (value: string) => boolean;
  Reload: () => void;
  action: any;
}

export interface CarDetailsModel {
  _id: string;
  ownerId: UserData | undefined | null;
  carName: string;
  brand: Spec | string;
  model: Spec | string;
  year: string;
  licensePlate: string;
  images: string[];
  transmission: Spec | string;
  category: Spec | string;
  perDayPrice: any;
  description: string;
  fuelType: Spec | string;
  startDate: string;
  endDate: string;
}

interface Spec {
  _id: string;
  name: string;
}
export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  place: string | null;
  age: number | null;
  address: string | null;
  license: string | null;
  profilePicture: string | null;
  status: boolean;
}

export interface carOwner {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  place: string | null;
  age: number | null;
  address: string | null;
  license: string | null;
  profilePicture: string | null;
  status: boolean;
  carId: CarDetailsModel[] | string;
}

export interface ordersModel {
  _id: string;
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  pickupTime: string;
  dropoffDate: Date;
  dropoffTime: string;
  license: string;
  status: string;
}

export interface BookingData {
  carId: string | undefined;
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: String;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  license: string;
  address: string;
  userId: string;
  totalDays: number;
  totalPrice: number;
  perDayPrice: number | string;
}

export interface profileEditModal {
  private _id(
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string | number;
      age: number;
      address: string;
      license: string;
      place: string;
    },
    _id: any
  ): unknown;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | number | null | undefined;
  place: string | null | undefined;
  age: number | null | undefined;
  address: string | null | undefined;
  license: string | null | undefined;
}

export interface filterModel {
  searchText: string | null | undefined;
  category: string | null | undefined;
  brand: string | null | undefined;
  model: string | null | undefined;
  fuelType: string | null | undefined;
  transmition: string | null | undefined;
}

export interface filterOptionsDatas {
  category: Spec[] | [];
  brand: Spec[] | [];
  model: Spec[] | [];
  transmission: Spec[] | [];
  fuelType: Spec[] | [];
}
