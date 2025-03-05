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
let userScores = JSON.parse(localStorage.getItem('userScores')) || {};

function startQuiz() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    let quizHtml = "";
    questions.forEach((q, index) => {
        quizHtml += `<p>${index + 1}. ${q.text}</p>` +
                    `<label><input type="radio" name="q${index}" value="1"> Nunca</label>` +
                    `<label><input type="radio" name="q${index}" value="3"> Às vezes</label>` +
                    `<label><input type="radio" name="q${index}" value="5"> Sempre</label>` +
                    `<br><br>`;
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
        } else {
            console.warn(`Pergunta ${index + 1} não respondida. Atribuindo 0.`);
            userScores[q.type] += 0; // Garante que todas as inteligências tenham um valor
        }
    });

    console.log("Scores calculados:", userScores); // Depuração dos scores

    localStorage.setItem('userScores', JSON.stringify(userScores));

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
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2, // Proporção ajustada para manter o gráfico compacto
            scales: { 
                y: { 
                    beginAtZero: true, 
                    max: 20,
                    ticks: { font: { size: 10 } }
                },
                x: { 
                    ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 }
                }
            },
            plugins: {
                legend: {
                    display: false // Remove a legenda para economizar espaço
                }
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                }
            }
        }
    });

    let resultText = "<h3>Parabéns, Explorador!</h3><p>Veja como suas habilidades se destacam:</p>";
    for (let type in userScores) {
        if (userScores[type] >= 10) { // Ajustado para 10 como teste
            resultText += `<p><strong>${type} (${userScores[type]}/20):</strong><br>`;
            if (type === "linguística") {
                resultText += "Você tem uma habilidade especial para expressar ideias e usar palavras! Experimente criar histórias ou poemas que inspirem.<br>" +
                              "No dia a dia, tente escrever um diário ou conversar com amigos para desenvolver essa capacidade.<br>" +
                              "Se quiser estudar mais, áreas como Letras ou Comunicação podem te interessar.<br>" +
                              "E, se for seu caminho, profissões como escritor ou professor podem ser ótimas escolhas!<br>" +
                              "Pra seu NFT, use isso pra criar um texto ou áudio incrível!";
            } else if (type === "lógico-matemática") {
                resultText += "Sua mente lógica é excelente para resolver problemas! Explore isso com jogos ou desafios que estimulem o raciocínio.<br>" +
                              "No dia a dia, experimente planejar atividades ou analisar situações com cuidado.<br>" +
                              "Cursos como Matemática ou Ciências Exatas podem abrir novas possibilidades.<br>" +
                              "Se te interessar, profissões como cientista ou engenheiro podem combinar com você!<br>" +
                              "Use essa lógica pra criar um NFT com padrões ou designs únicos!";
            } else if (type === "espacial") {
                resultText += "Você tem um talento especial para visualizar e criar! Use sua imaginação para fazer desenhos ou imaginar cenários.<br>" +
                              "No dia a dia, tente criar mapas, montar objetos ou decorar algo ao seu redor.<br>" +
                              "Estudos em Design ou Arquitetura podem ser um espaço para explorar.<br>" +
                              "E, se for seu caminho, profissões como artista ou designer podem ser seu futuro!<br>" +
                              "Crie um NFT visual que impressione!";
            } else if (type === "corporal-cinestésica") {
                resultText += "Seu corpo é sua força – você aprende melhor em movimento! Experimente dançar, praticar esportes ou criar com as mãos.<br>" +
                              "No dia a dia, tente cozinhar ou construir algo para usar essa energia.<br>" +
                              "Cursos como Educação Física ou Artesanato podem te ajudar a crescer.<br>" +
                              "Se te atrair, profissões como atleta ou artesão podem ser perfeitas!<br>" +
                              "Seu NFT pode ser algo físico digitalizado, como uma dança!";
            } else if (type === "musical") {
                resultText += "Você tem uma conexão especial com sons! Experimente tocar, cantar ou criar músicas que mostrem quem você é.<br>" +
                              "No dia a dia, ouça diferentes sons ou crie ritmos para explorar essa habilidade.<br>" +
                              "Estudos em Música ou Artes podem te levar mais longe.<br>" +
                              "E, se quiser, ser músico ou professor de música pode ser uma boa escolha!<br>" +
                              "Que tal um NFT com uma batida original sua?";
            } else if (type === "interpessoal") {
                resultText += "Você tem um talento especial para entender pessoas! Use isso para criar laços e ajudar quem está ao seu redor.<br>" +
                              "No dia a dia, experimente apoiar amigos ou trabalhar em grupo para fortalecer essa habilidade.<br>" +
                              "Cursos como Psicologia ou Comunicação podem te interessar.<br>" +
                              "Se for seu caminho, profissões como mediador ou líder podem surgir daí!<br>" +
                              "Crie um NFT colaborativo com amigos!";
            } else if (type === "intrapessoal") {
                resultText += "Você tem uma habilidade especial para se entender! Reflita sobre seus sentimentos e sonhos para se conhecer ainda mais.<br>" +
                              "No dia a dia, tente escrever suas ideias ou pensar em silêncio para explorar essa capacidade.<br>" +
                              "Estudos em Filosofia ou Psicologia podem te ajudar a avançar.<br>" +
                              "E, se te atrair, profissões como escritor ou terapeuta podem ser ideais!<br>" +
                              "Seu NFT pode ser algo bem pessoal e único!";
            } else if (type === "naturalista") {
                resultText += "Você tem uma conexão especial com a natureza! Explore o mundo ao seu redor observando padrões e detalhes.<br>" +
                              "No dia a dia, tente observar plantas, animais ou organizar coleções para usar essa habilidade.<br>" +
                              "Cursos como Biologia ou Ciências Ambientais podem te conectar mais.<br>" +
                              "Se quiser, profissões como ecologista ou pesquisador podem ser seu futuro!<br>" +
                              "Use a natureza como inspiração pro seu NFT!";
            }
            resultText += "</p>";
        }
    }
    document.getElementById("quiz-result").innerHTML = resultText || "<p>Erro ao calcular os resultados. Tente novamente!</p>";
    console.log("Result text generated:", resultText); // Depuração do texto do resultado
}

