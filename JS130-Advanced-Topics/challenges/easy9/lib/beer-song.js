/*
type BeerSong:
  - verse (numberOfVerses)
  - whole song
EXAMPLE:
1st verse (nbrBottles):
  {nbrBottles} bottles of beer...., {nbrBottles} ....
  Take one down...., {nbrBottles - 1} ....
  on the wall
*/

class BeerSong {
  // eslint-disable-next-line max-lines-per-function
  static verse(nbrOfBottles) {
    switch (nbrOfBottles) {
      case 0:
        return "No more bottles of beer on the wall, no more " +
        "bottles of beer.\nGo to the store and buy some " +
        "more, 99 bottles of beer on the wall.\n";
      case 1:
        return `${nbrOfBottles} bottle of beer on the wall, ${nbrOfBottles} ` +
          `bottle of beer.\n` +
          `Take it down and pass it around, no more bottles ` +
          `of beer on the wall.\n`;
      case 2:
        return `${nbrOfBottles} bottles of beer on the wall, ${nbrOfBottles} ` +
          `bottles of beer.\n` +
          `Take one down and pass it around, ${nbrOfBottles - 1} bottle ` +
          `of beer on the wall.\n`;
      default:
        return `${nbrOfBottles} bottles of beer on the wall, ${nbrOfBottles} ` +
          `bottles of beer.\n` +
          `Take one down and pass it around, ${nbrOfBottles - 1} bottles ` +
          `of beer on the wall.\n`;
    }
  }

  static verses (upperLimitOfNumberOfBottles, lowerLimitOfNumberOfBottles) {
    let verses = '';

    for (
      let nbrOfBottles = upperLimitOfNumberOfBottles;
      nbrOfBottles >= lowerLimitOfNumberOfBottles;
      nbrOfBottles -= 1
    ) {
      verses += this.verse(nbrOfBottles);
      if (nbrOfBottles > lowerLimitOfNumberOfBottles) {
        verses += '\n';
      }
    }

    return verses;
  }

  static lyrics() {
    const NBR_OF_BOTTLES_OF_THE_FIRST_VERSE = 99;
    const NBR_OF_BOTTLES_OF_THE_LAST_VERSE = 0;
    return this.verses(
      NBR_OF_BOTTLES_OF_THE_FIRST_VERSE,NBR_OF_BOTTLES_OF_THE_LAST_VERSE
    );
  }
}
console.log(BeerSong.verses(99,98));


let expected = "99 bottles of beer on the wall, 99 bottles of beer.\n" +
"Take one down and pass it around, 98 bottles of beer " +
"on the wall.\n\n98 bottles of beer on the wall, " +
"98 bottles of beer.\nTake one down and pass it " +
"around, 97 bottles of beer on the wall.\n\n";
console.log(expected);
module.exports = BeerSong;