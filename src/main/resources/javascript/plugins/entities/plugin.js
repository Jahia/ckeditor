﻿/*
 Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function k(a,f){var g={},c=[],e={nbsp:" ",shy:"­",gt:"\x3e",lt:"\x3c",amp:"\x26",apos:"'",quot:'"'};a=a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(a,b){var d=f?"\x26"+b+";":e[b];g[d]=f?e[b]:"\x26"+b+";";c.push(d);return""});a=a.replace(/,$/,"");if(!f&&a){a=a.split(",");var b=document.createElement("div"),d;b.innerHTML="\x26"+a.join(";\x26")+";";d=b.innerHTML;b=null;for(b=0;b<d.length;b++){var h=d.charAt(b);g[h]="\x26"+a[b]+";";c.push(h)}}g.regex=c.join(f?"|":"");return g}
CKEDITOR.plugins.add("entities",{afterInit:function(a){function f(b){return h[b]}function g(a){return"force"!=c.entities_processNumerical&&b[a]?b[a]:"\x26#"+a.charCodeAt(0)+";"}var c=a.config;if(a=(a=a.dataProcessor)&&a.htmlFilter){var e=[];!1!==c.basicEntities&&e.push("nbsp,gt,lt,amp");c.entities&&(e.length&&e.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
c.entities_latin&&e.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"),c.entities_greek&&e.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
c.entities_additional&&e.push(c.entities_additional));var b=k(e.join(",")),d=b.regex?"["+b.regex+"]":"a^";delete b.regex;c.entities&&c.entities_processNumerical&&(d="[^ -~]|"+d);var d=new RegExp(d,"g"),h=k("nbsp,gt,lt,amp,shy",!0),l=new RegExp(h.regex,"g");a.addRules({text:function(a){return a.replace(l,f).replace(d,g)}},{applyToAll:!0,excludeNestedEditable:!0})}}})})();CKEDITOR.config.basicEntities=!0;CKEDITOR.config.entities=!0;CKEDITOR.config.entities_latin=!0;CKEDITOR.config.entities_greek=!0;
CKEDITOR.config.entities_additional="#39";