class Questions {
   constructor(choosenCategories) {
   	this.categories = choosenCategories;
	this.questions = {}
	
	for (var i = 0 ; i < this.categories.length; i++)
	   this.questions[this.categories[i]] = new Array();
	
	this.generateQuestions(50);
   }

   generateQuestion(prefix, index) {
   	return `${prefix} Question ${index}`;
   }

   generateQuestions(amount) {
	this.questions = {}
	for (var c in this.categories)
	   this.questions[this.categories[c]] = new Array()

	for (var i = 0; i < amount; i++)
	   for (var j = 0; j < this.categories.length; j++)
		   this.questions[this.categories[j]].push(this.generateQuestion(this.categories[j], i));
	
   }

   askQuestion(category) {
	return this.questions[category].shift();
   }
}

module.exports = Questions; 
