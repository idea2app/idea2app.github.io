if(!self.define){let e,c={};const i=(i,n)=>(i=new URL(i+".js",n).href,c[i]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=c,document.head.appendChild(e)}else e=i,importScripts(i),c()})).then((()=>{let e=c[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(c[r])return;let a={};const d=e=>i(e,r),o={module:{uri:r},exports:a,require:d};c[r]=Promise.all(n.map((e=>o[e]||d(e)))).then((e=>(s(...e),a)))}}define(["./workbox-3e5be431"],(function(e){"use strict";importScripts("https://cdn.jsdelivr.net/npm/workbox-sw@6.5.1/build/workbox-sw.min.js"),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"case-2049.3d59b9b6.png",revision:"64d8d41b70e5b25330134213cc91de51"},{url:"case-EthPlanet.30eae6de.png",revision:"9889e0144724d91d137c3d4a8a0c8186"},{url:"case-FloatIsland.ee51bb7e.png",revision:"5be22c345b7fd20d81538422388840e7"},{url:"case-IndustryData.a238e130.png",revision:"5ac0b9ee624dfcae677fc3db000fc727"},{url:"case-InstitutionAnalysis.f294c681.png",revision:"79885f50dc125dd8386ca3080401b034"},{url:"case-JianYangWomenUnion.08c7e809.jpg",revision:"6541ae4cebd78b15989b37d4c039d363"},{url:"case-MyPoker.2fc3aab5.png",revision:"e3da37d238287d77e69ec51cfa3404d7"},{url:"case-NgoLawWiki.efc655f8.png",revision:"61eb2f86e507e8bdf551606468447d21"},{url:"case-OAFevent.1a35168a.jpeg",revision:"56eb39ebe05ddcd5f504c2556eeafb68"},{url:"case-OralCavity.3c33b849.png",revision:"85a78838f4d1b392369fbc0514b0ac6e"},{url:"case-ShopifyCopy.b83c8183.png",revision:"d9b3d5cfcc4f932e500c865fe743c327"},{url:"index.58e0e2e6.js",revision:"e731a8b7f48482ea42093446886377c6"},{url:"index.92e288b3.css",revision:"37b921cb56a673b5aa20fc1f9a0a47a1"},{url:"index.html",revision:"56fbc4abb60820341fa2ebcb8c12372e"},{url:"WebCell-0.4f38933c.png",revision:"f18fa24522098f78939a4ccdd91e6d64"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=sw.js.map