import { Injectable, OnModuleInit } from '@nestjs/common';
import { Index, Meilisearch } from 'meilisearch';

export type PostSearchable = {
    id: number;
    content: string;
  }

export type UserSearchable = {
  id: string;
  name: string;
  nickname: string;
}

@Injectable()
export class SearchService extends Meilisearch implements OnModuleInit {

    posts: Index<PostSearchable> | undefined
    users: Index<UserSearchable> | undefined

  constructor() {
    super({
      host: 'http://localhost:7700',
      apiKey: 'azx93WWgAJw1CsCIfvYB9DPc71FEo-gTRSUWvGCbhBA',
    });
  }

  async onModuleInit() {
    const index = this.index('movies');

    this.posts = this.index('posts')
    this.users = this.index('users')

    const documents = [
      { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
      { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
      { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
      {
        id: 4,
        title: 'Mad Max: Fury Road',
        genres: ['Adventure', 'Science Fiction'],
      },
      { id: 5, title: 'Moana', genres: ['Fantasy', 'Action'] },
      { id: 6, title: 'Philadelphia', genres: ['Drama'] },
    ];

    // If the index 'movies' does not exist, Meilisearch creates it when you first add the documents.
    let response = await index.addDocuments(documents);

    console.log(response); // => { "uid": 0 }
  }
}
