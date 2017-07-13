require('replayer')
const { expect } = require('chai')
const { searchIMDB, print } = require('../app/search.js')

describe('Search movies from the command line', () => {
  it('it returns all of the movie titles for Rocky', (done) => {
    searchIMDB('rocky')
      .then(results => {
        expect(results).to.be.an('array')
        expect(results).to.have.length(2)
        expect(results).to.deep.equal([ ' Rocky (1976) ', ' Rocky (1981) ' ])
        done()
      })
  })

  it('can search for movies with multi word titles', (done) => {
    searchIMDB('all about my mother')
      .then(results => {
        expect(results).to.be.an('array')
        expect(results).to.have.length(10)
        done()
      })
  })

  it('returns a message if no films were found', (done) => {
    searchIMDB('qqqqqqquttttg')
      .then(results => {
        expect(results).to.eql('No films found for qqqqqqquttttg')
        done()
      })
  })
})

describe('Print function', () => {
  const movieTitles = ['Rocky (1970)', 'Rocky (1981)']
  it('prints a formatted list of movie titles', (done) => {
    expect(print(movieTitles)).to.be.a('string')
    expect(print(movieTitles)).to.eq('Rocky (1970)\nRocky (1981)')
    done()
  })
})
