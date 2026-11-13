const url = 'https://6ac4dff954a61668c5f67a12.mockapi.io/contatos';
let contatos = [];
let ids_selecionados = [];

async function buscarContatos()
{
    startLoading();
    const resposta = await fetch(url);

    if (resposta.ok) {
        contatos = await resposta.json();
        document.querySelector('#total').textContent = contatos.length;
    }

    renderizar(contatos);
    stopLoading();
}

function renderizar(contatos) 
{
    const tabela = document.querySelector('#contatos');
    const campoBusca = document.querySelector('#busca');

    const texto = campoBusca.value == '' ? 'por aqui' : `com "${campoBusca.value}"`;

    if (contatos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td class="vazio">
                    <span class="material-symbols-outlined">search_off</span>
                    Hmm, não achamos ninguém ${texto}
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = '';

    contatos.forEach(contato => {
        const tr = document.createElement('tr');

        const avatar = gerarAvatar(contato.primeironome, contato.segundonome);
        const nomeCompleto = `${contato.primeironome} ${contato.segundonome}`;

        tr.innerHTML = `
            <td class="cell-sm">
                <div class="field-checkbox">
                    <input 
                        type="checkbox"
                        id="${contato.id}"
                        onchange="selecionar(event, ${contato.id})"
                    >
                </div>
            </td>
            <td class="cell-sm">
                <div class="avatar">${avatar}</div>
            </td>
            <td>
                <h4>${nomeCompleto} <span class="badge">${contato.categoria}</span></h4>
                <div class="contato">
                    ${contato.email} <div class="dot"></div> <span>+55 ${contato.whatsapp}</span>
                </div>
            </td>
            <td class="cell-sm">
                <a href="editar.html?id=${contato.id}" class="btn-icon">
                    <span class="material-symbols-outlined">edit_square</span>
                </a>
            </td>
            <td class="cell-sm">
                <button type="button" class="btn-icon" onclick="excluir(${contato.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;

        tabela.append(tr);
    });
}

async function excluir(id) 
{
    const conf = { method: 'DELETE' }

    const contato = contatos.find(c => c.id == id);
        
    if(confirm(`Quer mesmo excluir "${contato.primeironome}?"`)) {
        startLoading();
        const resposta = await fetch(`${url}/${id}`, conf);
        if(resposta.ok) {
            location.reload();
        }
    }
    stopLoading();
}

function pesquisar(e)
{
    const termo = e.target.value.toLowerCase().trim();

    const filtrados = contatos.filter(c =>
        c.primeironome.toLowerCase().includes(termo) ||
        c.segundonome.toLowerCase().includes(termo) ||
        c.email.toLowerCase().includes(termo) ||
        c.whatsapp.includes(termo)
    );

    renderizar(filtrados);
}

function gerarAvatar(primeironome, segundonome)
{
    const avatar = `${primeironome[0]}${segundonome[0]}`;
    return avatar;
}

function selecionar(evento, id) {
    const selecionado = evento.target.checked;
    if (selecionado) {
        ids_selecionados.push(id);
    }
    else {
        ids_selecionados = ids_selecionados.filter(id_selecionado => id_selecionado !== id);
    }

    const btnExcluirVarios = document.querySelector('#btn-delete-all');
    const strong = document.querySelector('#btn-delete-all > strong');
    strong.textContent = ids_selecionados.length;

    ids_selecionados.length > 1 ? btnExcluirVarios.classList.remove('hide') : btnExcluirVarios.classList.add('hide');
}

async function excluirVarios()
{
    if (!confirm(`Quer mesmo excluir ${ids_selecionados.length} contatos?`)) return;

    startLoading();

    for (const id of ids_selecionados) {
        await fetch(`${url}/${id}`, { method: 'DELETE' });
    }

    location.reload();
}