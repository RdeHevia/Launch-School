/*
I: string (text)
O: logs. text with some info.
  - number of positive words
  - list of positive words (sentiments)
  - same for the negative words
  - the sentiment of the text
E:
  5 positive, 6 negative -> 5 - 6 = -1 < 0 -> text is negative
ALGORITHM:
  0. Remove all characters that are not alphanumeric or spaces.
  1. Split the text into words
  2. For each word, check if it's a positive / negative word. Add to list if so
  3. Count the positive and negative words
  4. Compute the total count
  5. Log the stats
*/
/*
I: (text, wordsToMatch[])
O: array of matching words
RULES:
a word is separated by:
 - spaces, change of line
 - 
ALGORITHM:
  0. Declare an empty array to store the matches
  1. Iterate over the array of words to match. For each word:
    1.1. Find all the matches of that word in the text and add them to the empty array.
  
 */

function removeSpecialChars(text) {
  const REGEX = /[^\s0-9a-z']/gi;
  return text.replace(REGEX, '');
}

function matchWords (text, wordsToMatch) {
  let cleanedText = removeSpecialChars(text);

  let matches = cleanedText.split(/\s/).filter(word => {
    return wordsToMatch.includes(word);
  });
  return matches;
}

function getSentimentOfText (positiveCount, negativeCount) {
  let sentimentScore = positiveCount - negativeCount;
  if (sentimentScore > 0) {
    return 'Positive';
  } else if (sentimentScore < 0) {
    return 'Negative';
  } else {
    return 'Neutral';
  }
}

function logSentimentReport(
  positiveWordsInTheText, negativeWordsInTheText,
  positiveCount, negativeCount, sentimentOfText
) {
  console.log(`There are ${positiveCount} words in the text`);
  console.log(`Positive sentiments: ${positiveWordsInTheText.join(', ')}\n`);

  console.log(`There are ${negativeCount} words in the text`);
  console.log(`Negative sentiments: ${negativeWordsInTheText.join(', ')}\n`);

  console.log(`The sentiment of the text is ${sentimentOfText}`);
}

// eslint-disable-next-line max-lines-per-function
function sentiment(text) {
  let positiveWords = ['fortune', 'dream', 'love', 'respect', 'patience', 'devout', 'noble', 'resolution'];
  let negativeWords = ['die', 'heartache', 'death', 'despise', 'scorn', 'weary', 'trouble', 'oppress'];

  let positiveWordsInTheText = matchWords(text, positiveWords);
  let negativeWordsInTheText = matchWords(text, negativeWords);

  let positiveCount = positiveWordsInTheText.length;
  let negativeCount = negativeWordsInTheText.length;
  let sentimentOfText = getSentimentOfText(positiveCount, negativeCount);

  logSentimentReport(
    positiveWordsInTheText, negativeWordsInTheText,
    positiveCount, negativeCount, sentimentOfText
  );

}

let textExcerpt = 'To be or not to be-that is the question:\n' +
'Whether \'tis nobler in the mind to suffer\n' +
'The slings and arrows of outrageous fortune,\n' +
'Or to take arms against a sea of troubles,\n' +
'And, by opposing, end them. To die, to sleep-\n' +
'No more-and by a sleep to say we end\n' +
'The heartache and the thousand natural shocks\n' +
'That flesh is heir to-\'tis a consummation\n' +
'Devoutly to be wished. To die, to sleep-\n' +
'To sleep, perchance to dream. Aye, there\'s the rub,\n' +
'For in that sleep of death what dreams may come,\n' +
'When we have shuffled off this mortal coil,\n' +
'Must give us pause. There\'s the respect\n' +
'That makes calamity of so long life.\n' +
'For who would bear the whips and scorns of time,\n' +
'Th\' oppressor\'s wrong, the proud man\'s contumely, [F: poor]\n' +
'The pangs of despised love, the law’s delay, [F: disprized]\n' +
'The insolence of office, and the spurns\n' +
'That patient merit of the unworthy takes,\n' +
'When he himself might his quietus make\n' +
'With a bare bodkin? Who would fardels bear, [F: these Fardels]\n' +
'To grunt and sweat under a weary life,\n' +
'But that the dread of something after death,\n' +
'The undiscovered country from whose bourn\n' +
'No traveler returns, puzzles the will\n' +
'And makes us rather bear those ills we have\n' +
'Than fly to others that we know not of?\n' +
'Thus conscience does make cowards of us all,\n' +
'And thus the native hue of resolution\n' +
'Is sicklied o\'er with the pale cast of thought,\n' +
'And enterprises of great pitch and moment, [F: pith]\n' +
'With this regard their currents turn awry, [F: away]\n' +
'And lose the name of action.-Soft you now,\n' +
'The fair Ophelia.-Nymph, in thy orisons\n' +
'Be all my sins remembered';


sentiment(textExcerpt);

// console output

// There are 5 positive words in the text.
// Positive sentiments: fortune, dream, respect, love, resolution

// There are 6 negative words in the text.
// Negative sentiments: die, heartache, die, death, weary, death

// The sentiment of the text is Negative.