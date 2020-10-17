import * as mongoose from 'mongoose';

export class MongooseCommonUtils {
  connectDB = async (MONGO_URI: string = process.env.MONGO_CONN_STR) => {
    try {
      await mongoose.connect(MONGO_URI, {
        promiseLibrary: global.Promise,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      console.info(`MongooseCommonUtils - connected to MongoDB`);
    } catch (error) {
      console.error('MongooseCommonUtils', `failed to connect to MongoDB`, null, error);
      process.exit(1);
    }
  };

  healthCheck = async () => {
    if (
      mongoose.connection.readyState !== mongoose.STATES.connected &&
      mongoose.connection.readyState !== mongoose.STATES.connecting
    ) {
      throw new Error(`Database is not ready (state: ${mongoose.connection.readyState}`);
    }
  };

  shutdown = async () => {
    try {
      await mongoose.connection.close();
      console.info('MongooseCommonUtils - MongoDb connection closed.');
    } catch (error) {
      process.exit(1);
    }
  };
}
