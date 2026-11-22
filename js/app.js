const $ = (s) => document.querySelector(s);
const tabs = $('#pageTabs');
function showHome(){
  $('#home').classList.add('active');
  $('#htmlPage').classList.remove('active');
  tabs.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.page==='home'));
  window.scrollTo({top:0,behavior:'smooth'});
}
function showHtmlPage(page){
  $('#home').classList.remove('active');
  $('#htmlPage').classList.add('active');
  $('#htmlFrame').src=page.path;
  tabs.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.path===page.path));
  window.scrollTo({top:0,behavior:'smooth'});
}
function addPageTab(page){
  const button=document.createElement('button');
  button.className='tab';button.type='button';button.textContent=page.title;
  button.dataset.path=page.path;
  button.addEventListener('click',()=>showHtmlPage(page));
  tabs.append(button);
}
async function loadHtmlPages(){
  try{
    const response=await fetch('html/pages.json');
    if(!response.ok)throw new Error('pages.json bulunamadı');
    const pages=await response.json();
    pages.filter(p=>p&&typeof p.path==='string'&&p.path.endsWith('.html'))
      .forEach(addPageTab);
  }catch(error){console.warn('HTML sekmeleri listesi okunamadı:',error);}
}
tabs.querySelector('[data-page="home"]').addEventListener('click',showHome);
const copyButton=$('#copyServerIp');
copyButton.addEventListener('click',async()=>{
  const ip=$('#serverAddress').textContent.trim(),status=$('#copyStatus');
  try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(ip);
    else{
      const field=document.createElement('textarea');field.value=ip;
      field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();
      const ok=document.execCommand('copy');field.remove();if(!ok)throw new Error('copy failed');
    }
    status.textContent='IP adresi kopyalandı!';
  }catch(e){status.textContent='Kopyalanamadı: '+ip;}
});
loadHtmlPages();
