import{u as r}from"./warehouse.63771b4a.js";import{u as n}from"./asyncData.35e0061c.js";import{b as u,m as c,o as i,h as m,i as a,E as l,y as p,u as d,F as _}from"./entry.bbefaf41.js";const h={class:"text-white text-4xl font-bold"},f={class:"text-vvn-gray capitalize"},E=u({__name:"WarehouseHeaderWidget",setup(y){const e=r(),t=c();return n(async()=>{await e.findById(t.params.warehouseId)},"$Hmpa5OqREz"),(o,x)=>{var s;return i(),m(_,null,[a("h1",h,[l(o.$slots,"default")]),a("h2",f,p(((s=d(e).warehouse)==null?void 0:s.name)||"")+" ",1)],64)}}});export{E as _};