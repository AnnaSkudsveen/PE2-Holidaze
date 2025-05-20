export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
    description: string;
    media: [
      {
        url: string;
        alt: string;
      }
    ];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
      wifi: true;
      parking: true;
      breakfast: true;
      pets: true;
    };
    location: {
      address: string;
      city: string;
      zip: string;
      country: string;
      continent: string;
    };
  };
};
