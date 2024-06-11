import { IGenre } from '@/interfaces/genres/IGenre'

export interface IStyle {
  id: number;
  styleName: string;
  styleDescription: string;
  stylePhoto?: string;
  styleGenres: IGenre[];
}
