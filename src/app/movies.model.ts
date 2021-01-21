export interface Movie {
  id: string;
  title: string;
  rating: number;
  description: string;
  dateEntered: number;
  dateChanged: number;
  creator: string;
  savedSearchResult: object;
  tags: Array<string>;
}
