import{q as r,P as a}from"./entry.bbefaf41.js";function i(t,u=0,o=!1){let e;return(...n)=>{o&&!e&&t(...n),clearTimeout(e),e=setTimeout(()=>{t(...n)},u)}}function l(t,u,o=!1){const e=r(t);return a((s,c)=>({get(){return s(),e.value},set:i(f=>{e.value=f,c()},u,o)}))}export{l as u};
