import { IVenue } from '@/interfaces/gigs/IVenue'
import { IBand } from '@/interfaces/bands/IBand'
import { IGig } from '@/interfaces/gigs/IGig'

export interface IFestival {
  id: number;
  festivalName: string;
  festivalStartDate: string; // ISO date string
  festivalEndDate: string; // ISO date string
  venues: IVenue[];
  bands: IBand[];
  gig: IGig;
  festivalDescription?: string; // Optional
  festivalLink?: string; // Optional
  festivalTicketPrice?: number; // Optional
  isCurrent?: boolean; // This is a computed property
}
