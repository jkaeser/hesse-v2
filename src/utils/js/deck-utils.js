export class Decks {
  constructor(decks) {
    this.decks = decks.sort((a, b) => ( a.commander >= b.commander ? 1 : -1));
  }
}
