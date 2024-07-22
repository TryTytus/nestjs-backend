import { Connection } from 'mongoose';
import { CommentSchema } from '../../mongodb/comments';

export const commentProviders = [
  {
    provide: 'COMMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Comment', CommentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
