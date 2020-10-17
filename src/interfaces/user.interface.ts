export interface IUser {
  _id?: string;
  name: string;
  locationLatitude: number;
  locationLongitude: number;
  numberOfRides?: number;
  rating?: number;
  matched?: boolean;
}
