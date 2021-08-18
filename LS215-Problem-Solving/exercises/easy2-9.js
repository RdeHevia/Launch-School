/*
I: string
O: string with non alphabetic chars replaced by a space
RULES:
  - the result string can't have consecutive chars
DS: string 
ALGORITHM:
  - replace all non alphabetic chars by a space
  - replace consecutive spaces by one space
  - return the new string
*/

function cleanUp(string) {
  return string.replace(/[^a-z]+/gi, ' ');
}

console.log(cleanUp("---what's my +*& line?"));    // " what s my line ")