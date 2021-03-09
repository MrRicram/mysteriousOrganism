// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Organism factory
const pAequorFactory = (specimenNum, dna) => {
  return ({
      specimenNum,
      dna,
      mutate() {
        let baseIndex = Math.floor(Math.random() * this.dna.length);
        let newBase = this.dna[baseIndex];

        while (newBase === this.dna[baseIndex])
          newBase = returnRandBase();

        this.dna[baseIndex] = newBase;
        return this.dna;
      },
      compareDNA(pAequor) {
        let equals = 0;
        
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === pAequor.dna[i])
            equals++;
        }

        equals = ((equals / 15) * 100).toFixed(2);
        console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${equals}% DNA in common`);
      },
      willLikelySurvive() {
        let count = 0;
        this.dna.forEach(base => base === 'C' || base === 'G' ? count++ : count);
        
        count = ((count / 15) * 100).toFixed(2);

        return count >= 60 ? true : false;
      }
    });
}

// Create x amount of pAequor that will survive
const createXOrganisms = amount => {
  let organisms = [];
  console.log('before: ' + organisms);
  return createOrganism(amount, organisms);
}

// CReates a pAequor that will survive
const createOrganism = (amount, organisms) => {
  let organism;

  if (amount === 0)
    return organisms;

  do {
    organism = pAequorFactory(amount, mockUpStrand());
  } while (!organism.willLikelySurvive());

  organisms.unshift(organism);

  return createOrganism(amount - 1, organisms);
}


// Tests

let organisms = createXOrganisms(30);

// Uncomment to check if all organisms will survive
//organisms.forEach(organism => console.log(organism.willLikelySurvive()));

// Uncomment to see all organisms - pAequor - inside the array
//console.log(Object.values(organisms));


