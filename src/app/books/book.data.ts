import {GenreData} from '../genres/genre.data';

export class BookData {
  id: number;
  title: string;
  authors: string;
  genreList: Array<GenreData>;
  isbn: string;
  cover: string;
}
