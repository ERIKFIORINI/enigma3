const output = document.getElementById("terminalOutput");
const inputContainer = document.getElementById("inputContainer");
const videoBox = document.getElementById("videoBox");
const finalKey = document.getElementById("finalKey");

let attempts = 0;

const bootLines = [

"Estabelecendo conexão segura...",
"Conexão estabelecida.",

"Lendo chaves anteriores...",
"CHAVE #1: TE VIVO ✓",
"CHAVE #2: SEMPRE ✓",

"Buscando chave final...",
"...",

"Nenhuma chave encontrada.",

"",
"Este arquivo não pode ser aberto",
"sem a chave final.",

"",
"Aguardando entrada do usuário..."

];

const hints = [

"Dica 1: Ela sempre esteve presente em tudo.",
"Dica 2: Sem ela, nada disso existiria.",
"Dica 3: Possui 4 letras.",
"Dica 4: Começa com A.",
"Dica 5: A _ O R"

];

start();

async function start(){

    for(const line of bootLines){

        await type(line);

        await sleep(400);

    }

    inputContainer.style.display="block";

    finalKey.focus();

}

/* Digitação estilo terminal */
async function type(text){

    output.innerHTML += text + "<br>";

    output.scrollTop = output.scrollHeight;

    await sleep(200);

}

/* Clique ou Enter */
async function decrypt(){

    const value = finalKey.value.trim().toLowerCase();

    if(value !== "amor"){

        wrong();

        return;

    }

    inputContainer.style.display="none";

    await successSequence();

}

/* Erro */
function wrong(){

    output.innerHTML += "<br><span style='color:#ff5555'>CHAVE INVÁLIDA</span><br>";

    if(attempts < hints.length){

        output.innerHTML += hints[attempts] + "<br>";

    }else{

        output.innerHTML += "Dica final: AMOR<br>";

    }

    attempts++;

    output.scrollTop = output.scrollHeight;

}

/* Sequência final */
async function successSequence(){

    output.innerHTML="";

    const lines = [

        "Chave reconhecida.",
        "",
        "Verificando sistema...",
        "",
        "TE VIVO ✓",
        "SEMPRE ✓",
        "AMOR ✓",
        "",
        "Todas as chaves foram validadas.",
        "",
        "Descriptografando mensagem...",
        ""

    ];

    for(const line of lines){

        await type(line);

        await sleep(500);

    }

    await loadingBar();

    await showFinal();

}

/* Loading fake */
async function loadingBar(){

    for(let i=0;i<=100;i+=10){

        output.innerHTML += `\nProgresso: [${"█".repeat(i/10)}${"░".repeat(10-(i/10))}] ${i}%`;

        output.scrollTop = output.scrollHeight;

        await sleep(200);

    }

}

/* Mensagem final */
async function showFinal(){

    output.innerHTML="";

    const finalMsg = [

        "Mensagem descriptografada com sucesso.",
        "",
        "TE VIVO.",
        "",
        "SEMPRE.",
        "",
        "AMOR.",
        "",
        "",
        "Obrigado por participar desta jornada.",
        "❤️"

    ];

    for(const line of finalMsg){

        output.innerHTML += line + "<br>";

        output.scrollTop = output.scrollHeight;

        await sleep(700);

    }

    setTimeout(()=>{

        videoBox.style.display="block";

    },1200);

}

/* sleep helper */
function sleep(ms){
    return new Promise(res=>setTimeout(res,ms));
}