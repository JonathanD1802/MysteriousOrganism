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

/* 
currentOrganismNumber and PAequorFactory function are associated. 

*/
let currentOrganismNumber = 1; 
const PAequorFactory = (number = currentOrganismNumber,DNAbases = mockUpStrand() ) => {
  currentOrganismNumber += 1; 
  return {
    specimenNum : number, 
    dna : DNAbases, 
    mutate(){
      let indexRandomBase = Math.floor(Math.random()*(this.dna.length)); 
      let GenerateDNA = returnRandBase(); 
      while(this.dna[indexRandomBase] === GenerateDNA){ 
        GenerateDNA = returnRandBase(); 
      }
      this.dna[indexRandomBase] = GenerateDNA; 
      return this.dna; 
      }, 
    comparePAequor(anotherSpecimen){
      let identicalDnaBase = 0; 
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === anotherSpecimen.dna[i]){
          identicalDnaBase ++; 
        };  
      }; 
    console.log(`Specimen #${this.specimenNum} and Specimen #${anotherSpecimen.specimenNum} have ${Math.round((identicalDnaBase*100)/this.dna.length, 0)}% DNA bases in common.`);
    },
    willLikelySurvive(){
      let survivePercentage = 0; 
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === 'C' || this.dna[i] === 'G'){
          survivePercentage ++; 
        }
      }
      survivePercentage = Math.round((survivePercentage*100)/this.dna.length, 0); 
      if(survivePercentage >= 60){
        return true; 
      }else{
        return false; 
      }; 
    }, 
  }; 
}; 
  

let specimens = []; 

while(specimens.length < 30){
  let specimenTest = PAequorFactory(); 
  if(specimenTest.willLikelySurvive()){
    specimens.push(specimenTest); 
  }; 
}; 
