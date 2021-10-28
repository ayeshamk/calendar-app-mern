import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: 'Please enter title for calendar entry'
      },
      start: {
        type: Date,
        required: 'Please enter date for calendar entry'
      },
      end: {
        type: Date,
      },
      created_date: {
        type: Date,
        default: new Date
      },
      allDay: {
        type: Boolean,
        default: false
      }
})

export default mongoose.model('events', eventSchema)
