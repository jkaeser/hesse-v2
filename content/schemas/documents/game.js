import React from 'react'
import formatDate from '../../../src/utils/js/formatters/date'

export default {
  title: 'Game',
  name: 'game',
  type: 'document',
  fields: [
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      title: 'Decks',
      name: 'decks',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'deck' }],
      }],
    },
    {
      title: 'Winner',
      name: 'winner',
      type: 'reference',
      to: [{ type: 'deck' }],
    },
    {
      title: 'Result',
      name: 'result',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Win', value: 'win' },
          { title: 'Loss', value: 'loss' },
          { title: 'Draw', value: 'draw' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Summary',
      name: 'summary',
      type: 'text'
    }
  ],
  preview: {
    select: {
      date: 'date',
      winner: 'winner.commander',
    },
    prepare(selection) {
      const {date, winner} = selection;
      return {
        title: formatDate(date),
        subtitle: winner,
        media: <span style={{fontSize: '1.5rem'}}>👾</span>
      }
    }
  },
  orderings: [
    {
      title: 'Date Played',
      name: 'datePlayed',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    }
  ]
}
