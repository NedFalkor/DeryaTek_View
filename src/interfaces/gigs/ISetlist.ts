export interface ISetlist {
  id: number;
  gig: number; // Assuming gig is represented by its ID
  songNumber: number;
  songTitle: string;
  songDuration?: string; // ISO 8601 duration string
  albumName?: string;
}
