import { IInstrument } from '@/interfaces/bands/IInstrument'

export interface IBandMember {
  id: number;
  bandMemberFirstName: string;
  bandMemberLastName?: string;
  bandMemberBirthCity: string;
  bandMemberBirthCountry?: string;
  bandMemberNationality?: string;
  bandMemberBirthYear: number;
  bandMemberDeathYear?: number;
  bandMemberInstruments: IInstrument[];
  bandMemberPhoto?: string;
}
