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
  value: Spec | undefined;
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
  district: Spec | string;
}

export interface Spec {
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
  sortOrder: string;
  searchText: string | null | undefined;
  category: string | null | undefined;
  brand: string | null | undefined;
  model: string | null | undefined;
  fuelType: string | null | undefined;
  transmition: string | null | undefined;
  page: number | null | undefined;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  district: string | null | undefined;
}

export interface filterOptionsDatas {
  category: Spec[] | [];
  brand: Spec[] | [];
  model: Spec[] | [];
  transmission: Spec[] | [];
  fuelType: Spec[] | [];
  district: Spec[] | [];
}

export interface walletHistoryModel {
  amount: number;
  type: string;
  description: string;
  date: Date | string;
}

export interface walletModel {
  balance: number;
  history: walletHistoryModel[];
}

export interface userModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | string | null | undefined;
  place: string | null | undefined;
  age: number | null | undefined;
  address: string | null | undefined;
  license: string | null | undefined;
  profilePicture: string | null | undefined;
  wallet: walletModel;
}

export interface userInittalModel {
  user: userModel | null;
  success: boolean;
}

export interface AdminSideOwnerModel {
  carName: string;
  images: any;
  _id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: number;
  place: string | null;
  age: number;
  address: string | null;
  license: string | null;
  profilePicture: string | null;
  gender: string | null;
  status: boolean | string;
  createdAt: Date;
}

export interface AdminSideTabelFrameProps {
  heading: string | null;
  data: AdminSideOwnerModel[] | null;
  handleAction: (id: string, status: string, message: string) => void;
  role: string;
  filterPagination: (val: number) => void;
  currentPage: number;
  size: number;
};

export interface ordersMoreData {
  _id: string;
  orderId: string;
  carId: CarDetailsModel ;
  userId : UserData;
  pickupDate: string;
  dropoffDate : string;
  totalPrice : number ;
  status : string;
}

export interface BarDataProps {
  user: number; 
  blockedUser: number;
  carOwnerData: number;
  blockedCarOwnerData: number;
  newOrders: number;
  totalOrders: number;
}

export interface Resource {
  _id: number;
  name: string;
  status: boolean;    
}
export interface ResourcesProps {
  data: Resource[];
  title: string;
  handleBlockToggle: (id: string, status: boolean) => void;
  handleUpdate: (id: string, value: string) => void;
}