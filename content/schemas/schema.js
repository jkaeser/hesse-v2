import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import deck from './documents/deck'
import game from './documents/game'
import deckLink from './objects/deckLink'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    deckLink,
    deck,
    game
  ]),
})
