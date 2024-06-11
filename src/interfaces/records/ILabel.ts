import { IGenre } from '@/interfaces/genres/IGenre'
import { IStyle } from '@/interfaces/genres/IStyle'
import { ISubGenre } from '@/interfaces/genres/ISubGenre'

export interface ILabel {
  id: number;
  labelName: string;
  labelAddress?: string;
  labelCountry?: string;
  labelDescription?: string;
  labelFoundingDate?: string;
  labelPhoneNumber?: string;
  labelPhoto?: string;
  labelPostalCode?: string;
  labelStatus?: 'Actif' | 'Inactif' | 'Temporairement indisponible';
  labelGenres: IGenre[];
  labelStyles: IStyle[];
  labelSubGenres: ISubGenre[];
}
