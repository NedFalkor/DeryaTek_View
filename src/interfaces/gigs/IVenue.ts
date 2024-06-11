export interface IVenue {
  id: number;
  venueName: string;
  venueAddress: string;
  venueCapacity: number;
  venueCountry?: string; // Optional
  venueCity?: string; // Optional
}
