import mongoose, {Schema} from "mongoose";

const spaceComplexitySchema = new Schema({
    input: {
        type: String,
        required: true,
    },
    complexity: {
        type: String,
        required: true,
    },
})

const SpaceComplexity = mongoose.model("SpaceComplexity", spaceComplexitySchema)

export default SpaceComplexity;