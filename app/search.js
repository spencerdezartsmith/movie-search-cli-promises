const rp = require('request-promise')
const cheerio = require('cheerio')

const searchIMDB = (term) => {
  const options = {
    uri: 'http://www.imdb.com/find?',
    qs: {
      ref_: 'nv_sr_fn',
      q: term,
      s: 'all'
    },
    transform: (body) => {
      return cheerio.load(body)
    }
  }

  return rp(options)
    .then(($) => {
      let message
      const titles = $('.findSection')
        .first()
        .find($('.result_text'))
        .map((i, elem) => { return $(elem).text() })
        .toArray()

        if (titles.length === 0) {
          return `No films found for ${term}`
        } else {
          return titles
        }
    })
    .catch((error) => {
      console.error(error.message)
    })
}

const print = (searchResults) => {
  if (typeof searchResults !== 'string') {
    return searchResults.join('\n')
  } else {
    return searchResults
  }
}

const run = () => {
  const searchTerm = process.argv.slice(2).join('+')

  searchIMDB(searchTerm)
    .then(movieTitles => print(movieTitles))
    .then(console.log)
    .catch(error => {
      console.error(error.message)
      throw error
    })
}

if (!module.parent) {
  run()
}

module.exports = {
  searchIMDB,
  print
}
