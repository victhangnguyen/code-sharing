import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) {
    return console.log('MISSING MONGOD_URL')
  }

  if (isConnected) {
    return console.log('MongoDB is ready connected')
  }

  try {
    // dbName: code-sharing
    await mongoose.connect(process.env.MONGODB_URL, { dbName: 'code-sharing' })

    isConnected = true

    console.log('MongodBD is connected!')
  } catch (error) {
    console.log('MongoDB is not connected!', error)
  }
}
