require('replayer')
const { expect } = require('chai')
const sinon = require('sinon')
const { searchIMDB, printList } = require('../app/search.js')

describe('Search movies from the command line', () => {
  it('it returns all of the movie titles for Rocky', () => {
    return searchIMDB('rocky')
      .then(results => {
        expect(results).to.be.an('array')
        expect(results).to.have.length(2)
        expect(results).to.deep.equal([ ' Rocky (1976) ', ' Rocky (1981) ' ])
      })
  })

  it('can search for movies with multi word titles', () => {
    return searchIMDB('all about my mother')
      .then(results => {
        expect(results).to.be.an('array')
        expect(results).to.have.length(10)
      })
  })

  it('returns a message if no films were found', () => {
    return searchIMDB('qqqqqqquttttg')
      .then(results => {
        expect(results).to.eql(['No films found for qqqqqqquttttg'])
      })
  })
})
