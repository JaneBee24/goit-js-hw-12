import p from"axios";import{S as h,i as s}from"./assets/vendor-Dg3uDB0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const L="49034890-15d0e202b9bb59c7b310d7a4f",b="https://pixabay.com/api/";async function f(o,t,i){try{const a=await p.get(b,{params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i}});return{images:a.data.hits,total:a.data.totalHits}}catch(a){throw console.error("Помилка при отриманні даних:",a),new Error("Не вдалося завантажити зображення")}}const g=document.querySelector(".gallery");let w=new h(".gallery a",{captionsData:"alt",captionDelay:250});function y(o){const t=o.map(({webformatURL:i,largeImageURL:a,tags:e})=>`
        <div class="gallery-item">
            <a href="${a}">
                <img src="${i}" alt="${e}" loading="lazy" />
            </a>
        </div>
    `).join("");g.insertAdjacentHTML("beforeend",t),w.refresh()}function q(){g.innerHTML=""}const v=document.querySelector(".search-form");document.querySelector(".gallery");const l=document.querySelector(".load-more");let c="",n=1;const d=40;let m=0;v.addEventListener("submit",async o=>{if(o.preventDefault(),c=o.currentTarget.elements.query.value.trim(),!c){s.warning({title:"Увага",message:"Введіть запит для пошуку!"});return}n=1,q(),l.classList.add("hidden");try{const{images:t,total:i}=await f(c,n,d);if(m=i,t.length===0){s.error({title:"Помилка",message:"Нічого не знайдено!"});return}y(t),m>d&&l.classList.remove("hidden")}catch{s.error({title:"Помилка",message:"Не вдалося завантажити зображення."})}});l.addEventListener("click",async()=>{n++;try{const{images:o}=await f(c,n,d);y(o),n*d>=m&&(l.classList.add("hidden"),s.info({title:"Інформація",message:"Це останні зображення."}));const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{s.error({title:"Помилка",message:"Не вдалося завантажити зображення."})}});
//# sourceMappingURL=index.js.map
