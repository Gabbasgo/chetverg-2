(function(){
  /* reveal on scroll */
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  /* jump to contacts */
  var ct=document.getElementById('contacts'),dn=document.getElementById('dn');
  function go(e){e&&e.preventDefault();window.scrollTo({top:ct.offsetTop,behavior:'auto'})}
  dn.addEventListener('click',go);
  document.querySelectorAll('[data-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();ct.scrollIntoView({behavior:'smooth'})})});
  var about=document.getElementById('about');
  function chk(){
    var y=window.scrollY||document.documentElement.scrollTop,vh=window.innerHeight;
    var show=y+vh*.5>about.offsetTop && y+vh<ct.offsetTop+vh*.55 && y<ct.offsetTop-vh*.2;
    dn.classList.toggle('on',show);
  }
  window.addEventListener('scroll',chk,{passive:true});window.addEventListener('resize',chk);chk();

  /* slider */
  var N=12,i=0,tr=document.getElementById('tr'),sl=document.getElementById('slider');
  for(var k=1;k<=N;k++){var im=new Image();im.src='assets/slides/slide-'+(k<10?'0':'')+k+'.jpg';im.alt='Слайд '+k;im.draggable=false;if(k>2)im.loading='lazy';tr.appendChild(im)}
  function set(n){i=(n+N)%N;tr.style.transform='translateX('+(-i*100)+'%)'}
  sl.querySelector('.p').addEventListener('click',function(){set(i-1)});
  sl.querySelector('.n').addEventListener('click',function(){set(i+1)});
  var sx=null;
  tr.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  tr.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>35)set(i+(d<0?1:-1));sx=null});

  /* form -> mailto */
  var f=document.getElementById('form'),f1=document.getElementById('f1'),f2=document.getElementById('f2'),ok=document.getElementById('ok');
  [f1,f2].forEach(function(x){x.addEventListener('input',function(){x.classList.remove('er')})});
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=false;
    if(!f1.value.trim()){f1.classList.add('er');bad=true}
    if(f2.value.replace(/\D/g,'').length<10){f2.classList.add('er');bad=true}
    if(bad)return;
    ok.style.display='block';
    var body='Описание идеи / кадастровый номер: '+f1.value.trim()+'\nТелефон: '+f2.value.trim();
    location.href='mailto:murat.bogdanof@yandex.ru?subject='+encodeURIComponent('Заявка на расчёт с сайта')+'&body='+encodeURIComponent(body);
  });
})();
