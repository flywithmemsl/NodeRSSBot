
const MIN_RATE = 20
const MIN_BUDGET = 500

const BLACKLIST = [
  "India"
]

export const filter = ({content}) => {
  
  const isNotContainingBlacklisted = BLACKLIST.reduce((acc, el) => {
    return acc && (content.indexOf(el) == -1)
  }, true )

  if (content.match(/((Hourly Range).*)|((Budget).*)/)===null) return isNotContainingBlacklisted 
  
  const rate = content.match(/((Hourly Range).*)|((Budget).*)/)[0]

  if ( rate.indexOf('Budget')> -1 ) { 
    const budget = rate.split(":")[1].slice(2)
    if (budget < MIN_BUDGET) return false

  } else {
    const minRate = parseFloat(rate.split(':')[1].split('-')[0].slice(2))
    if (minRate < MIN_RATE) return false
    

  }

  return isNotContainingBlacklisted
}

export const parse = (content) => {

  const budget = content.match(/((Hourly Range).*)|((Budget).*)/)
  const country = content.match(/(Country).*/)

  return ('' + (!!budget ? budget[0] : '')
  + ' ' 
  + (!!country ? country[0] : ''))

  
}
  
