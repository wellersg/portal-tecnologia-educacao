const questions = [
    { text: "Gosto de ler livros ou escrever histórias.", type: "linguística" },
    { text: "Sou bom em explicar coisas com palavras.", type: "linguística" },
    { text: "Adoro jogos de palavras ou conversas.", type: "linguística" },
    { text: "Escrevo textos claros e criativos.", type: "linguística" },
    { text: "Resolvo problemas de matemática rapidamente.", type: "lógico-matemática" },
    { text: "Gosto de quebra-cabeças ou jogos de lógica.", type: "lógico-matemática" },
    { text: "Organizo minhas ideias de forma lógica.", type: "lógico-matemática" },
    { text: "Curto analisar números ou padrões.", type: "lógico-matemática" },
    { text: "Imagino cenas ou objetos em 3D facilmente.", type: "espacial" },
    { text: "Sou bom em desenhar ou ler mapas.", type: "espacial" },
    { text: "Gosto de montar coisas como modelos.", type: "espacial" },
    { text: "Vejo detalhes visuais que outros não notam.", type: "espacial" },
    { text: "Sou bom em esportes ou dança.", type: "corporal-cinestésica" },
    { text: "Gosto de mexer as mãos enquanto penso.", type: "corporal-cinestésica" },
    { text: "Aprendo melhor praticando fisicamente.", type: "corporal-cinestésica" },
    { text: "Tenho boa coordenação motora.", type: "corporal-cinestésica" },
    { text: "Canto ou toco instrumentos com facilidade.", type: "musical" },
    { text: "Percebo ritmos ou sons sutis.", type: "musical" },
    { text: "Gosto de criar músicas ou sons.", type: "musical" },
    { text: "Memorizo músicas rapidamente.", type: "musical" },
    { text: "Entendo bem os sentimentos dos outros.", type: "interpessoal" },
    { text: "Gosto de trabalhar em grupo.", type: "interpessoal" },
    { text: "Sou bom em resolver conflitos.", type: "interpessoal" },
    { text: "Faço amigos facilmente.", type: "interpessoal" },
    { text: "Penso muito sobre meus sentimentos.", type: "intrapessoal" },
    { text: "Prefiro trabalhar sozinho e refletir.", type: "intrapessoal" },
    { text: "Sei bem o que me motiva.", type: "intrapessoal" },
    { text: "Planejo meu futuro com clareza.", type: "intrapessoal" },
    { text: "Gosto de observar plantas ou animais.", type: "naturalista" },
    { text: "Reconheço padrões na natureza.", type: "naturalista" },
    { text: "Me sinto bem explorando o meio ambiente.", type: "naturalista" },
    { text: "Classifico coisas (como coleções) com facilidade.", type: "naturalista" }
];

let chartInstance = null;
let userScores = {};

function startQuiz() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    let quizHtml = "";
    questions.forEach((q, index) => {
        quizHtml += `
            <p>${index + 1}. ${q.text}</p>
            <input type="radio" name="q${index}" value="1"> Nunca
            <input type="radio" name="q${index}" value="3"> Às vezes
            <input type="radio" name="q${index}" value="5"> Sempre
            <br><br>
        `;
    });
    document.getElementById("quiz-questions").innerHTML = quizHtml;
}

