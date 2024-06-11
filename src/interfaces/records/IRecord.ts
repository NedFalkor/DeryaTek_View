import { ITracklist } from '@/interfaces/records/ITracklist'
import { IBandMember } from '@/interfaces/bands/IBandMember'
import { ILabel } from '@/interfaces/records/ILabel'
import { IBand } from '@/interfaces/bands/IBand'
import { IGenre } from '@/interfaces/genres/IGenre'
import { ISubGenre } from '@/interfaces/genres/ISubGenre'
import { IStyle } from '@/interfaces/genres/IStyle'

export interface IRecord {
  id: number;
  recordBand: IBand;
  recordCondition: 'New' | 'Used' | 'Damaged' | 'Broken';
  recordCover?: string;
  recordFormat: 'CD' | 'Vinyl 33 RPM' | 'Vinyl 45 RPM' | 'Audio Live Concert' | 'Video Live Concert';
  recordGenres: IGenre[];
  recordSubGenres: ISubGenre[];
  recordStyles: IStyle[];
  recordLabel: ILabel;
  recordTitle: string;
  recordTracklist: ITracklist[];
  recordTracklistSideB?: ITracklist[];
  recordYear: string;
  recordType: 'Official' | 'Bootleg' | 'Burned';
  recordLength: 'Full-length' | 'EP';
  recordBandMembers: IBandMember[];
}
