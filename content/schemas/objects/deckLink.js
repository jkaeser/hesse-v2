const options = ['TappedOut', 'Moxfield', 'Other'].map(option => (
  { title: option, value: option }
))

export default {
  title: 'Link',
  name: 'deckLink',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      options: {
        list: [
          ...options
        ]
      }
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    }
  ]
}
