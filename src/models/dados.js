const bruxos = [
    {
        id: 1,
        nome: "Harry Potter",
        casa: "Grifinória",
        anoNascimento: 1980,
        especialidade: "Defesa Contra as Artes das Trevas",
        nivelMagia: "Avançado",
        ativo: true
    },
    {
        id: 2,
        nome: "Hermione Granger",
        casa: "Grifinória", 
        anoNascimento: 1979,
        especialidade: "Transfiguração",
        nivelMagia: "Mestre",
        ativo: true
    },
    {
        id: 3,
        nome: "Draco Malfoy",
        casa: "Sonserina",
        anoNascimento: 1980,
        especialidade: "Poções",
        nivelMagia: "Intermediário",
        ativo: false
    },
    {
        id: 4,
        nome: "Luna Lovegood",
        casa: "Corvinal",
        anoNascimento: 1981,
        especialidade: "Criaturas Mágicas",
        nivelMagia: "Avançado",
        ativo: true
    },
    {
        id: 5,
        nome: "Neville Longbottom",
        casa: "Grifinória",
        anoNascimento: 1980,
        especialidade: "Herbologia",
        nivelMagia: "Avançado",
        ativo: true
    },
    {
        id: 6,
        nome: "Severo Snape",
        casa: "Sonserina",
        anoNascimento: 1960,
        especialidade: "Poções",
        nivelMagia: "Mestre",
        ativo: false
    },
    {
        id: 7,
        nome: "Minerva McGonagall",
        casa: "Grifinória",
        anoNascimento: 1935,
        especialidade: "Transfiguração",
        nivelMagia: "Mestre",
        ativo: true
    },
    {
        id: 8,
        nome: "Alvo Dumbledore",
        casa: "Grifinória",
        anoNascimento: 1881,
        especialidade: "Feitiços Avançados",
        nivelMagia: "Lendário",
        ativo: false
    }
];

const casas = [
    { id: 1, nome: "Grifinória", fundadora: "Godric Gryffindor", cores: "Vermelho e Dourado", animal: "Leão" },
    { id: 2, nome: "Sonserina", fundadora: "Salazar Slytherin", cores: "Verde e Prata", animal: "Serpente" },
    { id: 3, nome: "Corvinal", fundadora: "Rowena Ravenclaw", cores: "Azul e Bronze", animal: "Águia" },
    { id: 4, nome: "Lufa-Lufa", fundadora: "Helga Hufflepuff", cores: "Amarelo e Preto", animal: "Texugo" },
];

const varinhas = [
    { id: 1, material: "Azevinho", nucleo: "Pena de Fênix", comprimento: 28 },
    { id: 2, material: "Videira", nucleo: "Fibra de Coração de Dragão", comprimento: 27 },
    { id: 3, material: "Salgueiro", nucleo: "Pelo de Unicórnio", comprimento: 35 },
    { id: 4, material: "Carvalho Inglês", nucleo: "Pelo de Testrálio", comprimento: 32 },
];

const animais = [
    { id: 1, nome: "Coruja", tipo: "Correio/Companhia" },
    { id: 2, nome: "Gato", tipo: "Companhia" },
    { id: 3, nome: "Sapo", tipo: "Companhia" },
    { id: 4, nome: "Rato", tipo: "Companhia" },
];

const pocoes = [
    { id: 1, nome: "Polissuco", efeito: "Transforma na aparência de outra pessoa" },
    { id: 2, nome: "Felix Felicis", efeito: "Sorte temporária" },
    { id: 3, nome: "Amortentia", efeito: "Poção do amor" },
    { id: 4, nome: "Veritaserum", efeito: "Força a dizer a verdade" },
];

export default { bruxos, casas, varinhas, animais, pocoes };