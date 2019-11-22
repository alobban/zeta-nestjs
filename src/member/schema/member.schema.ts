import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  lineName: String,
});
