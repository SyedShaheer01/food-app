import mongoose  from "mongoose";
import 'dotenv/config.js'

mongoose.connect(`mongodb+srv://${process.env.DB_URL}`)


export default mongoose






