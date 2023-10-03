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
  
interface BrandItem {
  name: string;
  _id: string;
}

export interface DropdownProps {
    data: BrandItem[];
    title: string;
    AddingForm: any;
    HandleForm: (value: any) => void;
    Reload: ()=> void ;
    handleCarDetailsChange: (e)=> void;
  }

export interface AddingFunction  {
  title: string;
  handleAdding: (value: string) => boolean;
  Reload: ()=> void;
  action:any
}

export interface CarDetailsModel {
  carName: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  images: File[] | null;
  transmission: string;
  category: string;
  perDayPrice: string;
  description: string;
  fuelType: string;
  startDate: string;
  endDate: string;
}