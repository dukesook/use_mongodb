// personModel.js
import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  age: Number,
  city: String
});

const modelName = 'Person'; // MongoDB collection name - 'people' (pluralized & lower case)
const PersonModel = mongoose.model(modelName, personSchema);

export default PersonModel;
