export const error = (msg) => {
    console.log('====================================');
    console.log('ERROR: ', msg)
    console.log('====================================');
}

export const validationErrors = (err) => {
    const errors = Object.values(err.errors)
    console.log('====================================');
    console.log('ERRORS: ')
    errors.forEach(err => {
        console.log('- ' + err.properties.message)
    })
    console.log('====================================');
}