export default {
  title: 'Deck',
  name: 'deck',
  type: 'document',
  fieldsets: [
    { title: 'Colors', name: 'colors' },
    { title: 'URLs', name: 'urls' }
  ],
  fields: [
    {
      title: 'Commander',
      name: 'commander',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'White',
      name: 'white',
      type: 'boolean',
      fieldset: 'colors'
    },
    {
      title: 'Blue',
      name: 'blue',
      type: 'boolean',
      fieldset: 'colors'
    },
    {
      title: 'Black',
      name: 'black',
      type: 'boolean',
      fieldset: 'colors'
    },
    {
      title: 'Red',
      name: 'red',
      type: 'boolean',
      fieldset: 'colors'
    },
    {
      title: 'Green',
      name: 'green',
      type: 'boolean',
      fieldset: 'colors'
    },
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Retired', value: 'retired' }
        ]
      }
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Player', value: 'player' },
          { title: 'Opponent', value: 'opponent' }
        ]
      }
    },
    {
      title: 'TappedOut.net',
      name: 'urlTappedOut',
      type: 'url',
      fieldset: 'urls'
    }
  ],
  initialValue: {
    status: 'active',
    type: 'player'
  }
}