function submitQuiz() {
    userScores = {
        "linguística": 0, "lógico-matemática": 0, "espacial": 0, "corporal-cinestésica": 0,
        "musical": 0, "interpessoal": 0, "intrapessoal": 0, "naturalista": 0
    };
    questions.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            userScores[q.type] += parseInt(selected.value);
        }
    });

    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";

    let labels = Object.keys(userScores);
    let data = Object.values(userScores);
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(document.getElementById("resultsChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Pontos (máx. 20)",
                data: data,
                backgroundColor: "#c2410c",
                borderColor: "#ea580c",
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 20 }
            }
        }
    });

    let resultText = "<h3>Parabéns, Explorador de Inteligências!</h3><p>Veja como suas habilidades se destacam:</p>";
    for (let type in userScores) {
        if (userScores[type] >= 15) {
            resultText += `<p><strong>${type} (${userScores[type]}/20):</strong><br>`;
            if (type === "linguística") {
                resultText += "Você tem uma habilidade especial para expressar ideias e usar palavras! Experimente criar histórias ou poemas que inspirem.<br>";
                resultText += "No dia a dia, tente escrever um diário ou conversar com amigos para desenvolver essa capacidade.<br>";
                resultText += "Se quiser estudar mais, áreas como Letras ou Comunicação podem te interessar.<br>";
                resultText += "E, se for seu caminho, profissões como escritor ou professor podem ser ótimas escolhas!";
            } else if (type === "lógico-matemática") {
                resultText += "Sua mente lógica é excelente para resolver problemas! Explore isso com jogos ou desafios que estimulem o raciocínio.<br>";
                resultText += "No dia a dia, experimente planejar atividades ou analisar situações com cuidado.<br>";
                resultText += "Cursos como Matemática ou Ciências Exatas podem abrir novas possibilidades.<br>";
                resultText += "Se te interessar, profissões como cientista ou engenheiro podem combinar com você!";
            } else if (type === "espacial") {
                resultText += "Você tem um talento especial para visualizar e criar! Use sua imaginação para fazer desenhos ou imaginar cenários.<br>";
                resultText += "No dia a dia, tente criar mapas, montar objetos ou decorar algo ao seu redor.<br>";
                resultText += "Estudos em Design ou Arquitetura podem ser um espaço para explorar.<br>";
                resultText += "E, se quiser, profissões como artista ou designer podem ser seu futuro!";
            } else if (type === "corporal-cinestésica") {
                resultText += "Seu corpo é sua força – você aprende melhor em movimento! Experimente dançar, praticar esportes ou criar com as mãos.<br>";
                resultText += "No dia a dia, tente cozinhar ou construir algo para usar essa energia.<br>";
                resultText += "Cursos como Educação Física ou Artesanato podem te ajudar a crescer.<br>";
                resultText += "Se te atrair, profissões como atleta ou artesão podem ser perfeitas!";
            } else if (type === "musical") {
                resultText += "Você tem uma conexão especial com sons! Experimente tocar, cantar ou criar músicas que mostrem quem você é.<br>";
                resultText += "No dia a dia, ouça diferentes sons ou crie ritmos para explorar essa habilidade.<br>";
                resultText += "Estudos em Música ou Artes podem te levar mais longe.<br>";
                resultText += "E, se quiser, ser músico ou professor de música pode ser uma boa escolha!";
            } else if (type === "interpessoal") {
                resultText += "Você tem um talento especial para entender pessoas! Use isso para criar laços e ajudar quem está ao seu redor.<br>";
                resultText += "No dia a dia, experimente apoiar amigos ou trabalhar em grupo para fortalecer essa habilidade.<br>";
                resultText += "Cursos como Psicologia ou Comunicação podem te interessar.<br>";
                resultText += "Se for seu caminho, profissões como mediador ou líder podem surgir daí!";
            } else if (type === "intrapessoal") {
                resultText += "Você tem uma habilidade especial para se entender! Reflita sobre seus sentimentos e sonhos para se conhecer ainda mais.<br>";
                resultText += "No dia a dia, tente escrever suas ideias ou pensar em silêncio para explorar essa capacidade.<br>";
                resultText += "Estudos em Filosofia ou Psicologia podem te ajudar a avançar.<br>";
                resultText += "E, se te atrair, profissões como escritor ou terapeuta podem ser ideais!";
            } else if (type === "naturalista") {
                resultText += "Você tem uma conexão especial com a natureza! Explore o mundo ao seu redor observando padrões e detalhes.<br>";
                resultText += "No dia a dia, tente observar plantas, animais ou organizar coleções para usar essa habilidade.<br>";
                resultText += "Cursos como Biologia ou Ciências Ambientais podem te conectar mais.<br>";
                resultText += "Se quiser, profissões como ecologista ou pesquisador podem ser seu futuro!";
            }
            resultText += "</p>";
        }
    }
    document.getElementById("quiz-result").innerHTML = resultText;
}

