import {GenreData} from '../genres/genre.data';

export class BookData {
  id: number;
  title: string;
  author: string;
  characters: Array<CharacterData>;
  genreList: Array<GenreData>;
  isbn: string;
  cover: string;
}
