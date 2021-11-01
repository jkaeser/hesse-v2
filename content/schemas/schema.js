import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import deck from './deck'
import game from './game'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    deck,
    game
  ]),
})
