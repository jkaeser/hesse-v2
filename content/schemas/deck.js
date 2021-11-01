const colorBools = ['White', 'Blue', 'Black', 'Red', 'Green'].map(color => ({
  title: color,
  name: color.toLowerCase(),
  type: 'boolean',
  fieldset: 'colors'
}));

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
    ...colorBools,
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Retired', value: 'retired' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Player', value: 'player' },
          { title: 'Opponent', value: 'opponent' }
        ]
      },
      validation: Rule => Rule.required()
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
