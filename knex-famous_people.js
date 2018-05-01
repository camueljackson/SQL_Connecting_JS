const config    = require('./knexfile');
const env       = 'development';
const knex      = require('knex')(config[env]);



// SELECT
knex
.select('first_name', 'last_name')
.from('famous_people')
.then(result => {
    for (const element of result) {
        console.log(
            `First Name: ${element.first_name} Last Name: ${element.last_name}` );
    }
})
.catch(err => {
    console.log(err);
    return Promise.resolve();
})
.finally(() => {
    console.log("kill connection");
    knex.destroy();
})