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
      const titles = $('.findSection')
        .first()
        .find($('.result_text'))
        .map((i, elem) => { return $(elem).text() })
        .toArray()

        return titles.length === 0 ? [`No films found for ${term}`] : titles
    })
}

const printList = (searchResults) => {
  console.log(searchResults.join('\n'))
}

const run = () => {
  const searchTerm = process.argv.slice(2).join('+')

  searchIMDB(searchTerm)
    .then(printList)
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
  printList
}
