export interface Hadis {
  id: string;
  title: string;
  arabicText: string;
  turkishText: string;
  explanation: string;
  kitapId: string;
  bolumId: string;
  altBolumId: string;
  siraNo: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  kitapId: string;
  bolumId?: string;
  altBolumId?: string;
}

export interface SearchResult {
  hadis: Hadis;
  score: number;
  matches: string[];
}

