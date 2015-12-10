// Implementação genérica de um algoritmo genético que é possível de se
// configurar.
var Genetic = Genetic || {};

// Padrão de projetos: Abstract Factory
// Interface que deve ser utilizada por qualquer fábrica de instâncias
Genetic.Factory = function() {
    // Configuração da fábrica
    this.config = undefined;
}

// Configura a fábrica
Genetic.Factory.prototype.configure = function(config) {
}

// Cria uma instância
Genetic.Factory.prototype.produce = function() {
    return undefined;
}

// ================================================================================================
//
// Classe que representa uma potencial solução para o problema.
//
// ================================================================================================
Genetic.Candidate = function() {
    
    // Fitness do candidato
    this.fitness = 0;

    // Valor do candidato
    this.value = 0;

    // Valor do candidato em binário
    this.binValue = 0;

}

// Calcula o fitness do candidato
Genetic.Candidate.prototype.update = function() {
    this.fitness = 0;
}

// Define o valor do candidato
Genetic.Candidate.prototype.setValue = function(value) {
    this.value = value;
    // Atualiza o valor binário do candidato
    this.updateBinValue();
}

// Define o valor binário do candidato
Genetic.Candidate.prototype.setBinValue = function(value) {
    this.binValue = value;
    // Atualiza o valor decimal do candidato
    this.updateValue();
}

// Atualiza o valor binário do candidato
Genetic.Candidate.prototype.updateBinValue = function() {
    this.binValue = this.value.toString(2);
    this.updateValue();
}

Genetic.Candidate.prototype.updateValue = function() {
    var aux = this.binValue.toString().split(".");
    var decimal = aux[0];
    var fracional = aux[1];
    var soma = 0;
    var resultado;
    decimal = parseInt(decimal, 2);
    // Calcula a parte fracionaria do número
    // Somatorio ( bin(i) * 2^-i )
    for (var index = 0; index < fracional.length; ++index) {
        soma += parseInt(fracional[index]) * Math.pow(2, -(index+1));
    }
    if (decimal >= 0)
        resultado = decimal + soma;
    else
        resultado = decimal - soma;
    this.value = resultado;
}

// ================================================================================================
// População de candidatos a soluções do problema.
// ================================================================================================
Genetic.Population = function() {

  // Conjunto de candidatos da população
  this.set = [];

  // Configuração da população
  this.config = undefined;

}

// Função de configuração da população
Genetic.Population.prototype.configure = function(config) {
    this.config = config;
}

//
// Pega o número de candidatos na população
//
Genetic.Population.prototype.length = function() {
    return this.set.length;
}

// Adiciona um candidato à população
Genetic.Population.prototype.add = function(candidate) {
    this.set.push(candidate);
}

// Atualiza o fitness de todos os candidatos da população
Genetic.Population.prototype.updateFitness = function() {
    // Percorre todos os candidatos da população e calcula seu fitness
    for (var i in this.set) {
        this.set[i].update();
    }
}

// Função que faz o crossover do candidato indicado e outro candidato da
// população.
Genetic.Population.prototype.crossover = function(candidate) {}

// Função que faz com que o candidato passe por uma mutação
Genetic.Population.prototype.mutate = function(candidate) {}

// Checa se haverá crossover com os candidatos da população, caso algum seja selecionado,
// envia esse candidato para outra função de crossover que deverá ser implementada pelo
// programador.
Genetic.Population.prototype.__crossover = function() {
    // Chance de cruzar
    var chance = 0;
    // Percorre todos os candidatos da população e checa se ele
    // irá cruzar com algum outro.
    for (var i in this.set) {
        chance = Math.random() * 100;
        if (chance <= this.config.crossoverRate) {
            // Realiza o crossover
            this.crossover(this.set[i]);
        }
    }
    return this;
}

// Checa se haverá mutação nos candidatos da população
Genetic.Population.prototype.__mutate = function() {
    // Chance de mutar
    var chance = 0;
    // Percorre todos os candidatos da população e checa se ele
    // irá mutar.
    for (var i in this.set) {
        chance = Math.random() * 100;
        if (chance <= this.config.mutationRate) {
            // Realiza a mutação
            this.mutate(this.set[i]);
        }
    }
}

// Preenche a população utilizando uma fábrica de candidatos
// parametros:
//     candidateFactory: fábrica de candidatos
Genetic.Population.prototype.fill = function(candidateFactory) {
    // Preenche a população com o número máximo de candidatos
    for (var i = 0; i < this.config.maxSize; ++i) {
        this.add(candidateFactory.produce());
    }
}

// ================================================================================================
//
// Classe que controla o funcionamento do algoritmo genético
// parametros:
//     candidateFactory: fábrica que cria as instâncias de candidatos que serão usados pelo algoritmo
//     populationFactory: fábrica que cria a população de candidatos que serão usados pelo algoritmo
//
// ================================================================================================
Genetic.Algorithm = function(candidateFactory, populationFactory) {

    // Fábrica que cria as instâncias dos candidatos
    this.candidateFactory = candidateFactory;

    // Fábrica que cria as populações dos candidatos
    this.populationFactory = populationFactory;

    // População que está sendo evoluída no momento.
    this.population = undefined;

    // Número da geração atual
    this.generation = 0;


}

// Cria a primeira geração aleatória do algoritmo
// parametros:
//     config: objeto de configuração do algoritmo
Genetic.Algorithm.prototype.initialize = function(config) {
    // Configura a fabrica de população
    this.populationFactory.configure(config);
    // Configura a fábrica de candidatos
    this.candidateFactory.configure(config);
    // Cria uma população
    this.population = this.populationFactory.produce();
    // Preenche a população de forma aleatória
    this.population.fill(this.candidateFactory);
}

// Avança uma geração de indivíduos
//
Genetic.Algorithm.prototype.next = function() {
    // Aumenta o número da geração
    this.generation++;
    // Calcula o fitness de todos os indivíduos da população
    this.population.updateFitness();
    // Calcula o crossover dos indivíduos da população
    this.crossover();
    // Calcula a mutação dos indivíduos
    this.mutate();
}

// Cruza os candidatos da população e forma uma nova população para a nova
// geração do algoritmo.
Genetic.Algorithm.prototype.crossover = function() {
    // Atualiza a população após realizar o crossover
    this.population = this.population.__crossover();
}

// Muta alguns candidatos da população para prover materia de DNA diferente
// durante a evolução da solução.
Genetic.Algorithm.prototype.mutate = function() {
    this.population.__mutate();
}
