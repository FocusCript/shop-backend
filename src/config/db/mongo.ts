import mongoose from 'mongoose';
import bluebird from 'bluebird';

export const connectDB = async (url: string) => {
  const mongoOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  mongoose.Promise = bluebird;
  mongoose.connect(url, mongoOptions).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  ).catch(err => {
      console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
      process.exit()
  });
}
