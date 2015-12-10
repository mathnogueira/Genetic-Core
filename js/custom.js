// Implementação do trabalho de algoritmo genético para a disciplina de IA na UFLA
// Professor Ahmed Esmin

var Project = Project || {};

//
// Fábrica de candidatos ao problema.
//
Project.CandidateFactory = function() {};

// Herda a classe abstrata Factory
Project.CandidateFactory.prototype = new Genetic.Factory;

// Implementa a função de produção da fábrica.
Project.CandidateFactory.prototype.produce = function() {
    var candidate = new Project.Candidate();
    var value = Math.random() * (this.config.max - this.config.min) + this.config.min;
    candidate.setValue(value);
    return candidate;
}

// Configura a fábrica
Project.CandidateFactory.prototype.configure = function(config) {
    this.config = config.candidate;
}

// 
// Fábrica de população do problema.
//
Project.PopulationFactory = function() {}

// Herda a classe abstrata Factory
Project.PopulationFactory.prototype = new Genetic.Factory;

// Implementa a função de produção da fábrica
Project.PopulationFactory.prototype.produce = function() {
    var population = new Project.Population();
    population.configure(this.config);
    return population;
}

// Implementa a função de configuração da fábrica
Project.PopulationFactory.prototype.configure = function(config) {
    this.config = config.population;
}

//
// Candidato ao problema proposto pelo professor
//
Project.Candidate = function() {}

// Herda o candidato do algoritmo genético
Project.Candidate.prototype = new Genetic.Candidate;

// Implementa a função de cálculo de fitness do candidato
Project.Candidate.prototype.update = function() {
    // Calcula o fitness
}

//
// População do problema
//
Project.Population = function() {}

// Herda a população do algoritmo genético
Project.Population.prototype = new Genetic.Population;

// Implementa a função de configuração da população
Project.Population.prototype.configure = function(config) {
    this.config = config;
}

// Função auxiliar que pega um elemento aleatório do conjunto de candidatos
Project.Population.prototype.getCandidate = function() {
    var index = Math.floor(Math.random() *this.length());
    return this.set[index];
}

// Implementa a função de crossover do algoritmo genético
Project.Population.prototype.crossover = function(candidate) {
    var otherCandidate = this.getCandidate();
    var bin;
    if (candidate.binValue.length < otherCandidate.binValue.length) {
        bin1 = candidate.binValue;
        bin2 = otherCandidate.binValue;
    } else {
        bin1 = otherCandidate.binValue;
        bin2 = candidate.binValue;
    }
    // Pega um trecho aleatório de código binário
    var min = Math.floor(Math.random() * (bin1.length - 1)) + 1;
    var max = Math.floor(Math.random() * (bin1.length - min)) + min;
    var aux = bin.substring(min, max-min);
    var pointIndex = bin1.indexOf(".");
    // Ponto de inicio de troca
    var start = min;
    var end = max-min;
    // Checa se contém o ponto flutuante no trecho
    if (pointIndex >= 0) {
        // contém o ponto flutuante no trecho
        // procura a posição inicial da outra string
        start = bin2.indexOf(".") - pointIndex;
        end = start + (max-min);
    }
    // Faz a troca
    
}

// Implementa a função de mutação do algoritmo genético
Project.Population.prototype.mutate = function(candidate) {

}

var algorithm = new Genetic.Algorithm(new Project.CandidateFactory(), new Project.PopulationFactory());
algorithm.initialize({
    population: {
        maxSize: 10,
        crossoverRate: 60,
        mutationRate: 1,
    },
    candidate: {
        min: -10,
        max: 10,
    },
});

algorithm.next();
