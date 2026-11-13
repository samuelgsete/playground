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

    const url = "https://6ac4dff954a61668c5f67a12.mockapi.io/contatos";
    const conf = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
    }

    const resposta = await fetch(url, conf);

    if(resposta.ok) {
        window.location.href = 'index.html';
        return;
    }

    alert('ERRO: infelizmente o contato NÃO foi salvo');
}