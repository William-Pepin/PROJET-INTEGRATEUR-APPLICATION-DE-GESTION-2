var config = {
    database: {
        uri: 'mongodb://localhost:27017/projet-integrateur',
        name: 'projet-integrateur',
        collections: {
            tasks:"tasks",
            persons:"persons"
        }
    }
}

module.exports = config;