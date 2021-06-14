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
    
});