function shareResults() {
    const resultText = document.getElementById("quiz-result").innerText;
    const shareMessage = "Confira meu perfil de inteligências do Workshop Tecnologia e Educação 5.0:\n" + resultText + "\nAcesse: https://wellersg.github.io/portal-tecnologia-educacao/";
    
    if (navigator.share) {
        navigator.share({
            title: "Meu Perfil de Inteligências",
            text: shareMessage,
            url: "https://wellersg.github.io/portal-tecnologia-educacao/"
        }).catch(error => console.log("Erro ao compartilhar:", error));
    } else {
        navigator.clipboard.writeText(shareMessage).then(() => {
            alert("Resultados copiados! Cole em um e-mail ou rede social.");
            window.location.href = "mailto:?subject=Meu Perfil de Inteligências&body=" + encodeURIComponent(shareMessage);
        }).catch(error => console.log("Erro ao copiar:", error));
    }
}

function checkFile() {
    const fileInput = document.getElementById("fileInput");
    const fileFeedback = document.getElementById("fileFeedback");
    const file = fileInput.files[0];
    
    if (!file) {
        fileFeedback.innerText = "Nenhum arquivo selecionado!";
        return;
    }

    const maxSize = 100 * 1024 * 1024; // 100 MB
    const acceptedTypes = ["audio/mpeg", "audio/wav", "image/png", "image/jpeg", "video/mp4", "video/webm"];
    
    if (file.size > maxSize) {
        fileFeedback.innerText = `Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(2)} MB). Máximo é 100 MB!`;
        return;
    }

    if (!acceptedTypes.includes(file.type)) {
        fileFeedback.innerText = `Formato não aceito (${file.type}). Use MP3, WAV, PNG, JPG, MP4 ou WEBM!`;
        return;
    }

    if (isNaN(file.size)) {
        fileFeedback.innerText = `Erro ao calcular o tamanho do arquivo!`;
        return;
    }
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    fileFeedback.innerText = `Arquivo ok pra mintar! (${file.name}, ${sizeMB} MB)`;
}

