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
      // solo -> true if used for only 2 ; false to compare between an array of organisms 
      // Avoids logging all the comparissons when comparring all the organisms in an array
      compareDNA(pAequor, solo) { 
        let equals = 0;
        
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === pAequor.dna[i])
            equals++;
        }

        equals = ((equals / 15) * 100).toFixed(2);

        if (!solo)
          return equals;
       
        console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${equals}% DNA in common`);
      },
      willLikelySurvive() {
        let count = 0;
        this.dna.forEach(base => base === 'C' || base === 'G' ? count++ : count);
        
        count = ((count / 15) * 100).toFixed(2);

        return count >= 60 ? true : false;
      },
      complementStrand() {
        return this.dna.map(base => base === 'A' ? base = 'T' : base === 'T' ? base = 'A' : base === 'C' ? base = 'G' : base = 'C');
      }
    });
}

// Creates x amount of pAequor that will survive
const createXOrganisms = amount => {
  let organisms = [];

  return createOrganism(amount, organisms);
}

// Creates a pAequor that will survive
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

// Finds the most related pair of organisms
const findMostRealted = organisms => {
  let mostRelated = {org1: 0, org2: 0, per: 0};

  for (let i = 0; i < organisms.length; i++) {
    for (let j = i + 1 ; j < organisms.length; j++) {
      let compare = organisms[i].compareDNA(organisms[j], false);

      if (compare > mostRelated.per) {
        mostRelated.org1 = organisms[i].specimenNum;
        mostRelated.org2 = organisms[j].specimenNum;
        mostRelated.per = compare;
      }
    }
  }

  console.log(`specimen #${mostRelated.org1} and specimen #${mostRelated.org2} are the most related with as ${mostRelated.per}% DNA in common`);
}

// Tests

let organisms = createXOrganisms(30);

// Uncomment to check if all organisms will survive
// organisms.forEach(organism => console.log(organism.willLikelySurvive()));

// Uncomment to see all organisms - pAequor - inside the array
// console.log(Object.values(organisms));

// Uncomment to see a complementary Strand of an organism
// console.log(organisms[0].complementStrand());

// Uncomment to see which pair is the most related
// findMostRealted(organisms);

