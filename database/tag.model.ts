import { Document, model, models, Schema } from 'mongoose'

export interface ITagDocument extends Document {
  name: string
  description: string
  question: Schema.Types.ObjectId[]
  followers: Schema.Types.ObjectId[]
  createdAt: Date
}

// Create the Tag Schema based on the interface
const TagSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Ensure unique tag names
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

// Create the Tag model
const Tag = models.Tag || model('Tag', TagSchema)

export default Tag
