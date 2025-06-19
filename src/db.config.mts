import mongoose from 'mongoose'

function connect(dbName: string) {
    return mongoose.createConnection(process.env.ATLAS_URI || '', {
        dbName
    })
}

export default { connect }
