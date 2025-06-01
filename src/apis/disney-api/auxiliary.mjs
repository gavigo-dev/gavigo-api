import moment from 'moment'
import seedrandom from 'seedrandom'

const languages = ['pt-BR', 'en-US']

export function getMovieOfDay(day) {
    const min = 0,
        max = 61

    if (!day) {
        day = moment()
    }
    const seed = day.format('YYYY-MM-DD')
    const random = seedrandom(seed)()
    const result = Math.floor(random * max) + min
    return result
}

const guessStatus = {
    CORRECT: 'correct',
    PARTIAL: 'partial',
    WRONG: 'wrong',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than'
}

export function compareMovies(guessing, selected) {
    const compareField = (field, a, b, lang) => {
        if (lang) {
            return a[field][lang] === b[field][lang]
                ? guessStatus.CORRECT
                : guessStatus.WRONG
        }
        return a[field] === b[field] ? guessStatus.CORRECT : guessStatus.WRONG
    }
    const compareNumberField = (field, a, b) => {
        const transform = (string) => {
            string = string.replaceAll(/[M$s]/g, '')
            if (string.includes('B')) {
                string = string.replaceAll('B', '')
                return parseInt(string) * 1000
            }
            return parseInt(string)
        }
        const n1 = transform(a[field])
        const n2 = transform(b[field])
        return n1 === n2
            ? guessStatus.CORRECT
            : n1 > n2
              ? guessStatus.GREATER_THAN
              : guessStatus.LESS_THAN
    }
    const compareArrayField = (field, a, b, lang) => {
        const arr1 = lang ? a[field][lang].sort() : a[field].sort()
        const arr2 = lang ? b[field][lang].sort() : b[field].sort()

        return JSON.stringify(arr1) === JSON.stringify(arr2)
            ? guessStatus.CORRECT
            : arr1.some((item) => arr2.includes(item))
              ? guessStatus.PARTIAL
              : guessStatus.WRONG
    }

    const result = {
        cover_image: {},
        animation_style: {},
        decade: {},
        box_office: {},
        name: {},
        location: {},
        main_character_types: {},
        genre: {}
    }

    languages.forEach((lang) => {
        result.box_office[lang] = {
            value: guessing.box_office,
            status: compareNumberField('box_office', guessing, selected)
        }

        result.decade[lang] = {
            value: guessing.decade,
            status: compareNumberField('decade', guessing, selected)
        }

        result.animation_style[lang] = {
            value: guessing.animation_style,
            status: compareField('animation_style', guessing, selected)
        }

        result.cover_image[lang] = guessing.cover_image[lang]

        result.name[lang] = {
            value: guessing.name[lang],
            status: compareField('name', guessing, selected, lang)
        }

        result.location[lang] = {
            value: guessing.location[lang],
            status: compareField('location', guessing, selected, lang)
        }

        result.main_character_types[lang] = {
            value: guessing.main_character_types[lang].join(', '),
            status: compareArrayField(
                'main_character_types',
                guessing,
                selected,
                lang
            )
        }

        result.genre[lang] = {
            value: guessing.genre[lang].join(', '),
            status: compareArrayField('genre', guessing, selected, lang)
        }
    })

    const ignoreKeys = ['cover_image']
    result.correctGuess = Object.entries(result).every(([key, value]) => {
        if (ignoreKeys.includes(key)) return true
        return value[languages[0]].status === guessStatus.CORRECT
    })

    return result
}
