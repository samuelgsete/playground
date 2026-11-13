const body = document.querySelector('body');

const divLoading = document.createElement('div');
divLoading.innerHTML = `
    <div id="loading" class="spinner-backdrop hide">
        <svg class="spinner" viewBox="0 0 50 50"">
            <circle class="spinner-trilha" cx="25" cy="25" r="20"></circle>
            <circle class="spinner-arco" cx="25" cy="25" r="20"></circle>
        </svg>
    </div>
`;

body.appendChild(divLoading);

function startLoading() {
    const loading = document.querySelector('#loading');
    loading.classList.remove('hide');
}

function stopLoading() {
    const loading = document.querySelector('#loading');
    loading.classList.add('hide');
}