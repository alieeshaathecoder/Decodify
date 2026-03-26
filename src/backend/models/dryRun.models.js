import mongoose, {Schema} from "mongoose";

const dryRunSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
})

const DryRun = mongoose.model("DryRun", dryRunSchema);

export default DryRun;