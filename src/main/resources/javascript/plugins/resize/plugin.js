﻿/*
 Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add("resize",{init:function(b){function f(d){var e=c.width,m=c.height,f=e+(d.data.$.screenX-n.x)*("rtl"==g?-1:1);d=m+(d.data.$.screenY-n.y);h&&(e=Math.max(a.resize_minWidth,Math.min(f,a.resize_maxWidth)));p&&(m=Math.max(a.resize_minHeight,Math.min(d,a.resize_maxHeight)));b.resize(h?e:null,m)}function k(){CKEDITOR.document.removeListener("mousemove",f);CKEDITOR.document.removeListener("mouseup",k);b.document&&(b.document.removeListener("mousemove",f),b.document.removeListener("mouseup",
k))}var a=b.config,r=b.ui.spaceId("resizer"),g=b.element?b.element.getDirection(1):"ltr";!a.resize_dir&&(a.resize_dir="vertical");void 0===a.resize_maxWidth&&(a.resize_maxWidth=3E3);void 0===a.resize_maxHeight&&(a.resize_maxHeight=3E3);void 0===a.resize_minWidth&&(a.resize_minWidth=750);void 0===a.resize_minHeight&&(a.resize_minHeight=250);if(!1!==a.resize_enabled){var l=null,n,c,h=("both"==a.resize_dir||"horizontal"==a.resize_dir)&&a.resize_minWidth!=a.resize_maxWidth,p=("both"==a.resize_dir||"vertical"==
a.resize_dir)&&a.resize_minHeight!=a.resize_maxHeight,q=CKEDITOR.tools.addFunction(function(d){l||(l=b.getResizable());c={width:l.$.offsetWidth||0,height:l.$.offsetHeight||0};n={x:d.screenX,y:d.screenY};a.resize_minWidth>c.width&&(a.resize_minWidth=c.width);a.resize_minHeight>c.height&&(a.resize_minHeight=c.height);CKEDITOR.document.on("mousemove",f);CKEDITOR.document.on("mouseup",k);b.document&&(b.document.on("mousemove",f),b.document.on("mouseup",k));d.preventDefault&&d.preventDefault()});b.on("destroy",
function(){CKEDITOR.tools.removeFunction(q)});b.on("uiSpace",function(a){if("bottom"==a.data.space){var e="";h&&!p&&(e=" cke_resizer_horizontal");!h&&p&&(e=" cke_resizer_vertical");var c='\x3cspan id\x3d"'+r+'" class\x3d"cke_resizer'+e+" cke_resizer_"+g+'" title\x3d"'+CKEDITOR.tools.htmlEncode(b.lang.common.resize)+'" onmousedown\x3d"CKEDITOR.tools.callFunction('+q+', event)"\x3e'+("ltr"==g?"◢":"◣")+"\x3c/span\x3e";"ltr"==g&&"ltr"==e?a.data.html+=c:a.data.html=c+a.data.html}},b,null,100);b.on("maximize",
function(a){b.ui.space("resizer")[a.data==CKEDITOR.TRISTATE_ON?"hide":"show"]()})}}});