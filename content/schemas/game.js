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
      title: 'Deck',
      name: 'deck',
      type: 'reference',
      to: [{ type: 'deck' }],
      validation: Rule => Rule.required()
    },
    {
      title: 'Opponents',
      name: 'opponents',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'deck' }]
      }]
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
  ]
}
