!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";function o(e){return new Date(1e3*e).toLocaleString()}n.r(t);n(0);document.addEventListener("DOMContentLoaded",(function(){function e(e){if(e.message)return document.getElementById("time").innerHTML=e.message;var t=o(e.dt);document.getElementById("timeCurrent").innerHTML=t;var n=e.feels_like,c=e.weather[0].description,r=n-273.15,i=1.8*(n-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(r),"°C || ").concat(Math.round(i),"°F"),document.getElementById("current-sky").innerHTML="".concat(c),y(c)}"geolocation"in navigator?navigator.geolocation.getCurrentPosition((function(o){var i=o.coords,a=i.latitude,d=i.longitude;t=[],n=[],c=!1,fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(a,"&lon=").concat(d,"&exclude=hourly,minutely&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(t){e(t.current),r(t.current,t.daily,!1)}))}),(function(e){document.getElementById("time").innerHTML=e.message}),{enableHighAccuracy:!1,timeout:5e3}):document.getElementById("time").innerHTML="Geolocation is not avaible on your browser, Please type in your city.",document.getElementById("input-city").addEventListener("change",(function(e){var o=e.target.value;o.length>0&&(i=o,fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(i,"&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(e){var o,a,d;!function(e,t){if(t.message)return document.getElementById("time").innerHTML=t.message;var n=function(e){var t=new Date(1e3*e).toUTCString();return t=t.slice(0,t.length-7)}(t.dt+t.timezone);document.getElementById("time").innerHTML=n;var o=t.main.feels_like,c=t.weather[0].description,r=o-273.15,i=1.8*(o-273)+32;document.getElementById("location").innerHTML="".concat(e),document.getElementById("current-temp").innerHTML="".concat(Math.round(r),"°C || ").concat(Math.round(i),"°F"),document.getElementById("current-sky").innerHTML="".concat(c),y(c)}(i,e),o=e.coord,a=o.lat,d=o.lon,t=[],n=[],c=!1,fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(a,"&lon=").concat(d,"&exclude=hourly,minutely&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(e){r(e.current,e.daily,!0)}))})));var i}));var t=[],n=[],c=!1;function r(e,o,r){n.push(e),o.map((function(e){t.push(e)})),c=r}var i=document.getElementById("modal-btn"),a=document.querySelector(".modal"),d=document.querySelector(".close-btn");i.onclick=function(){a.style.display="block"},d.onclick=function(){a.style.display="none"},window.onclick=function(e){e.target==a&&(a.style.display="none")};var u=document.getElementById("btn-forecast"),l=document.querySelector(".modal-forecast"),m=document.querySelector(".close-forecast-btn");u.onclick=function(){l.style.display="block"},m.onclick=function(){l.style.display="none"},window.onclick=function(e){e.target==l&&(l.style.display="none")},document.getElementById("input-forecast-city").addEventListener("change",(function(e){t=e.target.value,fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(t,"&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(e){!function(e,t){document.getElementById("future-location").innerHTML=e,document.querySelector("#diagram-date").innerHTML=t.map((function(e){var t=e.main.feels_like-273.15,n=1.8*(e.main.feels_like-273)+32,o={};o.label="".concat(e.dt_txt),o.y=Math.round(n),f.push(o);var c={};c.label="".concat(e.dt_txt),c.y=Math.round(t),g.push(c)}));var n=new CanvasJS.Chart("weatherContainer",{animationEnabled:!0,title:{text:"Forecasted Degree For Next Five Days"},axisX:{title:"Dates"},axisY:{title:"Fahrenheit",titleFontColor:"#4F81BC",lineColor:"#4F81BC",labelFontColor:"#4F81BC",tickColor:"#4F81BC",includeZero:!0},axisY2:{title:"Celcius",titleFontColor:"#C0504E",lineColor:"#C0504E",labelFontColor:"#C0504E",tickColor:"#C0504E",includeZero:!0},toolTip:{shared:!0},legend:{cursor:"pointer",itemclick:function(e){void 0===e.dataSeries.visible||e.dataSeries.visible?e.dataSeries.visible=!1:e.dataSeries.visible=!0,n.render()}},data:[{type:"column",name:"Fahrenheit",showInLegend:!0,yValueFormatString:"",dataPoints:f},{type:"column",name:"Celcius Degree",legendText:"Celcius Degree",axisYType:"secondary",showInLegend:!0,dataPoints:g}]});f=[],g=[],n.render()}(e.city.name,e.list)}));var t}));var s,f=[],g=[];function y(e){e.includes("snow")?(s="<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-blizzard-cold-winds-1153.wav' type='audio/wav'></audio>",document.getElementById("audio-music").innerHTML=s):e.includes("storm")?(s="<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-heavy-storm-rain-loop-2400.wav' type='audio/wav'></audio>",document.getElementById("audio-music").innerHTML=s):e.includes("rain")||e.includes("drizzle")||e.includes("mist")?(s="<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-the-rainforest-and-distant-thunders-1260.wav' type='audio/wav'></audio>",document.getElementById("audio-music").innerHTML=s):(s="<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-urban-ambient-sound-2465.wav' type='audio/wav'></audio>",document.getElementById("audio-music").innerHTML=s)}function p(){var e=document.getElementById("world"),t=document.getElementById("circle");e.style.transform="rotate(".concat(window.pageYOffset/10,"deg)"),t.style.transform="rotate(".concat(window.pageYOffset/10,"deg)")}window.onscroll=function(){p(),function(){if(console.log(n.length),n.length>0)if(c){if(window.pageYOffset<2e3){var r=t[0],i=o(r.dt);document.getElementById("time").innerHTML="Morning of ".concat(i.slice(0,9));var a=r.feels_like.day,d=r.weather[0].description,u=a-273.15,l=1.8*(a-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(u),"°C || ").concat(Math.round(l),"°F"),document.getElementById("current-sky").innerHTML="".concat(d),y(d)}}else e(n[0]);if(t.length>0){if(window.pageYOffset>=2e3&&window.pageYOffset<3e3){var m=t[0],s=o(m.dt);document.getElementById("time").innerHTML="Morning of ".concat(s.slice(0,9));var f=m.feels_like.day,g=m.weather[0].description,p=f-273.15,M=1.8*(f-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(p),"°C || ").concat(Math.round(M),"°F"),document.getElementById("current-sky").innerHTML="".concat(g),y(g)}if(window.pageYOffset>=3e3&&window.pageYOffset<4e3){var w=t[0],h=o(w.dt);document.getElementById("time").innerHTML="Evening of ".concat(h.slice(0,9));var v=w.feels_like.eve,E=w.weather[0].description,B=v-273.15,I=1.8*(v-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(B),"°C || ").concat(Math.round(I),"°F"),document.getElementById("current-sky").innerHTML="".concat(E),y(E)}if(window.pageYOffset>=4e3&&window.pageYOffset<5e3){var L=t[0],T=o(L.dt);document.getElementById("time").innerHTML="Night of ".concat(T.slice(0,9));var H=L.feels_like.night,k=L.weather[0].description,O=H-273.15,Y=1.8*(H-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(O),"°C || ").concat(Math.round(Y),"°F"),document.getElementById("current-sky").innerHTML="".concat(k),y(k)}if(window.pageYOffset>=5e3&&window.pageYOffset<6e3){var C=t[1],b=o(C.dt);document.getElementById("time").innerHTML="Morning of ".concat(b.slice(0,9));var F=C.feels_like.day,_=C.weather[0].description,x=F-273.15,S=1.8*(F-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(x),"°C || ").concat(Math.round(S),"°F"),document.getElementById("current-sky").innerHTML="".concat(_),y(_)}if(window.pageYOffset>=6e3&&window.pageYOffset<7e3){var j=t[1],N=o(j.dt);document.getElementById("time").innerHTML="Evening of ".concat(N.slice(0,9));var P=j.feels_like.eve,D=j.weather[0].description,q=P-273.15,z=1.8*(P-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(q),"°C || ").concat(Math.round(z),"°F"),document.getElementById("current-sky").innerHTML="".concat(D),y(D)}if(window.pageYOffset>=7e3&&window.pageYOffset<8e3){var A=t[1],Z=o(A.dt);document.getElementById("time").innerHTML="Night of ".concat(Z.slice(0,9));var G=A.feels_like.night,J=A.weather[0].description,U=G-273.15,V=1.8*(G-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(U),"°C || ").concat(Math.round(V),"°F"),document.getElementById("current-sky").innerHTML="".concat(J),y(J)}if(window.pageYOffset>=8e3&&window.pageYOffset<9e3){var X=t[2],K=o(X.dt);document.getElementById("time").innerHTML="Morning of ".concat(K.slice(0,9));var Q=X.feels_like.day,R=X.weather[0].description,W=Q-273.15,$=1.8*(Q-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(W),"°C || ").concat(Math.round($),"°F"),document.getElementById("current-sky").innerHTML="".concat(R),y(R)}if(window.pageYOffset>=9e3&&window.pageYOffset<10500){var ee=t[2],te=o(ee.dt);document.getElementById("time").innerHTML="Evening of ".concat(te.slice(0,9));var ne=ee.feels_like.eve,oe=ee.weather[0].description,ce=ne-273.15,re=1.8*(ne-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(ce),"°C || ").concat(Math.round(re),"°F"),document.getElementById("current-sky").innerHTML="".concat(oe),y(oe)}if(window.pageYOffset>=10500&&window.pageYOffset<12e3){var ie=t[2],ae=o(ie.dt);document.getElementById("time").innerHTML="Night of ".concat(ae.slice(0,9));var de=ie.feels_like.night,ue=ie.weather[0].description,le=de-273.15,me=1.8*(de-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(le),"°C || ").concat(Math.round(me),"°F"),document.getElementById("current-sky").innerHTML="".concat(ue),y(ue)}if(window.pageYOffset>=12e3&&window.pageYOffset<13e3){var se=t[3],fe=o(se.dt);document.getElementById("time").innerHTML="Morning of ".concat(fe.slice(0,9));var ge=se.feels_like.day,ye=se.weather[0].description,pe=ge-273.15,Me=1.8*(ge-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(pe),"°C || ").concat(Math.round(Me),"°F"),document.getElementById("current-sky").innerHTML="".concat(ye),y(ye)}if(window.pageYOffset>=13e3&&window.pageYOffset<14e3){var we=t[3],he=o(we.dt);document.getElementById("time").innerHTML="Evening of ".concat(he.slice(0,9));var ve=we.feels_like.eve,Ee=we.weather[0].description,Be=ve-273.15,Ie=1.8*(ve-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(Be),"°C || ").concat(Math.round(Ie),"°F"),document.getElementById("current-sky").innerHTML="".concat(Ee),y(Ee)}if(window.pageYOffset>=14e3&&window.pageYOffset<15e3){var Le=t[3],Te=o(Le.dt);document.getElementById("time").innerHTML="Night of ".concat(Te.slice(0,9));var He=Le.feels_like.night,ke=Le.weather[0].description,Oe=He-273.15,Ye=1.8*(He-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(Oe),"°C || ").concat(Math.round(Ye),"°F"),document.getElementById("current-sky").innerHTML="".concat(ke),y(ke)}if(window.pageYOffset>=15e3&&window.pageYOffset<17e3){var Ce=t[4],be=o(Ce.dt);document.getElementById("time").innerHTML="Morning of ".concat(be.slice(0,9));var Fe=Ce.feels_like.day,_e=Ce.weather[0].description,xe=Fe-273.15,Se=1.8*(Fe-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(xe),"°C || ").concat(Math.round(Se),"°F"),document.getElementById("current-sky").innerHTML="".concat(_e),y(_e)}if(window.pageYOffset>=17e3&&window.pageYOffset<18e3){var je=t[4],Ne=o(je.dt);document.getElementById("time").innerHTML="Evening of ".concat(Ne.slice(0,9));var Pe=je.feels_like.eve,De=je.weather[0].description,qe=Pe-273.15,ze=1.8*(Pe-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(qe),"°C || ").concat(Math.round(ze),"°F"),document.getElementById("current-sky").innerHTML="".concat(De),y(De)}if(window.pageYOffset>=18e3&&window.pageYOffset<19e3){var Ae=t[4],Ze=o(Ae.dt);document.getElementById("time").innerHTML="Night of ".concat(Ze.slice(0,9));var Ge=Ae.feels_like.night,Je=Ae.weather[0].description,Ue=Ge-273.15,Ve=1.8*(Ge-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(Ue),"°C || ").concat(Math.round(Ve),"°F"),document.getElementById("current-sky").innerHTML="".concat(Je),y(Je)}if(window.pageYOffset>=19e3&&window.pageYOffset<2e4){var Xe=t[5],Ke=o(Xe.dt);document.getElementById("time").innerHTML="Morning of ".concat(Ke.slice(0,9));var Qe=Xe.feels_like.day,Re=Xe.weather[0].description,We=Qe-273.15,$e=1.8*(Qe-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(We),"°C || ").concat(Math.round($e),"°F"),document.getElementById("current-sky").innerHTML="".concat(Re),y(Re)}if(window.pageYOffset>=2e4&&window.pageYOffset<21e3){var et=t[5],tt=o(et.dt);document.getElementById("time").innerHTML="Evening of ".concat(tt.slice(0,9));var nt=et.feels_like.eve,ot=et.weather[0].description,ct=nt-273.15,rt=1.8*(nt-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(ct),"°C || ").concat(Math.round(rt),"°F"),document.getElementById("current-sky").innerHTML="".concat(ot),y(ot)}if(window.pageYOffset>=21e3&&window.pageYOffset<22e3){var it=t[5],at=o(it.dt);document.getElementById("time").innerHTML="Night of ".concat(at.slice(0,9));var dt=it.feels_like.night,ut=it.weather[0].description,lt=dt-273.15,mt=1.8*(dt-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(lt),"°C || ").concat(Math.round(mt),"°F"),document.getElementById("current-sky").innerHTML="".concat(ut),y(ut)}if(window.pageYOffset>=22e3&&window.pageYOffset<23e3){var st=t[6],ft=o(st.dt);document.getElementById("time").innerHTML="Morning of ".concat(ft.slice(0,9));var gt=st.feels_like.day,yt=st.weather[0].description,pt=gt-273.15,Mt=1.8*(gt-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(pt),"°C || ").concat(Math.round(Mt),"°F"),document.getElementById("current-sky").innerHTML="".concat(yt),y(yt)}if(window.pageYOffset>=23e3&&window.pageYOffset<25e3){var wt=t[6],ht=o(wt.dt);document.getElementById("time").innerHTML="Evening of ".concat(ht.slice(0,9));var vt=wt.feels_like.eve,Et=wt.weather[0].description,Bt=vt-273.15,It=1.8*(vt-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(Bt),"°C || ").concat(Math.round(It),"°F"),document.getElementById("current-sky").innerHTML="".concat(Et),y(Et)}if(window.pageYOffset>=25e3&&window.pageYOffset<26e3){var Lt=t[6],Tt=o(Lt.dt);document.getElementById("time").innerHTML="Night of ".concat(Tt.slice(0,9));var Ht=Lt.feels_like.night,kt=Lt.weather[0].description,Ot=Ht-273.15,Yt=1.8*(Ht-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(Ot),"°C || ").concat(Math.round(Yt),"°F"),document.getElementById("current-sky").innerHTML="".concat(kt),y(kt)}if(window.pageYOffset>=26e3&&window.pageYOffset<27e3){var Ct=t[7],bt=o(Ct.dt);document.getElementById("time").innerHTML="Morning of ".concat(bt.slice(0,9));var Ft=Ct.feels_like.day,_t=Ct.weather[0].description,xt=Ft-273.15,St=1.8*(Ft-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(xt),"°C || ").concat(Math.round(St),"°F"),document.getElementById("current-sky").innerHTML="".concat(_t),y(_t)}if(window.pageYOffset>=27e3&&window.pageYOffset<28e3){var jt=t[7],Nt=o(jt.dt);document.getElementById("time").innerHTML="Evening of ".concat(Nt.slice(0,9));var Pt=jt.feels_like.eve,Dt=jt.weather[0].description,qt=Pt-273.15,zt=1.8*(Pt-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(qt),"°C || ").concat(Math.round(zt),"°F"),document.getElementById("current-sky").innerHTML="".concat(Dt),y(Dt)}if(window.pageYOffset>=28e3&&window.pageYOffset<29e3){var At=t[7],Zt=o(At.dt);document.getElementById("time").innerHTML="Night of ".concat(Zt.slice(0,9));var Gt=At.feels_like.night,Jt=At.weather[0].description,Ut=Gt-273.15,Vt=1.8*(Gt-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(Ut),"°C || ").concat(Math.round(Vt),"°F"),document.getElementById("current-sky").innerHTML="".concat(Jt),y(Jt)}}}()},p()}))}]);
//# sourceMappingURL=main.js.map