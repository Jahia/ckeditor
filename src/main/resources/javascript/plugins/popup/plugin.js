﻿/*
 Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add("popup");
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{popup:function(e,a,b,d,f){a=a||"80%";b=b||"70%";"string"==typeof a&&1<a.length&&"%"==a.substr(a.length-1,1)&&(a=parseInt(window.screen.width*parseInt(a,10)/100,10));"string"==typeof b&&1<b.length&&"%"==b.substr(b.length-1,1)&&(b=parseInt(window.screen.height*parseInt(b,10)/100,10));640>a&&(a=640);420>b&&(b=420);var g=parseInt((window.screen.height-b)/2,10),h=parseInt((window.screen.width-a)/2,10);d=(d||"location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes")+",width\x3d"+
a+",height\x3d"+b+",top\x3d"+g+",left\x3d"+h;var c=window.open("",f,d,!0);if(!c)return!1;try{-1==navigator.userAgent.toLowerCase().indexOf(" chrome/")&&(c.moveTo(h,g),c.resizeTo(a,b)),c.focus(),c.location.href=e}catch(k){window.open(e,f,d,!0)}return!0}});