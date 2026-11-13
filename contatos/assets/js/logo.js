const logo = document.querySelector('.logo');

if(logo) {
    logo.innerHTML = `
        <svg viewBox="0 0 48 50" aria-hidden="true">
            <path class="logo-balao" d="M12 0h24a12 12 0 0 1 12 12v18a12 12 0 0 1-12 12H20l-9 7.5V42A12 12 0 0 1 0 30V12A12 12 0 0 1 12 0z"/>
            <circle class="logo-pessoa" cx="24" cy="15" r="6.5"/>
            <path class="logo-pessoa" d="M13.5 33c0-5.8 4.7-9.5 10.5-9.5s10.5 3.7 10.5 9.5z"/>
        </svg>
        <span>Agenda</span>
    `;
}