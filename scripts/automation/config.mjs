const paths = {
    absolute: 'src/modules/disneydle/'
}

const replaces = {
    entity: 'Movie',
    entityPlural: 'Movies',
    entityMini: 'movie',
    entityMiniPlural: 'movie',
    db: 'disney-api'
}

const templateFiles = [
    'controller',
    'entity',
    'model',
    'repository',
    'routes',
    'schema',
    'service'
]

export const config = {
    paths,
    replaces,
    templateFiles
}
