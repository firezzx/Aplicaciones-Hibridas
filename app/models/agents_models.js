import mongoose from "mongoose";

const agentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: false
    }
})

export default mongoose.model('Agent', agentsSchema);