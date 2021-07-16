window.homepagecheck = function() {
    var check = false;
    if(document.location.pathname === "/"){
        check=true;
        }
    return check;
}

document.addEventListener('DOMContentLoaded',function(){
    console.log('bases.js loaded')

    if (!window.homepagecheck()) {
        var elem = document.querySelector('main');
        elem.style.marginTop = '5em';
    }
    
    document.addEventListener('click', function (clickHeart) {

        if (!clickHeart.target.matches('.addWishlist i')) return;
        clickHeart.preventDefault();
        clickHeart.target.classList.toggle('active')
        document.querySelector('#alertEvent').classList.add('show')
    
    }, false);
});