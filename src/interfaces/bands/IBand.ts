import { IBandMember } from '@/interfaces/bands/IBandMember'
import { IGenre } from '@/interfaces/genres/IGenre'

export interface IBand {
  id: number;
  bandName: string;
  bandCountry: string;
  bandFormedIn: number;
  bandDescription: string;
  bandGenre: IGenre[];
  bandMembers: IBandMember[];
  bandPhoto?: string;
  bandStatus: 'active' | 'hiatus' | 'split_up';
  bandSeparationDate?: string;
}
