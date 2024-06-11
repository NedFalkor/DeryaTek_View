export interface IInstrument {
  id: number;
  instrumentName: string;
  instrumentDescription?: string;
  instrumentCategory?: 'wind' | 'strings' | 'percussion' | 'electronic' | 'keyboard' | 'brass' | 'woodwind' | 'vocal';
}
