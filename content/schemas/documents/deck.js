const colors = ['White', 'Blue', 'Black', 'Red', 'Green'].map(color => ({
  title: color,
  value: color.toLowerCase(),
}));

export default {
  title: 'Deck',
  name: 'deck',
  type: 'document',
  fields: [
    {
      title: 'Commander',
      name: 'commander',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Colors',
      name: 'colors',
      type: 'array',
      of: [{ type: 'string', title: 'Color' }],
      options: {
        list: [
          ...colors
        ]
      }
    },
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
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'deckLink' }]
    }
  ],
  initialValue: {
    status: 'active',
    type: 'player'
  },
  preview: {
    select: {
      commander: 'commander',
      status: 'status',
      type: 'type'
    },
    prepare(selection) {
      const { commander, status, type } = selection;
      return {
        title: commander,
        subtitle: `${status.charAt(0).toUpperCase()}${status.slice(1)} ${type} deck`
      }
    }
  },
  orderings: [
    {
      title: 'Commander',
      name: 'commander',
      by: [
        {field: 'commander', direction: 'desc'}
      ]
    }
  ]
}