function goToLevel2() {
    document.getElementById("result-section").style.display = "none";
    document.getElementById("creation-section").style.display = "block";
    let creationText = "<p><strong>Parabéns, Criador de NFT!</strong> Use suas habilidades para fazer uma criação especial na Educação 5.0:</p>";
    for (let type in userScores) {
        if (userScores[type] >= 15) {
            creationText += `<p><strong>${type}:</strong><br>`;
            if (type === "linguística") {
                creationText += "- Poema: Escreva versos que inspirem (use um editor de texto).<br>";
                creationText += "- Conto: Faça uma história curta que motive (Canva ou Word).<br>";
                creationText += "- História em Quadrinhos: Desenhe ou crie uma HQ digital (Canva).<br>";
                creationText += "- Discurso Gravado: Grave sua voz com uma mensagem especial (use o celular).";
            } else if (type === "lógico-matemática") {
                creationText += "- Padrão Geométrico: Desenhe formas que se repetem (Paint ou Canva).<br>";
                creationText += "- Quebra-Cabeça Digital: Crie um desafio visual (Photopea online).<br>";
                creationText += "- Infográfico: Faça um gráfico simples com informações (Canva).<br>";
                creationText += "- Arte Algorítmica: Use lógica para criar algo diferente (Processing online).";
            } else if (type === "espacial") {
                creationText += "- Desenho: Faça uma ilustração criativa (Paint ou papel digitalizado).<br>";
                creationText += "- Modelo 3D: Crie algo em 3D (Blender ou TinkerCAD online).<br>";
                creationText += "- Mapa Imaginário: Desenhe um lugar inventado (Canva ou papel).<br>";
                creationText += "- Colagem Digital: Combine imagens num design único (Canva).";
            } else if (type === "corporal-cinestésica") {
                creationText += "- Vídeo de Dança: Grave um movimento seu (celular ou câmera).<br>";
                creationText += "- Foto de Escultura: Faça algo com argila ou materiais simples e fotografe.<br>";
                creationText += "- Tutorial de Movimento: Filme você ensinando um gesto ou passo.<br>";
                creationText += "- Artesanato: Crie um objeto físico e tire uma foto (ex.: origami).";
            } else if (type === "musical") {
                creationText += "- Batida: Faça um ritmo simples (Audacity ou GarageBand).<br>";
                creationText += "- Melodia: Crie uma música curta (app ou instrumento).<br>";
                creationText += "- Poema Musicado: Grave sua voz com um som de fundo (celular).<br>";
                creationText += "- Som Ambiente: Capte sons do dia a dia (natureza, rua).";
            } else if (type === "interpessoal") {
                creationText += "- Arte Colaborativa: Faça um desenho ou foto com amigos.<br>";
                creationText += "- Entrevista em Áudio: Grave uma conversa com alguém (celular).<br>";
                creationText += "- Storyboard de Grupo: Crie um plano visual com outras pessoas (Canva).<br>";
                creationText += "- Mapa de Relações: Desenhe conexões entre pessoas (papel ou digital).";
            } else if (type === "intrapessoal") {
                creationText += "- Autorretrato: Desenhe ou fotografe algo que te represente.<br>";
                creationText += "- Diário Visual: Crie uma página ilustrada dos seus pensamentos (Canva).<br>";
                creationText += "- Mandala Pessoal: Faça um desenho circular com seus sentimentos.<br>";
                creationText += "- Reflexão em Texto: Escreva algo profundo sobre você (editor de texto).";
            } else if (type === "naturalista") {
                creationText += "- Foto de Natureza: Capture uma planta ou animal (celular).<br>";
                creationText += "- Desenho Ecológico: Faça um esboço de algo natural (papel ou digital).<br>";
                creationText += "- Receita Fitoterápica: Crie um remédio natural como um chá ('Fitoterápico é um remédio feito de plantas, como chá de camomila para relaxar!') e escreva ou fotografe.<br>";
                creationText += "- Guia de Observação: Faça um registro visual ou escrito da natureza.";
            }
            creationText += "</p>";
        }
    }
    creationText += "<p>Crie seu arquivo (imagem, áudio, vídeo ou texto) e avance para o próximo nível!</p>";
    document.getElementById("creation-task").innerHTML = creationText;
}

function goToLevel3() {
    document.getElementById("creation-section").style.display = "none";
    document.getElementById("minting-section").style.display = "block";
}

function restartPortal() {
    document.getElementById("minting-section").style.display = "none";
    document.getElementById("intro").style.display = "block";
    if (chartInstance) chartInstance.destroy();
    userScores = {};
}