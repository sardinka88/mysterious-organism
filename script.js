// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create pAequor specimens
const pAequorFactory = (number, dnaBase) => {
  return {
    // Unique identifier for the specimen
    specimenNum: number,
    // Initial DNA sequence
    dna: dnaBase,
    // Method to mutate the DNA sequence
    mutate() {
      let randomBaseNum = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomBaseNum] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomBaseNum] = newBase;
      return this.dna;
    },
    // Method to compare DNA with another specimen
    compareDNA(otherSpecimen) {
      // Count of matching bases
      let matches = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherSpecimen.dna[i]) matches += 1;
      }
      // Calculating the percentage of matching DNA bases
      const percentage = ((matches / this.dna.length) * 100).toFixed(2);
      return `Specimen #${this.specimenNum} and specimen #${otherSpecimen.specimenNum} have ${percentage}% DNA in common`;
    },
    // assess whether the specimen is likely to survive based on the percentage of guanine (G) and cytosine (C) bases in its DNA sequence (min 60%)
    willLikelySurvive() {
      let countGC = 0;
      this.dna.forEach((base) => {
        if (base === "C" || base === "G") countGC += 1;
      });
      const percentageGC = ((countGC / this.dna.length) * 100).toFixed(2);
      if (percentageGC >= 60) return true;
      else return false;
    },
  };
};

// Array to store instances that can likely survive
const pAequorinstances = [];
// Create instances until you have exactly 30 that are likely to survive
let i = 1;
while (pAequorinstances.length < 30) {
  let instance = pAequorFactory(i, mockUpStrand());
  if (instance.willLikelySurvive()) {
    pAequorinstances.push(instance);
    i++;
  }
}

// check if all instances inside the array are likely to survive
pAequorinstances.forEach((specimen) => {
  console.log(
    `Specimen #${
      specimen.specimenNum
    } is likely to survive: ${specimen.willLikelySurvive()}`
  );
});
