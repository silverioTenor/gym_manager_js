/* ======================= BUTTON ASIDE ======================= */

if (document.querySelector('#toggle')) {
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
}

/* =========================== MODAL =========================== */

if (document.querySelector('.options')) {
    const modalOverride = document.querySelector('.modalOverride');

    document.querySelector('.options a.delete').addEventListener("click", () => {
        modalOverride.classList.add('active_modal');

        modalOverride.querySelector('.cancel').addEventListener("click", () => {
            modalOverride.classList.remove('active_modal');
        });
    });
}