export interface Phrase {
  user: string;
  phrase: string;
  dateAdded?: Date;
  lastPlayed?: Date;
  categories?: Array<string>;
}
