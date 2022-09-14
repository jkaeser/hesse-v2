import React from 'react'

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
      title: 'Owner',
      name: 'owner',
      type: 'reference',
      to: [{ type: 'player' }],
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
      nameFirst: 'owner.nameFirst',
      nameLast: 'owner.nameLast',
    },
    prepare(selection) {
      const { commander, status, nameFirst, nameLast } = selection;
      return {
        title: commander,
        subtitle: `${nameFirst} ${nameLast} (${status})`,
        media: <span style={{ fontSize: '1.5rem' }}>🦸</span>
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
