import { IBand } from '@/interfaces/bands/IBand'
import { IVenue } from '@/interfaces/gigs/IVenue'
import { ISetlist } from '@/interfaces/gigs/ISetlist'

export interface IGig {
  id: number;
  band: IBand;
  venue: IVenue;
  gigDate: string; // ISO 8601 date string
  gigTicketPrice: number;
  gigLink?: string;
  gigAdditionalInfo?: string;
  setlist: ISetlist[];
}
