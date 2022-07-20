"use scripts"
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

 //--------------ОПРЕДЕЛЕНИЕ УСТРОЙСТВА-----------------------
 if (isMobile.any()) { 
    document.body.classList.add('_touch'); //добавление в боди класса тач если это мобильное устройство

     //--------------ДОБАВЛЯЕМ К СТРЕКЛАМ СТВОЙСТВА ACTIVE ПРИ НАЖАТИИ-----------------------
    let menuArrows = document.querySelectorAll('.menu__arrow'); //берем все элементы, где есть css свойство .menu__arrow
    if (menuArrows.length > 0) { //если переменная не пуста то выполняем
        for (let i = 0; i < menuArrows.length; i++) { 
            const menuArrow = menuArrows[i] //проходим по каждму обьекту
            menuArrow.addEventListener('click', function(e) { //добавляем эвент клик с функцией
                menuArrow.parentElement.classList.toggle('_active'); //функция: добавлет родителю, то есть к главному тэек 
                //класс, при чем при первой нажатии добавляем класс, при второй убирает его (toggle)
            });
        }
    }
} else {
    document.body.classList.add('_pc');
 }

 //--------------МЕНЮ БУРГЕР-----------------------
 const iconMenu = document.querySelector('.menu__icon');
 const menuBody = document.querySelector('.menu__body');
 if (iconMenu) {
     iconMenu.addEventListener("click", function(e) {
         document.body.classList.toggle('_lock');
         iconMenu.classList.toggle('_active');
         menuBody.classList.toggle('_active');
     })
 }



//-------------------Прокрутка при клике-------------------------
 const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); //будет искать те у кого есть класс .menu__link но с атрибутом data-goto
 if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target; //записываем в переменную обьект на который кликаем 
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //проверка data-goto, что там, что-то есть и проверка, что класс к которому он обращается существует.
            const gotoBlock = document.querySelector(menuLink.dataset.goto); //получаю в переменную тот обьект к которому мы идем ('page__section_1')
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //создаю переменную которая укажет, куда надо пролестнуть в пикселях до нужного обьекта
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue, //делаем скролл сверху вниз по нашей переменной
                behavior: "smooth" //плавная прокрутка
            });
            e.preventDefault(); //убирает ссылку на обьекте
        }
    }
 }