import { Connection } from 'mongoose';
import { PostSchema } from '../../mongodb/comments';

export const postProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: async (connection: Connection) => {
      const PostModel = connection.model('Post', PostSchema);
      await PostModel.createCollection();
      return PostModel;
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
