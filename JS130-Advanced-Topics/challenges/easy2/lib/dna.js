/*
DNA type:
  strand:
    string or array?
    add validation (ACGT)
  hammingDistance(string): Compare this.strand with another strand. return nbr
                     of differences
*/
/*
hammingDistance(string)
INPUT: string
OUTPUT: number
RULES:
  - check number of mutations (compare differences between strands)
  - 2 strands of different length -> use shorter strand for comparison
  - edge case? '' compared to ''
  - edge case? '' compared to ''
ALGORITHM:
  1. Determine the shortest strand.
  2. For each letter of the shortest strand at index idx:
    - Compare the letters at idx.
      - Different -> distance += 1
  3. Return hammingDistance
*/

class DNA {
  constructor (strand) {
    this.strandValidation(strand);
    this.strand = strand;
  }

  strandValidation(strand) {
    if (strand.match(/[^AGCT]/g)) {
      throw Error ('Invalid strand. Valid nucleotides are A,G,C or T');
    }
  }
  hammingDistance(comparingStrand) {
    this.strandValidation(comparingStrand);
    let strand1;
    let strand2;

    if (this.strand.length <= comparingStrand.length) {
      [strand1, strand2] = [this.strand, comparingStrand];
    } else {
      [strand1, strand2] = [comparingStrand, this.strand];
    }

    let distance = 0;
    strand1.split('').forEach((nucleotide1, idx) => {
      let nucleotide2 = strand2[idx];
      if (nucleotide1 !== nucleotide2) {
        distance += 1;
      }
    });

    return distance;
  }
}

module.exports = DNA;
// let dna = new DNA ('');
// console.log(dna);
// // console.log(dna.hammingDistance(''));
