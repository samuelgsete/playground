const temas = [
    { label: 'Azul claro', value: '' },
    { label: 'Azul escuro', value: 'azul-escuro' },
    { label: 'Roxo escuro', value: 'roxo-escuro' },
    { label: 'Roxo claro', value: 'roxo-claro' },
    { label: 'Verde escuro', value: 'verde-escuro' },
    { label: 'Vermelho escuro', value: 'vermelho-escuro' },
    { label: 'Laranja claro', value: 'laranja-claro' },
    { label: 'Dourado escuro', value: 'dourado-escuro' },
    { label: 'Floresta', value: 'verde-claro' }
];

const selectTema = document.querySelector('#tema');

temas.forEach(t => {
    let option = document.createElement('option');
    option.label = t.label;
    option.value = t.value;

    selectTema.appendChild(option);
});

const pagina = document.querySelector('html');

const temaSalvo = localStorage.getItem('tema');
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#tema').value = temaSalvo;
    pagina.dataset.theme = temaSalvo;
});


function trocarTema(tema) {
    pagina.dataset.theme = tema;
    localStorage.setItem('tema', tema);
}