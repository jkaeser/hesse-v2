import React from 'react'

export default {
  title: 'Player',
  name: 'player',
  type: 'document',
  fields: [
    {
      title: 'First Name',
      name: 'nameFirst',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Last Name',
      name: 'nameLast',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      nameFirst: 'nameFirst',
      nameLast: 'nameLast',
    },
    prepare(selection) {
      const { nameFirst, nameLast } = selection;
      return {
        title: `${nameFirst} ${nameLast}`,
        media: <span style={{ fontSize: '1.5rem' }}>👽</span>,
      }
    },
  },
}
