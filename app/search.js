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

  rp(options)
    .then(($) => {
      const titles = $('.findSection')
        .first()
        .find($('.result_text'))
        .map((i, elem) => { return $(elem).text() })
        .toArray()

        return titles.join('\n')
    })
    .then(console.log)
    .catch((error) => {
      console.error(error.message)
    })
}

const run = () => {
  const searchTerm = process.argv.slice(2).join('+')

  searchIMDB(searchTerm)
}

if (!module.parent) {
  run()
}

module.exports = { searchIMDB }
