import mongoose from 'mongoose'

function connect(dbName: string) {
    try {
        return mongoose.createConnection(process.env.ATLAS_URI || '', {
            dbName
        })
    } catch (error) {
        throw new Error('Failed to connect to the database')
    }
}

export default { connect }
