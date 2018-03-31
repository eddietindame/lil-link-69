import mongoose, { Schema } from 'mongoose'

const urlSchema = new Schema({
    originalUrl: String,
    newUrl: String
}, { timestamps: true })

export default mongoose.model('shortUrl', urlSchema)
