"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var BeerSong = /*#__PURE__*/function () {
  function BeerSong() {
    _classCallCheck(this, BeerSong);
  }

  _createClass(BeerSong, null, [{
    key: "verse",
    value: // eslint-disable-next-line max-lines-per-function
    function verse(nbrOfBottles) {
      switch (nbrOfBottles) {
        case 0:
          return "No more bottles of beer on the wall, no more " + "bottles of beer.\nGo to the store and buy some " + "more, 99 bottles of beer on the wall.\n";

        case 1:
          return "".concat(nbrOfBottles, " bottle of beer on the wall, ").concat(nbrOfBottles, " ") + "bottle of beer.\n" + "Take it down and pass it around, no more bottles " + "of beer on the wall.\n";

        case 2:
          return "".concat(nbrOfBottles, " bottles of beer on the wall, ").concat(nbrOfBottles, " ") + "bottles of beer.\n" + "Take one down and pass it around, ".concat(nbrOfBottles - 1, " bottle ") + "of beer on the wall.\n";

        default:
          return "".concat(nbrOfBottles, " bottles of beer on the wall, ").concat(nbrOfBottles, " ") + "bottles of beer.\n" + "Take one down and pass it around, ".concat(nbrOfBottles - 1, " bottles ") + "of beer on the wall.\n";
      }
    }
  }, {
    key: "verses",
    value: function verses(upperLimitOfNumberOfBottles, lowerLimitOfNumberOfBottles) {
      var verses = '';

      for (var nbrOfBottles = upperLimitOfNumberOfBottles; nbrOfBottles >= lowerLimitOfNumberOfBottles; nbrOfBottles -= 1) {
        verses += this.verse(nbrOfBottles);

        if (nbrOfBottles > lowerLimitOfNumberOfBottles) {
          verses += '\n';
        }
      }

      return verses;
    }
  }, {
    key: "lyrics",
    value: function lyrics() {
      var NBR_OF_BOTTLES_OF_THE_FIRST_VERSE = 99;
      var NBR_OF_BOTTLES_OF_THE_LAST_VERSE = 0;
      return this.verses(NBR_OF_BOTTLES_OF_THE_FIRST_VERSE, NBR_OF_BOTTLES_OF_THE_LAST_VERSE);
    }
  }]);

  return BeerSong;
}();

console.log(BeerSong.verses(99, 98));
var expected = "99 bottles of beer on the wall, 99 bottles of beer.\n" + "Take one down and pass it around, 98 bottles of beer " + "on the wall.\n\n98 bottles of beer on the wall, " + "98 bottles of beer.\nTake one down and pass it " + "around, 97 bottles of beer on the wall.\n\n";
console.log(expected);
module.exports = BeerSong;