function letterCaseCount (str) {
  let lowercase = (str.match(/[a-z]/g) || []).length;
  let uppercase = (str.match(/[A-Z]/g) || []).length;
  let neither = (str.match(/[^a-z]/gi) || []).length;

  let count = {
    lowercase,
    uppercase,
    neither
  };

  console.log(count);
}

letterCaseCount('abCdef 123');  // { lowercase: 5, uppercase: 1, neither: 4 }
letterCaseCount('AbCd +Ef');    // { lowercase: 3, uppercase: 3, neither: 2 }
letterCaseCount('123');         // { lowercase: 0, uppercase: 0, neither: 3 }
letterCaseCount('');            // { lowercase: 0, uppercase: 0, neither: 0 }