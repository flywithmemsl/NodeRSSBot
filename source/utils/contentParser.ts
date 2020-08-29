
const MIN_RATE = 30
const MIN_BUDGET = 1000

const BLACKLIST = [
  "India"
]

export const filter = ({content}) => {
  if (content.match(/((Hourly Range).*)|((Budget).*)/)===null) return false
  
  const rate = content.match(/((Hourly Range).*)|((Budget).*)/)[0]

  if ( rate.indexOf('Budget')> -1 ) { 
    const budget = rate.split(":")[1].slice(2)
    if (budget < MIN_BUDGET) return false

  } else {
    const minRate = parseFloat(rate.split(':')[1].split('-')[0].slice(2))
    if (minRate < MIN_RATE) return false
    

  }

  const isNotContainingBlacklisted = BLACKLIST.reduce((acc, el) => {
    return acc && (content.indexOf(el) == -1)
  }, true )
  
  
  return isNotContainingBlacklisted
}

export const parse = (content) => {

  return '<b>'+content.match(/((Hourly Range).*)|((Budget).*)/)[0] 
  + '<br />' 
  + content.match(/(Country).*/)[0]

  
}
  