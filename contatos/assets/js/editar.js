async function buscarContato() {

    startLoading();

    const id = getId();

    const url = `https://6ac4dff954a61668c5f67a12.mockapi.io/contatos/${id}`;
    const conf = { method: 'GET' }

    const resposta = await fetch(url, conf);

    if(resposta.ok) {
        const contato = await resposta.json();
        
        const form = document.forms['contato'];

        form.primeironome.value = contato.primeironome;
        form.segundonome.value = contato.segundonome;
        form.email.value = contato.email;
        form.whatsapp.value = contato.whatsapp;
        form.categoria.value = contato.categoria;

        stopLoading();
    }
}

async function salvar(evento) {
    startLoading();

    evento.preventDefault();

    const form = evento.target;
    
    const contato = {
        primeironome: form.primeironome.value.trim(),
        segundonome: form.segundonome.value.trim(),
        email: form.email.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        categoria: form.categoria.value.trim()
    }

    const id = getId();

    const url = `https://6ac4dff954a61668c5f67a12.mockapi.io/contatos/${id}`;
    const conf = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
    }

    const resposta = await fetch(url, conf);

    if(resposta.ok) {
        window.location.href = 'index.html';
        return;
    }

    alert('ERRO: infelizmente o contato NÃO foi editado');

}

function getId() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || '';
    return id;
}