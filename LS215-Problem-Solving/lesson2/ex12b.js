/*
Write a program that determines the sentence with the most words in some text. 
Sentences may end with periods (.), exclamation points (!), or question marks 
(?). Sentences always begin with a word character. You should treat any sequence
 of characters that are not spaces or sentence-ending characters, as a word. Log
  the longest sentence and its word count to the console. Pay attention to the 
  expected output. Note that this problem is about manipulating and processing 
  strings. As such, every detail about the string matters (e.g., case, 
    punctuation, tabs, spaces, etc.).
*/

/*
INPUT: text
  - data type: string
OUTPUT: undefined
  - logs longest sentence and the word count
  - data type: string
RULES:
  - sentences:
    - composed of words
    - end with .!?
    - begging with a word character
  - words: 
    - any sequence of no spaces or sentence-ending characters
      - e.g. abc, aBc, 1%^_ are all valid words.
    - separated by any nubmer of spaces, \n, \t..
  - input:
    - empty string or only spaces: return null
    - only spaces and sentence separators: return null
    - wrong data type -> assume not
    - 1 sentence -> return that sentence and the count
      - 1 sentece might not have a sentence separator character
    - some empty sentences, and others not -> ignore empty sentences
  - leading spaces should be removed from the sentence logged to the console.

EXAMPLE:
Ab cdEf.   xxx yy zz. ->'    xxx yy zz.' is the longes snetnece (3 words)
Ab cdEf. -> Ab cdEf. (2 words)
Ab cdEf -> Ab cdEf (2 words)
     ! ab cd

DATA STRUCTURE:
  - sentences: array [sentence1, sentence2...]; sentence: string
  - words: array [word1, word2...]; word: string
  - sentencesAndCount: [sentenceAndCount1, sentenceAndCount2...]
    - sentenceAndCount{sentence: string, wordCount: number}
ALGORITHM:
  - no argument provided -> null
  - no word characters -> null
  - replace duplicated spaces with a single space; REGEX, replace
  - check if the text contains sentence separator chars .!?, REGEX match
    - no -> we only have 1 sentence -> add that to the array sentences
    - yes:
      - split the text into sentences
        - beg: word character
        - end: .!?
  * map sentences into an array of objects (sentencesAndCount); getSentenceAndWordCount
  - order sentencesAndCount by count in DESC
  - the first element is the maximum count
    - log sentence
    - log wordCount
================
getSentenceAndWordCount
DS: words array
ALGORITHM:
  - split the sentence into words (words are separated by spaces)
  - count the nubmer of words (length of the array)
*/

function getSentenceAndWordCount(sentence) {
  let wordCount = sentence.split(' ').length;
  return {sentence, wordCount};
}

// console.log(getSentenceAndWordCount('ab!'));

function longestSentence(text) {
  if (text === undefined || !text.match(/[^\s!?.]/)) {
    console.log('wrong input');
    return null;
  }
  let cleanedText = text.replace(/\s+/g, ' ');
  let sentences = [];
  if (cleanedText.match(/[.!?]/)) {
    sentences = cleanedText.match(/\b[^.?!]+[.?!]/g);
  } else {
    sentences = cleanedText.match(/\b[^.?!]+/g);
  }
  let sentencesAndCount = sentences.map(getSentenceAndWordCount);
  let longestSentenceAndCount = sentencesAndCount.sort((a, b) => {
    return b.wordCount - a.wordCount;
  })[0];
  console.log(`Longest sentence:`);
  console.log(longestSentenceAndCount.sentence);
  console.log(`Word count: ${longestSentenceAndCount.wordCount}`);
}


// // TEST CASES
// // - empty string or only spaces or no argument passed: return null
longestSentence(''); //null
longestSentence('   \n   \t    \t '); //null
longestSentence(); //null
// // - only spaces and sentence separators: return null
longestSentence('  . \n  ! \t  ? ? \t .'); //null
// // - 1 sentence with separator
longestSentence('ab cdef.'); // 'ab cdef.' && 2 words
longestSentence('Ab CDEF.'); // 'Ab CDEF.' && 2 words
// // word characters
longestSentence('a1 cd-f.'); // 'a1 cd-f.' && 2 words
longestSentence('%^a1 cd-f.'); // '%^a1 cd-f.' && 2 words
longestSentence('    \t   \n ab cdef.'); // 'ab cdef.' && 2 words
// // - words with single char
longestSentence('a B c.'); // 'Ab CDEF.' && 3 words
// // - 1 sentence with no separator
longestSentence('ab cdef'); // 'ab cdef' && 2 words
// // multiple sentences
longestSentence('Ab cdef. lm NO pqRST? u w xyz zzz!'); // 'u w xyz zzz!' && 4 words
longestSentence('Ab cdef? lm NO pqRST! u w xyz zzz?'); // 'u w xyz zzz!' && 4 words
longestSentence('Ab cdef. lm NO pqRST. u w xyz'); // 'lm NO pqRST.' && 3 words
// // multiple sentences and some of them empty
longestSentence('   \n   \t  . lm NO pqRST? \t \n! u w xyz zzz!'); // 'u w xyz zzz!' && 4 words
// // long text

let longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

  longestSentence(longText);

  // It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.

  // The longest sentence has 86 words.