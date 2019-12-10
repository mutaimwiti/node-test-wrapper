import { Schema, model } from 'mongoose';

const ReportSchema = Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default model('Report', ReportSchema);
