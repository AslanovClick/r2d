// Shared behaviour for the inner pages: language dropdown, mobile menu, cursor glow
const $=s=>document.querySelector(s);
// language — pages may set window.onLang(code) to react to a pick and window.initLang to preselect one
(function(){const L=[['en.svg','English','EN'],['ru.svg','Русский','RU'],['br.svg','Português (BR)','BR'],['pt.svg','Português (PT)','PT'],['es.svg','Español','ES'],['fr.png','Français','FR'],['it.png','Italiano','IT'],['de.png','Deutsch','DE']];
  const btn=$('#langBtn'),list=$('#langList');let cur='EN';
  function render(){list.innerHTML=L.map(([f,n,c])=>'<li><button type="button" role="option" aria-selected="'+(c===cur)+'" data-l="'+c+'"><img class="flag" src="/img/flags/'+f+'" alt="">'+n+'<b>'+c+'</b></button></li>').join('')}
  function pick(c,silent){const it=L.find(x=>x[2]===c);if(!it)return;cur=c;btn.querySelector('.flag').src='/img/flags/'+it[0];$('#langCode').textContent=c;render();if(!silent&&window.onLang)window.onLang(c)}
  const open=v=>{list.hidden=!v;btn.setAttribute('aria-expanded',v)};
  render();if(window.initLang)pick(window.initLang,true);
  btn.onclick=e=>{e.stopPropagation();open(list.hidden)};
  list.onclick=e=>{const b=e.target.closest('[data-l]');if(!b)return;pick(b.dataset.l);open(false)};
  document.addEventListener('click',()=>open(false));document.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)})})();
// mobile menu
(()=>{const b=$('#burger'),m=$('#mnav');const dd=$('.lang-dd'),home=dd.parentElement,slot=$('#mnavLang'),mq=matchMedia('(max-width:640px)');
  const place=()=>{(mq.matches?slot:home).appendChild(dd)};place();mq.addEventListener('change',place);
  const hdr=$('.top');const setH=()=>document.documentElement.style.setProperty('--hh',hdr.getBoundingClientRect().bottom+'px');addEventListener('resize',setH);
  const set=o=>{setH();b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');m.hidden=!o;document.body.classList.toggle('menu-open',o)};
  b.onclick=()=>set(m.hidden);m.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});addEventListener('keydown',e=>{if(e.key==='Escape')set(false)})})();
// cursor glow
(()=>{const g=$('#cursorGlow');if(!g||matchMedia('(hover:none),(prefers-reduced-motion:reduce)').matches)return;
  let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,raf=0;
  const tick=()=>{x+=(tx-x)*.08;y+=(ty-y)*.08;g.style.transform='translate3d('+x+'px,'+y+'px,0)';raf=(Math.abs(tx-x)+Math.abs(ty-y)>.5)?requestAnimationFrame(tick):0};
  addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;g.classList.add('on');if(!raf)raf=requestAnimationFrame(tick)},{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>g.classList.remove('on'))})();
