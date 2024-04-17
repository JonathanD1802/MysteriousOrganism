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
CurrentOrganismNumber variable will keep track of the Current specimen number ; so that two specimens won't have the same number. 
CurrentOrganismeNumber is passed as an argument to the PAequorFactory function so that each time the function is called, the number is 
increased by one. 

the PAequorFactory function return an specimen's object that has 2 properties and 3 methods. 
The properties give us the specimen number that is generate and a random DNA with 15 bases with the mockUpStrand() passed as parameters.

the mutate() method take a random DNA Base from the dna propertie, and generate a new DNA base with the returnRandBase function until
the new DNA generated and the current DNA from the propertie are different. 
Then, it replaces the current DNA with the new one generate. to simulate the high rate of mutation.
finally it return the dna properties with the new base generate. 

ComparePAequor() method take another specimen as parameter. 
this function aims to compare the both dna properties of the two specimens. 
Each time a DNA base are equal and are at the same index, the function increase identicalDNABase by one. 
Then it prints to the user the percentage both specimens have in common if the formula (IndenticalDNABase * 100)/dna.length. 

The final methods willLikeliSurvive() computes the percentage of chance a specimen has to survive. 
it iterate through the dna array and increase the survivePercentage from 1 each time a specimen dna is equal to "C" or "G". 
Then, if the Math.round() methods it convert the survivePercentage into percentage. 
Finally if the percentage is equal or above 60%, it returns true. 
Otherwise, it returns false. 
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
  

//Specimens array that will contains 30 specimens that have greater chance to survive. 
let specimens = []; 

//The while loop create specimens and computes the chances a specimen has to survive, the if it has greater chance, 
//it push the specimen into the specimens array. 
while(specimens.length < 30){
  let specimenTest = PAequorFactory(); 
  if(specimenTest.willLikelySurvive()){
    specimens.push(specimenTest); 
  }; 
}; 
