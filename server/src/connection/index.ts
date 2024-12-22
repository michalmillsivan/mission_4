import mongoose from "mongoose"
const url = "mongodb://localhost:27017/BankAccounts"

async function connectToDB() {
    return await mongoose.connect(url)
}

export default connectToDB