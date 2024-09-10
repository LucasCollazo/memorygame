const loading = document.getElementById('loading');
const menu = document.querySelector('.menu');
const modalMenu = document.querySelector('.modal-menu');
const modalGame = document.querySelector('.modal-board');

window.onload = function(){
    loading.style.opacity = 0;
    setTimeout(
        function(){
            loading.style.display = 'none';
            menu.style.display = 'block';
            menu.style.opacity = 1;
        },
    500)
}

document.getElementById('jogar').addEventListener('click', ()=>{
    menu.style.opacity = 0;
    menu.style.display = 'none';
    setTimeout(()=>{
        modalMenu.style.opacity = 0;
        modalGame.style.opacity = 1;
        modalMenu.style.display = 'none';
        modalGame.style.display = 'flex';
        prevCardsPairs();
    }, 1000);
})