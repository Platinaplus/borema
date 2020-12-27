$(function () {


  const firebaseConfig = {
    apiKey: "AIzaSyBMsy4-50qRCpiAkKl6Q_wTqxe5hl4HFOg",
    authDomain: "borema-fc699.firebaseapp.com",
    databaseURL: "https://borema-fc699.firebaseio.com",
    projectId: "borema-fc699",
    storageBucket: "borema-fc699.appspot.com",
    messagingSenderId: "489448518365",
    appId: "1:489448518365:web:ea72db5fbcb75598ad6134",
    measurementId: "G-QN2582GQ7L"
  };
  // var bigOne = document.getElementById('test');
  // var dbRef = firebase.database().ref().child('test');
  // dbRef.on('value', snap => bigOne.innerText = snap.val());

  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  let database = firebase.database();

  const btnCatalog = document.getElementById('button1')
  const btnContacts = document.getElementById('button2')
  const btnModal = document.getElementById('button3')
  const formCatalog = document.getElementById('form1')
  const formContacts = document.getElementById('form2')
  const formModal = document.getElementById('form3')
  const answerCatalog = document.querySelector('.answer-catalog')
  const answerContacts = document.querySelector('.answer-contacts')
  const answerModal = document.querySelector('.answer-modal')
  const modalWidow = document.querySelector('.modal')


  const saveToFirebase = (form, answer) => {
    const name = form.querySelector('input[name = "name"]').value.trim();
    const phone = form.querySelector('input[name = "phone"]').value.trim();
    let customerId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    if (name, phone) {
      writeCustomerData(customerId, name, phone);
      handler(form, answer);
      return false;
    } else {
      alert('введите данные')
      return;
    }
  }

  function writeCustomerData(id, name, contact){
    firebase
    .database()
    .ref('contacts/' + id)
    .set({
      name: name,
      phone: contact,
    });
  }

  const handler = (form, answer) =>{
    form.style.display = 'none';
    form.reset()
    answer.style.display = 'flex';
    setTimeout(() => {
      if (form == formModal) {
        modalWidow.style.display = 'none';
      } else{
        (Array.from(form.elements)).forEach(element =>{
          element.classList.remove('valid');
        })
        form.style.display = 'flex';
        answer.style.display = 'none';
      }
    }, 2000);
  };

  btnCatalog.addEventListener('click', (e) =>{
    e.preventDefault()
    saveToFirebase(formCatalog, answerCatalog)
  });
  btnContacts.addEventListener('click', (e) =>{
    e.preventDefault()
    saveToFirebase(formContacts, answerContacts)
  });
  btnModal.addEventListener('click', (e) =>{
    e.preventDefault()
    saveToFirebase(formModal, answerModal)
  });

//SLIDER-------------------------------------------------------------------------

  $(".feedback__items").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });

//SMOOTH SCROLL--------------------------------------------------------------------

  $(".header__menu a, .footer a, .header__menu-side a").on("click", function (e) {
    e.preventDefault();
    const id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });

//FIXED HEADER------------------------------------------------------------------------

  $(".header__menu-link, .header__menu-side-link").on("click", (e) => {
    e.preventDefault();
    $(".header__menu-link, .header__menu-side").removeClass("active");
    $(e.target).addClass("active");
  });

  $(window).scroll(function () {
    $(".header__menu, .header__menu-side").toggleClass(
      "scroll",
      $(this).scrollTop() > $(".header").outerHeight()
    );
  });

  //ADAPTIVE MENU VISIBLE-------------------------------------------------------------------

  $(".header__menu-btn, .header__menu-link, .header__menu-side-link").on('click', ()=> {
    $(".header__menu-side").toggleClass('show')
    $(".header__menu-btn").toggleClass('close')
  })

  //MODAL WINDOW OPEN---------------------------------------------------------------------

  $(".header__contacts-btn, .description__discount, .hits__discount").on(
    "click",
    (e) => {
      e.preventDefault();
      $(".modal").addClass("visible");
    }
  );

  //MODAL WINDOW CLOSE  FORM RESET----------------------------------------------------------
  
  $(".modal__close").on("click", (e) => {
    $(".modal").removeClass("visible");
    $(".modal__form").trigger("reset");
    $("input[name=phone]").removeClass("invalid");
    $("input[name=phone]").removeClass("valid");
    $("input[name=name]").removeClass("invalid");
    $("input[name=name]").removeClass("valid");
  });

  //FORM VALIDATION---------------------------------------------------------------------------
  
  const regExpValidPhone = /^\d[\d\(\)\ -]{4,14}\d$/;
  const regExpValidName = /^[a-zA-Zа-яА-Я\-]+$/;
  // const regExpValidEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/;

  function isValid(selector, pattern) {
    let value = $(selector).val();
    if (pattern.test(value) && value) {
      return true;
    } else {
      return false;
    }
  }

  let phone = false,
    name = false,
    flag = true;

  $(".catalog__form, .modal__form").on("change", (e) => {
    if (e.target.name === "name") {
      let target = e.target;
      name = isValid(e.target, regExpValidName);
      if (name) {
        $(target).removeClass("invalid");
        $(target).addClass("valid");
      } else {
        $(target).removeClass("valid");
        $(target).addClass("invalid");
      }
      isComplate();
    }
    if (e.target.name === "phone") {
      let target = e.target;
      phone = isValid(e.target, regExpValidPhone);
      if (phone) {
        $(target).removeClass("invalid");
        $(target).addClass("valid");
      } else {
        $(target).removeClass("valid");
        $(target).addClass("invalid");
      }
      isComplate();
    }
  });

  function isComplate() {
    let flag = true;

    if (phone == false) flag = false;
    if (name == false) flag = false;

    if (flag == true) {
      $(".btn").removeAttr("disabled");
      $(".btn").html("Отправить");
    } else {
      $(".btn").attr("disabled", "disabled");
    }
  }

//COUNTER ANIMATION---------------------------------------------------------------------------------

  function countup(className, duration) {
    //className - имя класса, в котором есть число
    const countBlockTop = $("." + className).offset().top; //смещение блока с числом относительно верхнего края
    const windowHeight = window.innerHeight; //высота окна браузера
    let show = true; // отвечает, что если один раз счетчик сработает, больше не срабатывал

    $(window).scroll(function () {
      if (show && countBlockTop < $(window).scrollTop() + windowHeight) {
        show = false; //если мы видим число, то больше его не надо показывать

        $("." + className).spincrement({
          //вызов плагина с параметрами
          from: 1, //начинать с 1
          duration: duration, //задержка счетчика
        });
      }
    });
  }
  countup("count", 4000);
  countup("count2", 7000);

});
