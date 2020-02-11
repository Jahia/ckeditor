﻿/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){CKEDITOR.dialog.add("link",function(d){function r(a,b){var d=a.createRange();d.setStartBefore(b);d.setEndAfter(b);return d}var n=CKEDITOR.plugins.link,p,q=function(){var a=this.getDialog(),b=a.getContentElement("target","popupFeatures"),a=a.getContentElement("target","linkTargetName"),c=this.getValue();if(b&&a)switch(b=b.getElement(),b.hide(),a.setValue(""),c){case "frame":a.setLabel(d.lang.link.targetFrameName);a.getElement().show();break;case "popup":b.show();a.setLabel(d.lang.link.targetPopupName);
a.getElement().show();break;default:a.setValue(c),a.getElement().hide()}},e=function(a){a.target&&this.setValue(a.target[this.id]||"")},g=function(a){a.advanced&&this.setValue(a.advanced[this.id]||"")},f=function(a){a.target||(a.target={});a.target[this.id]=this.getValue()||""},h=function(a){a.advanced||(a.advanced={});a.advanced[this.id]=this.getValue()||""},c=d.lang.common,b=d.lang.link,k;return{title:b.title,minWidth:"moono-lisa"==(CKEDITOR.skinName||d.config.skin)?450:350,minHeight:240,getModel:function(a){return n.getSelectedLink(a,
!0)[0]||null},contents:[{id:"info",label:b.info,title:b.info,elements:[{type:"text",id:"linkDisplayText",label:b.displayText,setup:function(){this.enable();this.setValue(d.getSelection().getSelectedText());p=this.getValue()},commit:function(a){a.linkText=this.isEnabled()?this.getValue():""}},{id:"linkType",type:"select",label:b.type,"default":"url",items:[[b.toUrl,"url"],[b.toAnchor,"anchor"],[b.toEmail,"email"],[b.toPhone,"tel"]],onChange:function(){var a=this.getDialog(),b=["urlOptions","anchorOptions",
"emailOptions","telOptions"],c=this.getValue(),m=a.definition.getContents("upload"),m=m&&m.hidden;"url"==c?(d.config.linkShowTargetTab&&a.showPage("target"),m||a.showPage("upload")):(a.hidePage("target"),m||a.hidePage("upload"));for(m=0;m<b.length;m++){var l=a.getContentElement("info",b[m]);l&&(l=l.getElement().getParent().getParent(),b[m]==c+"Options"?l.show():l.hide())}a.layout()},setup:function(a){this.setValue(a.type||"url")},commit:function(a){a.type=this.getValue()}},{type:"vbox",id:"urlOptions",
children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:c.protocol,items:[["http://‎","http://"],["https://‎","https://"],["ftp://‎","ftp://"],["news://‎","news://"],[b.other,""]],"default":d.config.linkDefaultProtocol,setup:function(a){a.url&&this.setValue(a.url.protocol||"")},commit:function(a){a.url||(a.url={});a.url.protocol=this.getValue()}},{type:"text",id:"url",label:c.url,required:!0,onLoad:function(){this.allowOnChange=!0},onKeyUp:function(){this.allowOnChange=
!1;var a=this.getDialog().getContentElement("info","protocol"),b=this.getValue(),d=/^((javascript:)|[#\/\.\?])/i,c=/^(http|https|ftp|news):\/\/(?=.)/i.exec(b);c?(this.setValue(b.substr(c[0].length)),a.setValue(c[0].toLowerCase())):d.test(b)&&a.setValue("");this.allowOnChange=!0},onChange:function(){if(this.allowOnChange)this.onKeyUp()},validate:function(){var a=this.getDialog();return a.getContentElement("info","linkType")&&"url"!=a.getValueOf("info","linkType")?!0:!d.config.linkJavaScriptLinksAllowed&&
/javascript\:/.test(this.getValue())?(alert(c.invalidValue),!1):this.getDialog().fakeObj?!0:CKEDITOR.dialog.validate.notEmpty(b.noUrl).apply(this)},setup:function(a){this.allowOnChange=!1;a.url&&this.setValue(a.url.url);this.allowOnChange=!0},commit:function(a){this.onChange();a.url||(a.url={});a.url.url=this.getValue();this.allowOnChange=!1}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().show()}},{type:"hbox",align:"center",children:[{type:"button",id:"browse",
style:"float:right",hidden:"true",filebrowser:{action:"Browse",url:d.config.filebrowserLinkBrowseUrl,target:"info:url"},label:c.browseServer+" ("+(c.browseServerPages||"Content")+")"},{type:"button",id:"browseFiles",style:"float:left",hidden:"true",filebrowser:{action:"Browse",url:d.config.filebrowserBrowseUrl,target:"info:url"},label:c.browseServer+" ("+(c.browseServerFiles||"Files")+")"}]}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",
label:b.selectAnchor,setup:function(){k=n.getEditorAnchors(d);this.getElement()[k&&k.length?"show":"hide"]()},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:b.anchorName,style:"width: 100%;",items:[[""]],setup:function(a){this.clear();this.add("");if(k)for(var b=0;b<k.length;b++)k[b].name&&this.add(k[b].name);a.anchor&&this.setValue(a.anchor.name);(a=this.getDialog().getContentElement("info","linkType"))&&"email"==a.getValue()&&this.focus()},commit:function(a){a.anchor||
(a.anchor={});a.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:b.anchorId,style:"width: 100%;",items:[[""]],setup:function(a){this.clear();this.add("");if(k)for(var b=0;b<k.length;b++)k[b].id&&this.add(k[b].id);a.anchor&&this.setValue(a.anchor.id)},commit:function(a){a.anchor||(a.anchor={});a.anchor.id=this.getValue()}}],setup:function(){this.getElement()[k&&k.length?"show":"hide"]()}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'\x3cdiv role\x3d"note" tabIndex\x3d"-1"\x3e'+
CKEDITOR.tools.htmlEncode(b.noAnchors)+"\x3c/div\x3e",focus:!0,setup:function(){this.getElement()[k&&k.length?"hide":"show"]()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:b.emailAddress,required:!0,validate:function(){var a=this.getDialog();return a.getContentElement("info","linkType")&&"email"==a.getValueOf("info","linkType")?CKEDITOR.dialog.validate.notEmpty(b.noEmail).apply(this):
!0},setup:function(a){a.email&&this.setValue(a.email.address);(a=this.getDialog().getContentElement("info","linkType"))&&"email"==a.getValue()&&this.select()},commit:function(a){a.email||(a.email={});a.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:b.emailSubject,setup:function(a){a.email&&this.setValue(a.email.subject)},commit:function(a){a.email||(a.email={});a.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:b.emailBody,rows:3,"default":"",setup:function(a){a.email&&
this.setValue(a.email.body)},commit:function(a){a.email||(a.email={});a.email.body=this.getValue()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}},{type:"hbox",children:[{type:"text",label:b.advisoryTitle,"default":"",id:"advTitle",setup:g,commit:h}]}]},{id:"target",requiredContent:"a[target]",label:b.target,title:b.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:c.target,"default":"notSet",
style:"width : 100%;",items:[[c.notSet,"notSet"],[b.targetFrame,"frame"],[b.targetPopup,"popup"],[c.targetNew,"_blank"],[c.targetTop,"_top"],[c.targetSelf,"_self"],[c.targetParent,"_parent"]],onChange:q,setup:function(a){a.target&&this.setValue(a.target.type||"notSet");q.call(this)},commit:function(a){a.target||(a.target={});a.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:b.targetFrameName,"default":"",setup:function(a){a.target&&this.setValue(a.target.name)},commit:function(a){a.target||
(a.target={});a.target.name=this.getValue().replace(/([^\x00-\x7F]|\s)/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:b.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:b.popupResizable,setup:e,commit:f},{type:"checkbox",id:"status",label:b.popupStatusBar,setup:e,commit:f}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:b.popupLocationBar,setup:e,commit:f},{type:"checkbox",id:"toolbar",
label:b.popupToolbar,setup:e,commit:f}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:b.popupMenuBar,setup:e,commit:f},{type:"checkbox",id:"fullscreen",label:b.popupFullScreen,setup:e,commit:f}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:b.popupScrollBars,setup:e,commit:f},{type:"checkbox",id:"dependent",label:b.popupDependent,setup:e,commit:f}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:c.width,id:"width",setup:e,commit:f},
{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:b.popupLeft,id:"left",setup:e,commit:f}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:c.height,id:"height",setup:e,commit:f},{type:"text",labelLayout:"horizontal",label:b.popupTop,widths:["50%","50%"],id:"top",setup:e,commit:f}]}]}]}]},{id:"upload",label:b.upload,title:b.upload,hidden:!0,filebrowser:"uploadButton",elements:[{type:"file",id:"upload",label:c.upload,style:"height:40px",size:29},
{type:"fileButton",id:"uploadButton",label:c.uploadSubmit,filebrowser:"info:url","for":["upload","upload"]}]},{id:"advanced",label:b.advanced,title:b.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",requiredContent:"a[id]",label:b.id,setup:g,commit:h},{type:"select",id:"advLangDir",requiredContent:"a[dir]",label:b.langDir,"default":"",style:"width:110px",items:[[c.notSet,""],[b.langDirLTR,"ltr"],[b.langDirRTL,"rtl"]],setup:g,
commit:h},{type:"text",id:"advAccessKey",requiredContent:"a[accesskey]",width:"80px",label:b.acccessKey,maxLength:1,setup:g,commit:h}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:b.name,id:"advName",requiredContent:"a[name]",setup:g,commit:h},{type:"text",label:b.langCode,id:"advLangCode",requiredContent:"a[lang]",width:"110px","default":"",setup:g,commit:h},{type:"text",label:b.tabIndex,id:"advTabIndex",requiredContent:"a[tabindex]",width:"80px",maxLength:5,setup:g,commit:h}]}]},
{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:b.advisoryContentType,requiredContent:"a[type]","default":"",id:"advContentType",setup:g,commit:h},{type:"html",html:"\x26nbsp;"}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:b.cssClasses,requiredContent:"a(cke-xyz)","default":"",id:"advCSSClasses",setup:g,commit:h},{type:"text",label:b.charset,requiredContent:"a[charset]","default":"",id:"advCharset",setup:g,commit:h}]},{type:"hbox",
widths:["45%","55%"],children:[{type:"text",label:b.rel,requiredContent:"a[rel]","default":"",id:"advRel",setup:g,commit:h},{type:"text",label:b.styles,requiredContent:"a{cke-xyz}","default":"",id:"advStyles",validate:CKEDITOR.dialog.validate.inlineStyle(d.lang.common.invalidInlineStyle),setup:g,commit:h}]},{type:"hbox",widths:["45%","55%"],children:[{type:"checkbox",id:"download",requiredContent:"a[download]",label:b.download,setup:function(a){void 0!==a.download&&this.setValue("checked","checked")},
commit:function(a){this.getValue()&&(a.download=this.getValue())}}]}]}]}],onShow:function(){var a=this.getParentEditor(),b=a.getSelection(),d=this.getContentElement("info","linkDisplayText").getElement().getParent().getParent(),c=n.getSelectedLink(a,!0),l=c[0]||null;l&&l.hasAttribute("href")&&(b.getSelectedElement()||b.isInTable()||b.selectElement(l));b=n.parseLinkAttributes(a,l);1>=c.length&&n.showDisplayTextForElement(l,a)?d.show():d.hide();this._.selectedElements=c;this.setupContent(b)},onOk:function(){var a=
{};this.commitContent(a);if(this._.selectedElements.length){var b=this._.selectedElements,c=n.getLinkAttributes(d,a),m=[],l,k,e,g,f,h;for(h=0;h<b.length;h++){g=b[h];k=g.data("cke-saved-href");l=a.linkText&&p!=a.linkText;e=k==p;k="email"==a.type&&k=="mailto:"+p;g.setAttributes(c.set);g.removeAttributes(c.removed);if(l)f=a.linkText;else if(e||k)f="email"==a.type?a.email.address:c.set["data-cke-saved-href"];f&&g.setText(f);m.push(r(d,g))}d.getSelection().selectRanges(m);delete this._.selectedElements}else{b=
n.getLinkAttributes(d,a);c=d.getSelection().getRanges();m=new CKEDITOR.style({element:"a",attributes:b.set});l=[];m.type=CKEDITOR.STYLE_INLINE;for(g=0;g<c.length;g++){e=c[g];e.collapsed?(f=new CKEDITOR.dom.text(a.linkText||("email"==a.type?a.email.address:b.set["data-cke-saved-href"]),d.document),e.insertNode(f),e.selectNodeContents(f)):p!==a.linkText&&(f=new CKEDITOR.dom.text(a.linkText,d.document),e.shrink(CKEDITOR.SHRINK_TEXT),d.editable().extractHtmlFromRange(e),e.insertNode(f));f=e._find("a");
for(h=0;h<f.length;h++)f[h].remove(!0);m.applyToRange(e,d);l.push(e)}d.getSelection().selectRanges(l)}},onLoad:function(){d.config.linkShowAdvancedTab||this.hidePage("advanced");d.config.linkShowTargetTab||this.hidePage("target")},onFocus:function(){var a=this.getContentElement("info","linkType");a&&"url"==a.getValue()&&(a=this.getContentElement("info","url"),a.select())}}})})();