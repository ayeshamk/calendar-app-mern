import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: 'Please enter title for calendar entry'
      },
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
      created_date: {
        type: Date,
        default: new Date
      }
})

export default mongoose.model('events', eventSchema)