function loadIntelligenceSelection() {
    const selectionDiv = document.getElementById("intelligence-selection");
    if (!selectionDiv) return;

    let selectionHtml = "";
    for (let type in userScores) {
        if (userScores[type] >= 10) {
            selectionHtml += `<label><input type="checkbox" name="intelligence" value="${type}"> ${type} (${userScores[type]}/20)</label>`;
        }
    }
    selectionDiv.innerHTML = selectionHtml;
}

function showNFTSuggestions() {
    const selectedIntelligences = Array.from(document.querySelectorAll("input[name='intelligence']:checked")).map(cb => cb.value);
    const suggestionsList = document.getElementById("nft-suggestions");
    
    if (selectedIntelligences.length === 0) {
        suggestionsList.innerHTML = "<li>Selecione pelo menos uma inteligência pra ver as dicas!</li>";
        return;
    }

    let suggestionsHtml = "";
    selectedIntelligences.forEach(type => {
        suggestionsHtml += `<li><strong>${type}:</strong><ul>`;
        if (type === "linguística") {
            suggestionsHtml += `<li>Poema Visual: Escreva um poema curto e transforme em arte digital com fontes criativas (Canva). <a href="guias-criacao.html#linguistica-poema">Saiba Mais</a></li>` +
                               `<li>Conto Ilustrado: Crie uma micro-história com desenhos simples ou fotos (celular ou Paint). <a href="guias-criacao.html#linguistica-conto">Saiba Mais</a></li>` +
                               `<li>HQ Narrativa: Desenhe uma história em quadrinhos com diálogos impactantes (papel ou Canva). <a href="guias-criacao.html#linguistica-hq">Saiba Mais</a></li>` +
                               `<li>Spoken Word: Grave um poema falado com fundo musical pra virar um NFT sonoro (celular + app de edição). <a href="guias-criacao.html#linguistica-spoken">Saiba Mais</a></li>`;
        } else if (type === "lógico-matemática") {
            suggestionsHtml += `<li>Arte Geométrica: Desenhe padrões simétricos ou fractais coloridos (Paint ou Canva). <a href="guias-criacao.html#logico-arte">Saiba Mais</a></li>` +
                               `<li>Puzzle Interativo: Crie um quebra-cabeça digital que revele uma imagem (Photopea ou papel escaneado). <a href="guias-criacao.html#logico-puzzle">Saiba Mais</a></li>` +
                               `<li>Infográfico Animado: Faça um gráfico simples com movimento (Canva ou vídeo no celular). <a href="guias-criacao.html#logico-infografico">Saiba Mais</a></li>` +
                               `<li>Escultura Lógica: Monte uma estrutura 3D com formas encaixadas e fotografe (papel ou materiais reciclados). <a href="guias-criacao.html#logico-escultura">Saiba Mais</a></li>`;
        } else if (type === "espacial") {
            suggestionsHtml += `<li>Ilustração Fantástica: Desenhe um cenário imaginário com detalhes únicos (Paint ou papel). <a href="guias-criacao.html#espacial-ilustracao">Saiba Mais</a></li>` +
                               `<li>Miniatura 3D: Crie um modelo físico ou digital de um objeto surreal (argila ou TinkerCAD). <a href="guias-criacao.html#espacial-miniatura">Saiba Mais</a></li>` +
                               `<li>Mapa Artístico: Faça um mapa de um mundo fictício com cores vibrantes (Canva ou papel). <a href="guias-criacao.html#espacial-mapa">Saiba Mais</a></li>` +
                               `<li>Colagem Visionária: Combine fotos e desenhos num design futurista (Canva ou celular). <a href="guias-criacao.html#espacial-colagem">Saiba Mais</a></li>`;
        } else if (type === "corporal-cinestésica") {
            suggestionsHtml += `<li>Dança Digital: Filme uma coreografia curta e edite com efeitos (celular + app de vídeo). <a href="guias-criacao.html#corporal-danca">Saiba Mais</a></li>` +
                               `<li>Escultura Viva: Modele uma forma com argila ou massa e fotografe em ângulos dinâmicos. <a href="guias-criacao.html#corporal-escultura">Saiba Mais</a></li>` +
                               `<li>Performance em Stop-Motion: Crie uma sequência de fotos em movimento (celular). <a href="guias-criacao.html#corporal-stopmotion">Saiba Mais</a></li>` +
                               `<li>Arte Tátil: Faça um relevo com materiais reciclados e digitalize como NFT (papelão ou tecido). <a href="guias-criacao.html#corporal-tatil">Saiba Mais</a></li>`;
        } else if (type === "musical") {
            suggestionsHtml += `<li>Batida Original: Crie um loop rítmico com sons do dia a dia (Audacity ou celular). <a href="guias-criacao.html#musical-batida">Saiba Mais</a></li>` +
                               `<li>Melodia Visual: Grave uma música e faça um vídeo com formas que dançam no ritmo (Canva + app de vídeo). <a href="guias-criacao.html#musical-melodia">Saiba Mais</a></li>` +
                               `<li>Poesia Sonora: Combine poesia falada com camadas de sons ambientes (celular). <a href="guias-criacao.html#musical-poesia">Saiba Mais</a></li>` +
                               `<li>Paisagem Acústica: Monte uma trilha com sons da natureza ou cidade (gravador ou app). <a href="guias-criacao.html#musical-paisagem">Saiba Mais</a></li>`;
        } else if (type === "interpessoal") {
            suggestionsHtml += `<li>Mural Coletivo: Crie uma arte digital ou física com amigos, cada um adicionando algo (Canva ou papel). <a href="guias-criacao.html#interpessoal-mural">Saiba Mais</a></li>` +
                               `<li>Narrativa em Camadas: Grave um vídeo ou áudio com várias vozes contando uma história (celular). <a href="guias-criacao.html#interpessoal-narrativa">Saiba Mais</a></li>` +
                               `<li>Galeria de Retratos: Desenhe ou fotografe expressões de pessoas próximas num collage (Paint ou Canva). <a href="guias-criacao.html#interpessoal-galeria">Saiba Mais</a></li>` +
                               `<li>Teatro Digital: Filme uma cena curta com amigos pra virar um NFT animado (celular). <a href="guias-criacao.html#interpessoal-teatro">Saiba Mais</a></li>`;
        } else if (type === "intrapessoal") {
            suggestionsHtml += `<li>Autorretrato Emocional: Desenhe ou fotografe algo que revele um sentimento seu (Paint ou celular). <a href="guias-criacao.html#intrapessoal-autorretrato">Saiba Mais</a></li>` +
                               `<li>Diário em Camadas: Crie uma página com texto e imagens sobre seus pensamentos (Canva). <a href="guias-criacao.html#intrapessoal-diario">Saiba Mais</a></li>` +
                               `<li>Mandala Digital: Desenhe uma mandala com cores que expressem você (Canva ou papel escaneado). <a href="guias-criacao.html#intrapessoal-mandala">Saiba Mais</a></li>` +
                               `<li>Reflexão Animada: Faça um vídeo curto com texto ou voz sobre sua jornada (celular + app). <a href="guias-criacao.html#intrapessoal-reflexao">Saiba Mais</a></li>`;
        } else if (type === "naturalista") {
            suggestionsHtml += `<li>Paisagem Viva: Fotografe ou desenhe uma cena natural com um toque surreal (celular ou Paint). <a href="guias-criacao.html#naturalista-paisagem">Saiba Mais</a></li>` +
                               `<li>Escultura Orgânica: Crie uma forma com elementos naturais (folhas, pedras) e fotografe. <a href="guias-criacao.html#naturalista-escultura">Saiba Mais</a></li>` +
                               `<li>Padrão Botânico: Desenhe repetições de folhas ou flores em estilo abstrato (Canva ou papel). <a href="guias-criacao.html#naturalista-padrao">Saiba Mais</a></li>` +
                               `<li>História da Natureza: Faça um stop-motion com elementos naturais (celular). <a href="guias-criacao.html#naturalista-historia">Saiba Mais</a></li>`;
        }
        suggestionsHtml += `</ul></li>`;
    });
    suggestionsList.innerHTML = suggestionsHtml;
}

if (document.getElementById("intelligence-selection") && window.location.pathname.includes("criar-nft.html")) {
    loadIntelligenceSelection();
}

// Desativa temporariamente o script do Cloudflare para teste local
if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    console.log("Desativando script do Cloudflare para ambiente local.");
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.innerHTML.includes('__CF$cv$params')) {
            script.remove();
            break;
        }
    }
}