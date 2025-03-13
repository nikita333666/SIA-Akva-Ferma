// Scroller menu global variables
var sectionNames = ['start', 'examples', 'typical-projects', 'clients', 'faq', 'building', 'contacts'];
var sections = [];
var curMenuItem = sectionNames[0];

function InitMenuScroll() {

  var i, d;
  for (i = 0; i < sectionNames.length; i++) {
    d = document.getElementById(sectionNames[i]);
    sections.push(d);
  }
  
  var header_menu = document.getElementById('header');
  
  window.addEventListener('scroll', function(){
    var i, S, y, yh, dy, dyh, num, sectionName;
    y = window.scrollY;

    document.getElementById('arrow-up').style.visibility =
      y > 300 ? 'visible' : 'hidden';
    
    if ( y > 300 ) {
        header_menu.style.visibility = 'visible';
        header_menu.style.opacity = 1;
    }
    else {
        header_menu.style.visibility = 'hidden';
        header_menu.style.opacity = 0;
    }
    

    yh = y + window.innerHeight;
    num = -1;
    sectionName = '';
    for (i = 0; i < sections.length; i++) {
      S = sections[i];
      if (S) {
        dy = S.offsetTop;
        dyh = dy + S.clientHeight;
        if (yh > dy && y < dyh) {
          num = i;
          sectionName = S.id;
        }
      }
    }
    if (curMenuItem != sectionName) {
      SetCurMenuItem(sectionName);
    }
  });
}

function SetCurMenuItem(sectionName) {
  var i, m, a, CL, s;
  s = '#' + sectionName;
  m = document.querySelectorAll('#menu > ul > li > a');
  for (i = 0; i < m.length; i++) {
    a = m[i];
    CL = a.parentElement.classList;
    if (a.getAttribute('href') == s) CL.add('cur');
    else CL.remove('cur');
  }
}

function ShowMenuItems(show) {
  var i, m, t, dt;
  if (show) dt = 70; else dt = 10;
  m = document.querySelectorAll('#menu > ul > li');
  t = 1;
  for (i = 0; i < m.length; i++) {
    a = m[i];
    setTimeout(function(j){
      var a, CL;
      a = m[j];
      CL = a.classList;
      if (show) CL.add('shown');
      else CL.remove('shown');
    }, t, i);
    t += dt;
  }
}

function InitBurgerMenu() {
  var b = document.getElementsByClassName('burger-inner')[0];
  b.addEventListener('click', function(ev){
    var CL;
    ev.preventDefault();
    CL = document.body.classList;
    if (CL.contains('show-mob-menu')) {
      CL.remove('show-mob-menu');
      //CL.remove('show-mob-menu3');
      //setTimeout(function(){
      //  CL.remove('show-mob-menu2');
      //}, 340);
      ShowMenuItems(false);
    } else {
      CL.add('show-mob-menu');
      //CL.add('show-mob-menu2');
      //setTimeout(function(){
      //  CL.add('show-mob-menu3');
      //}, 40);
      ShowMenuItems(true);
    }
  });
}


function CloseAMenu() {
  var b = document.querySelectorAll('#menu > ul > li > a');
  console.log(b);
  
    for(i=0 ; i<b.length ; i++){
        b[i].addEventListener('click', function(ev){
            var CL;
            var name = this.getAttribute('href').slice(1);
            var arcor = document.getElementById(name);
            
            if (arcor) {
                var h = arcor.offsetTop;
                
                CL = document.body.classList;
                if (CL.contains('show-mob-menu')) {
                    CL.remove('show-mob-menu');
                    ShowMenuItems(false);
                    h = h - 50;
                } 
                ev.preventDefault();
                window.scrollTo(0, h);
            }
        });
    }
}


function InitArrowUp() {
  document.getElementById('arrow-up').addEventListener('click', function(ev){
    ev.preventDefault();
    window.scrollTo(0, 0);
  });
}

function InitTypedAnimation(feed_title, typed_id) {
  var m, inter, text, texts, T, typed;
  var i, e;
  m = document.querySelectorAll(feed_title);
  texts = [];
  if (m.length > 0) {
    inters = [];
    for (i = 0; i < m.length; i++) {
      e = m[i];
      text = e.innerText;
      //e.innerText = '';
      texts.push(text);
    }
    
    i = 0;
    typed = document.getElementById(typed_id);
    console.log(texts);
    
    // Через сколько начнется печататься текст после запуска
    setTimeout(function(){
        
        // Время между строками разными
        setInterval(function(){
            T = 1;
            typed.innerText = '';
            // Время между буквами
            inter = setInterval(function(){
                
                
                typed.innerText = texts[i].substr(0, T);
                
                T++;
                if(T == 50) clearInterval(inter);
            }, 100);
            
            i++;
            if( i >= m.length ) i=0;
            
        }, 3000);
    }, 500);    
    
    
  }
}

function PlayVideoClick(a) {
  var s;
  if (a.getAttribute('href') == '#') {
    a.setAttribute('href', '#on');
    s = a.parentElement.parentElement.querySelector('.video-code');
    s.parentElement.innerHTML = s.innerText;
  }
}

function InitVideo() {
  var m, i, a;
  m = document.querySelectorAll('.back-video .play');
  for (i = 0; i < m.length; i++) {
    a = m[i];
    if (window.innerWidth > 700) { // Desktop
      PlayVideoClick(a);
    } else { // Mobile
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        PlayVideoClick(this);
      });
    }
  }
}

function InitSubmenu() {
  var m, i, a;
  m = document.querySelectorAll('#menu .has-submenu > a');
  for (i = 0; i < m.length; i++) {
    a = m[i];
    a.addEventListener('click', function(ev){
      ev.preventDefault();
      this.parentElement.classList.toggle('open');
    });
  }
}

function InitOutclick() {
  document.addEventListener('click', function(ev){
    var T, m, i, a;
    m = document.querySelectorAll('#menu .has-submenu.open');
    if (m) {
      T = ev.target;
      while (T != null && !T.classList.contains('open')) T = T.parentElement;
      if (T == null) {
        for (i = 0; i < m.length; i++) {
          m[i].classList.remove('open');
        }
      }
    }
  });
}

function Init() {
    InitMenuScroll();
    InitBurgerMenu();
    //InitSubmenu();
    //InitOutclick();
    InitArrowUp();
    InitVideo();
    InitTypedAnimation('.feed-title', 'typed');
    InitTypedAnimation('.feed-title2', 'typed2');
  
    CloseAMenu();
    
    // Slaider
    var elms = document.getElementsByClassName( 'splide' );
    for ( var i = 0, len = elms.length; i < len; i++ ) {
    	new Splide( elms[ i ], {
        //focus    : 1,
        type   : 'loop',
        width: '900px',
	    perPage: 2,
	    //trimSpace: false,
	    perMove: 2,
	    breakpoints: {
		    800: {
    			perPage: 1,
    			perMove: 1,
        		},
        	},
        } ).mount();
    }
    
    // Accordion
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            
            for (var j = 0; j < acc.length; j++) {
                if(this==acc[j]) {continue;}
                acc[j].classList.remove("active");
                var panel2 = acc[j].nextElementSibling;
            
                panel2.style.maxHeight = null;
            }
            
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }
    
    // Return today date and time
    var currentTime = new Date()
    // returns the year (four digits)
    var year = currentTime.getFullYear();
    var x = document.getElementsByClassName("year")
    
    for (i = 0; i < x.length; i++) {
      x[i].innerHTML = year;
      
    }
    
}

Init();
