import { Module } from '@nestjs/common';
// import { mongodbProvider } from './mongodb.provider';
import * as mongoose from 'mongoose';

@Module({
  providers: [
    // ...mongodbProvider,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb://root:example@localhost:27017/'),
    },
  ],
  exports: [
    // ...mongodbProvider
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb://root:example@localhost:27017/'),
    },
  ],
})
export class MongoDbModule {}
