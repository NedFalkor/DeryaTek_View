import { IStyle } from '@/interfaces/genres/IStyle'

export interface ISubGenre {
  id: number;
  subGenreName: string;
  subGenreDescription: string;
  subGenrePhoto?: string;
  subGenreStyles: IStyle[];
}
