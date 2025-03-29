// personModel.js
import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  age: Number,
  city: String
});

personSchema.statics.listAllPeople = function() {
  return this.find({});
};

const modelName = 'Person'; // MongoDB collection name - 'people' (pluralized & lower case)
const PersonModel = mongoose.model(modelName, personSchema);

export default PersonModel;
