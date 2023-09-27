/**
* Template Name: Eterna - v4.8.1
* Template URL: https://bootstrapmade.com/eterna-free-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  if(heroCarouselIndicators > 0){
    heroCarouselItems.forEach((item, index) => {
      (index === 0) ?
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
        heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  
  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /*Initializing Select2*/
  $('.select-localitation').select2();
    $('.select-localitation').val(null).trigger('change'); 
  $('.select2').select2();
  $('.select2').val(null).trigger('change'); 


})();

//Menu Vertical
$(document).ready(function(){
  $('.menu li:has(ul)').click(function(e){
    e.preventDefault();

    if ($(this).hasClass('activado')){
      $(this).removeClass('activado');
      $(this).children('ul').slideUp();
    } else {
      $('.menu li ul').slideUp();
      $('.menu li').removeClass('activado');
      $(this).addClass('activado');
      $(this).children('ul').slideDown();
    }
  });

  $('.btn-menu').click(function(){
    $('.contenedor-menu .menu').slideToggle();
  });

  $(window).resize(function(){
    if ($(document).width() > 450){
      $('.contenedor-menu .menu').css({'display' : 'block'});
    }

    if ($(document).width() < 450){
      $('.contenedor-menu .menu').css({'display' : 'none'});
      $('.menu li ul').slideUp();
      $('.menu li').removeClass('activado');
    }
  });

  $('.menu li ul li a').click(function(){
    window.location.href = $(this).attr("href");
  });
});


/*SideNav*/
function openNav() {
  document.getElementById("mySidenav").style.animation = "expand 0.3s forwards";
  //closeBtn
  document.getElementById("closeBtn").style.display = "block";
  document.getElementById("closeBtn").style.animation = "show 0.3s";
  //Overlay
  document.getElementById("overlay").style.display = "block";
  document.getElementById("overlay").style.animation = "show 0.3s";

}

function closeNav() {
  document.getElementById("mySidenav").style.animation = "collapse 0.3s forwards";
  //closeBtn
  document.getElementById("closeBtn").style.animation = "hide 0.3s";
  //Overlay
  document.getElementById("overlay").style.animation = "hide 0.3s";

  setTimeout(() => {
      document.getElementById("closeBtn").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      //Reset Menus
      document.getElementById("main-container").style.animation = "";
      document.getElementById("main-container").style.transform = "translateX(0px)";
      document.getElementById("sub-container").style.animation = "";
      document.getElementById("sub-container").style.transform = "translateX(380px)";
  }, 300)
}

let firstDropdownOpen = false;

function firstDropDown() {
  firstDropdownOpen = !firstDropdownOpen;
  if(firstDropdownOpen) {
      document.querySelector("#firstDropDown i").setAttribute("class", "fas fa-chevron-up");
      document.querySelector("#firstDropDown div").innerHTML = "See Less";
      //Handle Container
      document.getElementById("firstContainer").style.display = "block";
      document.getElementById("firstContainer").style.animation = "expandDropDown 0.3s forwards";
      document.getElementById("firstContainer").style.transition = "height 0.3s";
      document.getElementById("firstContainer").style.height = "410px";
  }else{
      document.querySelector("#firstDropDown i").setAttribute("class", "fas fa-chevron-down");
      document.querySelector("#firstDropDown div").innerHTML = "See More";
      //Handle Container
      document.getElementById("firstContainer").style.animation = "collapseDropDown 0.2s forwards";
      document.getElementById("firstContainer").style.transition = "height 0.2s";
      document.getElementById("firstContainer").style.height = "0px";
      setTimeout(() => {
          document.getElementById("firstContainer").style.display = "none";
      }, 200)
      
  }
}

let secondDropDownOpen = false;

function secondDropDown() {
  secondDropDownOpen = !secondDropDownOpen;

  if(secondDropDownOpen) {
      document.querySelector("#secondDropDown i").setAttribute("class", "fas fa-chevron-up");
      document.querySelector("#secondDropDown div").innerHTML = "See Less";
      //Handle Container
      document.getElementById("secondContainer").style.display = "block";
      document.getElementById("secondContainer").style.animation = "expandDropDown 0.3s forwards";
      document.getElementById("secondContainer").style.transition = "height 0.3s";
      document.getElementById("secondContainer").style.height = "260px";
  }else{
      document.querySelector("#secondDropDown i").setAttribute("class", "fas fa-chevron-down");
      document.querySelector("#secondDropDown div").innerHTML = "See More";
      //Handle Container
      document.getElementById("secondContainer").style.animation = "collapseDropDown 0.2s forwards";
      document.getElementById("secondContainer").style.transition = "height 0.2s";
      document.getElementById("secondContainer").style.height = "0px";
      setTimeout(() => {
          document.getElementById("secondContainer").style.display = "none";
      }, 200)
      
  }
}

document.querySelectorAll(".sidenavRow").forEach(row => {
  row.addEventListener("click", () => {
      document.getElementById("main-container").style.animation = "mainAway 0.3s forwards";
      document.getElementById("sub-container").style.animation = "subBack 0.3s forwards";
  });
});

document.getElementById("mainMenu").addEventListener("click", () => {
  document.getElementById("main-container").style.animation = "mainBack 0.3s forwards";
  document.getElementById("sub-container").style.animation = "subPush 0.3s forwards";
})

//subNavContent

function openPrimeVideo() {
  document.getElementById("sub-container-content").innerHTML = `<div class="sidenavContentHeader">Prime Video</div>
  <a href="#"><div class="sidenavContent">All Videos</div></a>`;
}

function openAmazonMusic() {
  document.getElementById("sub-container-content").innerHTML = `<div class="sidenavContentHeader">Amazon Music</div>
  <a href="#"><div class="sidenavContent">All Music</div></a>`;
}

/* Validation forms */
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

/*Multi items per Slider*/
let items = document.querySelectorAll('#recipeCarousel .carousel-item')

items.forEach((el) => {
    let minPerSlide = 3
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

let items1 = document.querySelectorAll('#CardProducts .carousel-item')

items1.forEach((el) => {
    let minPerSlide = 3
    if(parseInt(window.outerWidth) < 768){
      minPerSlide = 2;
    }
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items1[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

let items2 = document.querySelectorAll('#rebajasProducts .carousel-item')
items2.forEach((el) => {
  let minPerSlide2 = 5
  if(parseInt(window.outerWidth) < 768){
    minPerSlide2 = 2;
  }
  let next = el.nextElementSibling
  for (var i=1; i<minPerSlide2; i++) {
      if (!next) {
          // wrap carousel by using first child
        next = items2[0]
      }
      let cloneChild = next.cloneNode(true)
      el.appendChild(cloneChild.children[0])
      next = next.nextElementSibling
    }
})

function copySrc(src){
  console.log('src :>> ', src.src);
  let img = document.getElementById('change-img');
  let remove = document.getElementsByClassName('img-fluid');
  for (var i = 0; i< remove.length; i++) {
    remove[i].classList.remove("border-brillant");
  }
  img.src=src.src;
  src.className += ' border-brillant';
}

// Cambio de orden de la descripción en el producto ampliado
// Cuando es para responsive se clona debajo de la foto ampliada.
var $el = $('#copy-to-innerHTML').clone();
$('#copy-innerhtml').append($el);