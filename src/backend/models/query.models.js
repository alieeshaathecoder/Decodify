import mongoose, {Schema} from "mongoose";

const querySchema = new Schema({
    topic: {
        type: String,
        required: true,
        trim: true
    },
    explanation: {
        type: String,
        required: true
    }
},{timestamps: true})

const Query = mongoose.model("Query", querySchema)

export {
    Query,
}