// ==UserScript==
// @name     	Tiny Attack Bookmarklet
// @version  	1.0.1
// @description	Adds information to your Tiny Attack games.
// @author		Fex
// @grant    	none
// @homepageURL	https://ta-bs.github.io/
// @downloadURL https://ta-bs.github.io/bookmarklet/tabm.user.js
// @updateURL   https://ta-bs.github.io/bookmarklet/tabm.meta.js
// @namespace	https://www.tinyattack.com/
// @match  	    https://www.tinyattack.com/game/view.html?gameId=*
// ==/UserScript==

function doIt(){const t=JSON.parse,e=document,n=e.documentElement.outerHTML,a=t(n.match(/'gameId': (\d+)/)[1]),o=t(n.match(/'playerId': (\d+)/)[1]),c=t(n.match(/'colors': (\[[^\]]+\])/)[1]),r=t(n.match(/, 'unit': ([^']+),/)[1]),s=176===o,[i,d,l,m,h,p]=["unitId","skinId","coin","title","type","weight"].map((t=>r.key.indexOf(t))),f=[],g=[];r.data.forEach((t=>{f.push(t[i]),g[t[i]]={c:t[l],t:t[m],s:t[d],tw:t[h]+t[p]}}));const u=["LandLight","LandHeavy","AirLight","AirHeavy","WaterLight","WaterHeavy","WaterStealth"];function y(t,e){t.appendChild(e)}function b(t){return e.createElement(t)}function x(t,n,a){const o=b("td");o.title=n??t,y(o,e.createTextNode("number"==typeof t?t.toLocaleString():t));const c=o.style;return c.color=a??"#fff",c.fontSize="14px",c.fontWeight="bolder",c.textAlign="center",c.padding="5px",o}f.sort(((t,e)=>{const n=u.indexOf(g[t].tw),a=u.indexOf(g[e].tw);return n===a?g[t].c-g[e].c:n-a})),fetch("https://cdn.tinyattack.com/game/"+a+"/public.json").then((t=>t.json())).then((t=>{const n=t.player.data,a=n.length,o=[];for(let t=0;t<a;t++)o[t+1]={c:n[t][12],s:0,p:0,u:[]},f.forEach((e=>o[t+1].u[e]={n:0,h:0}));t.coordinate.data.forEach((t=>{const e=t[2],n=t[5],a=t[3];e&&n&&a&&(o[a].s+=g[e].c*n/10,o[a].p+=g[e].c,o[a].u[e].n+=1,o[a].u[e].h+=n)}));const r=f.filter((t=>o.some((e=>e.u[t].n>0)))),i=b("table");i.style.marginTop="4px",i.style.marginBottom="8px";const d=b("tr");s&&y(d,x("$","$","#000")),r.forEach((t=>{const e=b("td"),n=b("img");n.alt=n.title=g[t].t,n.src="https://cdn.tinyattack.com/img/skin/"+g[t].s+"/0.png?t=0",y(e,n),y(d,e)})),y(d,x("STR","Current Army Strength","#000")),y(d,x("POT","Army Potential","#000")),y(i,d),o.forEach(((t,e)=>{const n=b("tr");s&&y(n,x(t.c)),n.style.backgroundColor=c[e].hex.darker,n.style.border="1px solid black",r.forEach((e=>{y(n,x(t.u[e].n))})),y(n,x(Math.round(t.s))),y(n,x(t.p)),y(i,n)}));const l=b("a");l.href="https://ta-bs.github.io/",l.target="_blank",l.classList.add("btn","btn-primary","w-lg-auto");const m=b("span");m.classList.add("fa","fa-external-link-alt"),y(l,m),y(l,e.createTextNode(" Open Battle Simulator"));const h=b("button");h.classList.add("btn","btn-primary","w-lg-auto"),h.addEventListener("click",(()=>doIt()));const p=b("span");p.classList.add("fa","fa-redo"),y(h,p),y(h,e.createTextNode(" Refresh"));const u=b("div");y(u,l),y(u,e.createTextNode(" ")),y(u,h);const k=b("div");k.id="tabsbm",k.style.marginTop="4px",k.style.marginBottom="8px",y(k,i),y(k,u);const w=e.getElementById("tabsbm"),E=e.getElementById("game"),L=E.parentElement;w&&L.removeChild(w),L.insertBefore(k,E)}))}window.location.href.startsWith("https://www.tinyattack.com/game/view.html?gameId=")&&doIt();
