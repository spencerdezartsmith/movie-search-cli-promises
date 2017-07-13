const rp = require('request-promise')
const cheerio = require('cheerio')
const querystring = require('querystring')

const buildQuery = (term) => {
  const base_url = 'http://www.imdb.com/find?'
  const query = querystring.stringify({'ref_': 'nv_sr_fn', q: term, s: 'all'})
  return base_url + query
}

const searchIMDB = (url) => {
  const options = {
    uri: url,
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
        // Why am i unable to return titles from here?????
      console.log(titles.join('\n'))
    })
    .catch((error) => {
      console.error(error.message)
    })
}

const run = () => {
  const searchTerm = process.argv.slice(2).join('+')
  const url = buildQuery(searchTerm)
  const searchResults = searchIMDB(url)
}

if (!module.parent) {
  run()
}
