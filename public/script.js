/* ======================= BUTTON ASIDE ======================= */

const toggle = document.querySelector('#toggle');

toggle.addEventListener("click", () => {
    
    document.querySelector('aside').classList.toggle('active_button');

    if (toggle.querySelector('i').innerHTML == 'dehaze') {
        toggle.querySelector('i').innerHTML = 'clear';
        toggle.classList.add('margin');
    }
    else {
        toggle.querySelector('i').innerHTML = 'dehaze';
        toggle.classList.remove('margin');
    }
});