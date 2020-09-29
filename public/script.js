/* ============================================================ */
/* ======================= BUTTON ASIDE ======================= */
/* ============================================================ */

const { paginate } = require("../src/app/models/instructor.dao");

if (document.querySelector('#toggle')) {
    const currentPage = location.pathname;

    // Código para alterar ativar a classe no menu em evidência
    const menuItems = document.querySelectorAll('aside .links a');
    const toggle = document.querySelector('#toggle');

    for (const item of menuItems) {
        if (currentPage.includes(item.getAttribute("href"))) {
            item.classList.add("active_link");
        }
    }

    // Código para exibir/ocultar o menu lateral
    toggle.addEventListener("click", () => {

        document.querySelector('nav').classList.toggle('active_button');

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

/* ============================================================= */
/* =========================== MODAL =========================== */
/* ============================================================= */

if (document.querySelector('.options')) {
    const modalOverride = document.querySelector('.modalOverride');

    document.querySelector('.options a.delete').addEventListener("click", () => {
        modalOverride.classList.add('active_modal');

        modalOverride.querySelector('.cancel').addEventListener("click", () => {
            modalOverride.classList.remove('active_modal');
        });
    });
}

/* ============================================================= */
/* ========================= PAGINATION ======================== */
/* ============================================================= */

if (document.querySelector('.pagination')) {

    function paginate(totalPages, selectedPages) {
        let pages = [],
            oldPage;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
            const pagesBeforeSelectedPage = currentPage >= selectedPages - 2;
            const pagesAfterSelectedPage = currentPage <= selectedPages + 2;

            if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

                if (oldPage && currentPage - oldPage > 2) {
                    pages.push("...");
                }
                else if (oldPage && currentPage - oldPage == 2) {
                    pages.push(currentPage - 1);
                }

                oldPage = currentPage;
            }
        }
    }
}