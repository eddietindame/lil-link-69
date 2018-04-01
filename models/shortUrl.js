import mongoose, { Schema } from 'mongoose'
import ttl from 'mongoose-ttl'

const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    newUrl: { type: String, required: true },
}, { timestamps: true })

urlSchema.plugin(ttl, { ttl: '24h' })

export default mongoose.model('shortUrl', urlSchema)
