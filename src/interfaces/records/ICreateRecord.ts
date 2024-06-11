export interface ICreateRecord {
  recordTitle: string;
  recordBand: string;
  recordCondition: 'New' | 'Used' | 'Damaged' | 'Broken';
  recordCover?: string; // Optional, URL of the photo
  recordFormat: 'CD' | 'Vinyl 33 RPM' | 'Vinyl 45 RPM' | 'Audio Live Concert' | 'Video Live Concert';
  recordGenres: Array<{ id: number }>;
  recordSubGenres: Array<{ id: number }>;
  recordStyles: Array<{ id: number }>;
  recordLabel: { id: string };
  recordYear: string; // ISO date string
  recordType: 'Official' | 'Bootleg' | 'Burned';
  recordLength: 'Full-length' | 'EP';
  recordTracklist?: string; // Optional
  recordTracklistSideB?: string; // Optional
  recordBandMembers: Array<{ id: number }>;
}
