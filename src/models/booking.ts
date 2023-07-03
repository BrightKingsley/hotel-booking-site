export type Booking = {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  hotelId: string;
  hotel?: string;
  type: "single" | "double" | "triple";
  checkIn: string;
  checkOut: string;
  total: number;
};
