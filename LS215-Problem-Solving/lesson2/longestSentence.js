/* eslint-disable max-len */
/*
longestSentence(text)
INPUT: text (string)
OUTPUT: the longest sentence (string), the number of words in the longest sentence
RULES:
  * Sentences end with: .!?
  * Sentences start with: a word character
  * words: any sequence of characters that is NOT 1)sentence end char OR 2) space
  * Longest sentence: watch out to not change any character.
EXAMPLES;
  - sentence_1! sentence_2. sentence_3? -> [sentence_1, sentence_2, sentence_3]
  - But, in a larger sense, we... -> ['But,', in, a, larger, 'sense,', we]
ALGORITHM:
  1. Split the text into sentences. Keep the end character.
  2. Count the number of words for each sentence.
  3. Log the longest sentence and its number of words
------------
findLongestSentence(sentenceData)
I: array of objects {sentence, numberOfWords}
O: longestSentenceData (object)
ALGORITHM:
  1. Sort by number of words the sentences in descending order.
  2. Return the first sentence of the array
*/

"use strict";

function splitIntoSentences(text) {
  const SENTENCE_REGEX = /\b[^.!?]*[.!?]/g;
  return (text.match(SENTENCE_REGEX) || []);
}

function countWords(sentence) {
  return sentence.split(' ').length;
}

function generateSentenceObject(sentence) {
  let numberOfWords = countWords(sentence);
  return {
    sentence,
    numberOfWords
  };
}

function findLongestSentenceObject(sentencesData) {
  return sentencesData.sort((a,b) => b.numberOfWords - a.numberOfWords)[0];
}

function logResults(sentenceData) {
  console.log(sentenceData.sentence);
  console.log('');
  console.log(`The longest sentence has ${sentenceData.numberOfWords}`);
}

function longestSentence(text) {
  if (!text.length) {
    console.log('Empty string');
    return null;
  }

  let sentences = splitIntoSentences(text);
  let sentencesData = sentences.map(generateSentenceObject);
  let longestSentenceData = findLongestSentenceObject(sentencesData);

  logResults(longestSentenceData);
}

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

let longText2 = 'Four score and seven years ago our fathers brought forth' +
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
' here have thus far so nobly advanced.';

longestSentence(longText);

// console output
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.

// The longest sentence has 86 words.

console.log('\n');

longestSentence(longText2);

// console output
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.

// The longest sentence has 30 words.


console.log('\n');

longestSentence('A.');

console.log('\n');

longestSentence('');