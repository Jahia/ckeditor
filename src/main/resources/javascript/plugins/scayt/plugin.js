﻿CKEDITOR.plugins.add("scayt",{requires:"menubutton,dialog",lang:"af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh",icons:"scayt",hidpi:!0,tabToOpen:null,dialogName:"scaytDialog",onLoad:function(a){CKEDITOR.plugins.scayt.onLoadTimestamp=(new Date).getTime();"moono-lisa"==(CKEDITOR.skinName||a.config.skin)&&CKEDITOR.document.appendStyleSheet(this.path+
"skins/"+CKEDITOR.skin.name+"/scayt.css");CKEDITOR.document.appendStyleSheet(this.path+"dialogs/dialog.css")},init:function(a){var c=this,d=CKEDITOR.plugins.scayt;this.bindEvents(a);this.parseConfig(a);this.addRule(a);CKEDITOR.dialog.add(this.dialogName,CKEDITOR.getUrl(this.path+"dialogs/options.js"));this.addMenuItems(a);var b=a.lang.scayt,e=CKEDITOR.env;a.ui.add("Scayt",CKEDITOR.UI_MENUBUTTON,{label:b.text_title,title:a.plugins.wsc?a.lang.wsc.title:b.text_title,modes:{wysiwyg:!(e.ie&&(8>e.version||
e.quirks))},toolbar:"spellchecker,20",refresh:function(){var b=a.ui.instances.Scayt.getState();a.scayt&&(b=d.state.scayt[a.name]?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);a.fire("scaytButtonState",b)},onRender:function(){var b=this;a.on("scaytButtonState",function(a){void 0!==typeof a.data&&b.setState(a.data)})},onMenu:function(){var b=a.scayt;a.getMenuItem("scaytToggle").label=a.lang.scayt[b&&d.state.scayt[a.name]?"btn_disable":"btn_enable"];var c={scaytToggle:CKEDITOR.TRISTATE_OFF,scaytOptions:b?
CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytLangs:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytDict:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytAbout:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,WSC:a.plugins.wsc?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};a.config.scayt_uiTabs[0]||delete c.scaytOptions;a.config.scayt_uiTabs[1]||delete c.scaytLangs;a.config.scayt_uiTabs[2]||delete c.scaytDict;b&&!CKEDITOR.plugins.scayt.isNewUdSupported(b)&&(delete c.scaytDict,
a.config.scayt_uiTabs[2]=0,CKEDITOR.plugins.scayt.alarmCompatibilityMessage());return c}});a.contextMenu&&a.addMenuItems&&(a.contextMenu.addListener(function(b,d){var h=a.scayt,k,e;h&&(e=h.getSelectionNode())&&(k=c.menuGenerator(a,e),h.showBanner("."+a.contextMenu._.definition.panel.className.split(" ").join(" .")));return k}),a.contextMenu._.onHide=CKEDITOR.tools.override(a.contextMenu._.onHide,function(b){return function(){var d=a.scayt;d&&d.hideBanner();return b.apply(this)}}))},addMenuItems:function(a){var c=
this,d=CKEDITOR.plugins.scayt;a.addMenuGroup("scaytButton");for(var b=a.config.scayt_contextMenuItemsOrder.split("|"),e=0;e<b.length;e++)b[e]="scayt_"+b[e];if((b=["grayt_description","grayt_suggest","grayt_control"].concat(b))&&b.length)for(e=0;e<b.length;e++)a.addMenuGroup(b[e],e-10);a.addCommand("scaytToggle",{exec:function(a){var b=a.scayt;d.state.scayt[a.name]=!d.state.scayt[a.name];!0===d.state.scayt[a.name]?b||d.createScayt(a):b&&d.destroy(a)}});a.addCommand("scaytAbout",{exec:function(a){a.scayt.tabToOpen=
"about";a.lockSelection();a.openDialog(c.dialogName)}});a.addCommand("scaytOptions",{exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();a.openDialog(c.dialogName)}});a.addCommand("scaytLangs",{exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(c.dialogName)}});a.addCommand("scaytDict",{exec:function(a){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(c.dialogName)}});b={scaytToggle:{label:a.lang.scayt.btn_enable,group:"scaytButton",command:"scaytToggle"},
scaytAbout:{label:a.lang.scayt.btn_about,group:"scaytButton",command:"scaytAbout"},scaytOptions:{label:a.lang.scayt.btn_options,group:"scaytButton",command:"scaytOptions"},scaytLangs:{label:a.lang.scayt.btn_langs,group:"scaytButton",command:"scaytLangs"},scaytDict:{label:a.lang.scayt.btn_dictionaries,group:"scaytButton",command:"scaytDict"}};a.plugins.wsc&&(b.WSC={label:a.lang.wsc.toolbar,group:"scaytButton",onClick:function(){var b=CKEDITOR.plugins.scayt,d=a.scayt,c=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?
a.container.getText():a.document.getBody().getText();(c=c.replace(/\s/g,""))?(d&&b.state.scayt[a.name]&&d.setMarkupPaused&&d.setMarkupPaused(!0),a.lockSelection(),a.execCommand("checkspell")):alert("Nothing to check!")}});a.addMenuItems(b)},bindEvents:function(a){var c=CKEDITOR.plugins.scayt,d=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE,b=function(){c.destroy(a)},e=function(){!c.state.scayt[a.name]||a.readOnly||a.scayt||c.createScayt(a)},f=function(){var b=a.editable();b.attachListener(b,"focus",
function(b){CKEDITOR.plugins.scayt&&!a.scayt&&setTimeout(e,0);b=CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[a.name]&&a.scayt;var c,h;if((d||b)&&a._.savedSelection){b=a._.savedSelection.getSelectedElement();b=!b&&a._.savedSelection.getRanges();for(var f=0;f<b.length;f++)h=b[f],"string"===typeof h.startContainer.$.nodeValue&&(c=h.startContainer.getText().length,(c<h.startOffset||c<h.endOffset)&&a.unlockSelection(!1))}},this,null,-10)},g=function(){d?a.config.scayt_inlineModeImmediateMarkup?
e():(a.on("blur",function(){setTimeout(b,0)}),a.on("focus",e),a.focusManager.hasFocus&&e()):e();f();var c=a.editable();c.attachListener(c,"mousedown",function(b){b=b.data.getTarget();var d=a.widgets&&a.widgets.getByElement(b);d&&(d.wrapper=b.getAscendant(function(a){return a.hasAttribute("data-cke-widget-wrapper")},!0))},this,null,-10)};a.on("contentDom",g);a.on("beforeCommandExec",function(b){var d=a.scayt,e=!1,f=!1,g=!0;b.data.name in c.options.disablingCommandExec&&"wysiwyg"==a.mode?d&&(c.destroy(a),
a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED)):"bold"!==b.data.name&&"italic"!==b.data.name&&"underline"!==b.data.name&&"strike"!==b.data.name&&"subscript"!==b.data.name&&"superscript"!==b.data.name&&"enter"!==b.data.name&&"cut"!==b.data.name&&"language"!==b.data.name||!d||("cut"===b.data.name&&(g=!1,f=!0),"language"===b.data.name&&(f=e=!0),a.fire("reloadMarkupScayt",{removeOptions:{removeInside:g,forceBookmark:f,language:e},timeout:0}))});a.on("beforeSetMode",function(b){if("source"==b.data){if(b=
a.scayt)c.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED);a.document&&a.document.getBody().removeAttribute("_jquid")}});a.on("afterCommandExec",function(b){"wysiwyg"!=a.mode||"undo"!=b.data.name&&"redo"!=b.data.name||setTimeout(function(){c.reloadMarkup(a.scayt)},250)});a.on("readOnly",function(b){var d;b&&(d=a.scayt,!0===b.editor.readOnly?d&&d.fire("removeMarkupInDocument",{}):d?c.reloadMarkup(d):"wysiwyg"==b.editor.mode&&!0===c.state.scayt[b.editor.name]&&(c.createScayt(a),b.editor.fire("scaytButtonState",
CKEDITOR.TRISTATE_ON)))});a.on("beforeDestroy",b);a.on("setData",function(){b();(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE||a.plugins.divarea)&&g()},this,null,50);a.on("reloadMarkupScayt",function(b){var d=b.data&&b.data.removeOptions,e=b.data&&b.data.timeout,f=b.data&&b.data.language,g=a.scayt;g&&setTimeout(function(){f&&(d.selectionNode=a.plugins.language.getCurrentLangElement(a),d.selectionNode=d.selectionNode&&d.selectionNode.$||null);g.removeMarkupInSelectionNode(d);c.reloadMarkup(g)},e||0)});
a.on("insertElement",function(){a.fire("reloadMarkupScayt",{removeOptions:{forceBookmark:!0}})},this,null,50);a.on("insertHtml",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("insertText",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("scaytDialogShown",function(b){b.data.selectPage(a.scayt.tabToOpen)})},parseConfig:function(a){var c=CKEDITOR.plugins.scayt;c.replaceOldOptionsNames(a.config);
"boolean"!==typeof a.config.scayt_autoStartup&&(a.config.scayt_autoStartup=!1);c.state.scayt[a.name]=a.config.scayt_autoStartup;"boolean"!==typeof a.config.grayt_autoStartup&&(a.config.grayt_autoStartup=!1);"boolean"!==typeof a.config.scayt_inlineModeImmediateMarkup&&(a.config.scayt_inlineModeImmediateMarkup=!1);c.state.grayt[a.name]=a.config.grayt_autoStartup;a.config.scayt_contextCommands||(a.config.scayt_contextCommands="ignore|ignoreall|add");a.config.scayt_contextMenuItemsOrder||(a.config.scayt_contextMenuItemsOrder=
"suggest|moresuggest|control");a.config.scayt_sLang||(a.config.scayt_sLang="en_US");if(void 0===a.config.scayt_maxSuggestions||"number"!=typeof a.config.scayt_maxSuggestions||0>a.config.scayt_maxSuggestions)a.config.scayt_maxSuggestions=5;if(void 0===a.config.scayt_minWordLength||"number"!=typeof a.config.scayt_minWordLength||1>a.config.scayt_minWordLength)a.config.scayt_minWordLength=4;if(void 0===a.config.scayt_customDictionaryIds||"string"!==typeof a.config.scayt_customDictionaryIds)a.config.scayt_customDictionaryIds=
"";if(void 0===a.config.scayt_userDictionaryName||"string"!==typeof a.config.scayt_userDictionaryName)a.config.scayt_userDictionaryName=null;if("string"===typeof a.config.scayt_uiTabs&&3===a.config.scayt_uiTabs.split(",").length){var d=[],b=[];a.config.scayt_uiTabs=a.config.scayt_uiTabs.split(",");CKEDITOR.tools.search(a.config.scayt_uiTabs,function(a){1===Number(a)||0===Number(a)?(b.push(!0),d.push(Number(a))):b.push(!1)});null===CKEDITOR.tools.search(b,!1)?a.config.scayt_uiTabs=d:a.config.scayt_uiTabs=
[1,1,1]}else a.config.scayt_uiTabs=[1,1,1];"string"!=typeof a.config.scayt_serviceProtocol&&(a.config.scayt_serviceProtocol=null);"string"!=typeof a.config.scayt_serviceHost&&(a.config.scayt_serviceHost=null);"string"!=typeof a.config.scayt_servicePort&&(a.config.scayt_servicePort=null);"string"!=typeof a.config.scayt_servicePath&&(a.config.scayt_servicePath=null);a.config.scayt_moreSuggestions||(a.config.scayt_moreSuggestions="on");"string"!==typeof a.config.scayt_customerId&&(a.config.scayt_customerId=
"1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");"string"!==typeof a.config.scayt_customPunctuation&&(a.config.scayt_customPunctuation="-");"string"!==typeof a.config.scayt_srcUrl&&(c=document.location.protocol,c=-1!=c.search(/https?:/)?c:"http:",a.config.scayt_srcUrl=c+"//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");"boolean"!==typeof CKEDITOR.config.scayt_handleCheckDirty&&(CKEDITOR.config.scayt_handleCheckDirty=!0);"boolean"!==typeof CKEDITOR.config.scayt_handleUndoRedo&&
(CKEDITOR.config.scayt_handleUndoRedo=!0);CKEDITOR.config.scayt_handleUndoRedo=CKEDITOR.plugins.undo?CKEDITOR.config.scayt_handleUndoRedo:!1;"boolean"!==typeof a.config.scayt_multiLanguageMode&&(a.config.scayt_multiLanguageMode=!1);"object"!==typeof a.config.scayt_multiLanguageStyles&&(a.config.scayt_multiLanguageStyles={});a.config.scayt_ignoreAllCapsWords&&"boolean"!==typeof a.config.scayt_ignoreAllCapsWords&&(a.config.scayt_ignoreAllCapsWords=!1);a.config.scayt_ignoreDomainNames&&"boolean"!==typeof a.config.scayt_ignoreDomainNames&&
(a.config.scayt_ignoreDomainNames=!1);a.config.scayt_ignoreWordsWithMixedCases&&"boolean"!==typeof a.config.scayt_ignoreWordsWithMixedCases&&(a.config.scayt_ignoreWordsWithMixedCases=!1);a.config.scayt_ignoreWordsWithNumbers&&"boolean"!==typeof a.config.scayt_ignoreWordsWithNumbers&&(a.config.scayt_ignoreWordsWithNumbers=!1);if(a.config.scayt_disableOptionsStorage){var c=CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage)?a.config.scayt_disableOptionsStorage:"string"===typeof a.config.scayt_disableOptionsStorage?
[a.config.scayt_disableOptionsStorage]:void 0,e="all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),f=["lang","ignore-all-caps-words","ignore-domain-names","ignore-words-with-mixed-cases","ignore-words-with-numbers"],g=CKEDITOR.tools.search,h=CKEDITOR.tools.indexOf;a.config.scayt_disableOptionsStorage=function(a){for(var b=[],d=0;d<a.length;d++){var c=a[d],m=!!g(a,"options");if(!g(e,c)||m&&g(f,function(a){if("lang"===a)return!1}))return;
g(f,c)&&f.splice(h(f,c),1);if("all"===c||m&&g(a,"lang"))return[];"options"===c&&(f=["lang"])}return b=b.concat(f)}(c)}},addRule:function(a){var c=CKEDITOR.plugins.scayt,d=a.dataProcessor,b=d&&d.htmlFilter,e=a._.elementsPath&&a._.elementsPath.filters,d=d&&d.dataFilter,f=a.addRemoveFormatFilter,g=function(b){if(a.scayt&&(b.hasAttribute(c.options.data_attribute_name)||b.hasAttribute(c.options.problem_grammar_data_attribute)))return!1},h=function(b){var d=!0;a.scayt&&(b.hasAttribute(c.options.data_attribute_name)||
b.hasAttribute(c.options.problem_grammar_data_attribute))&&(d=!1);return d};e&&e.push(g);d&&d.addRules({elements:{span:function(a){var b=a.hasClass(c.options.misspelled_word_class)&&a.attributes[c.options.data_attribute_name],d=a.hasClass(c.options.problem_grammar_class)&&a.attributes[c.options.problem_grammar_data_attribute];c&&(b||d)&&delete a.name;return a}}});b&&b.addRules({elements:{span:function(a){var b=a.hasClass(c.options.misspelled_word_class)&&a.attributes[c.options.data_attribute_name],
d=a.hasClass(c.options.problem_grammar_class)&&a.attributes[c.options.problem_grammar_data_attribute];c&&(b||d)&&delete a.name;return a}}});f&&f.call(a,h)},scaytMenuDefinition:function(a){var c=this;a=a.scayt;return{scayt:{scayt_ignore:{label:a.getLocal("btn_ignore"),group:"scayt_control",order:1,exec:function(a){a.scayt.ignoreWord()}},scayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"scayt_control",order:2,exec:function(a){a.scayt.ignoreAllWords()}},scayt_add:{label:a.getLocal("btn_addWord"),
group:"scayt_control",order:3,exec:function(a){var b=a.scayt;setTimeout(function(){b.addWordToUserDictionary()},10)}},scayt_option:{label:a.getLocal("btn_options"),group:"scayt_control",order:4,exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();a.openDialog(c.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[0]?!0:!1}},scayt_language:{label:a.getLocal("btn_langs"),group:"scayt_control",order:5,exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(c.dialogName)},
verification:function(a){return 1==a.config.scayt_uiTabs[1]?!0:!1}},scayt_dictionary:{label:a.getLocal("btn_dictionaries"),group:"scayt_control",order:6,exec:function(a){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(c.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[2]?!0:!1}},scayt_about:{label:a.getLocal("btn_about"),group:"scayt_control",order:7,exec:function(a){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(c.dialogName)}}},grayt:{grayt_problemdescription:{label:"Grammar problem description",
group:"grayt_description",order:1,state:CKEDITOR.TRISTATE_DISABLED,exec:function(a){}},grayt_ignore:{label:a.getLocal("btn_ignore"),group:"grayt_control",order:2,exec:function(a){a.scayt.ignorePhrase()}}}}},buildSuggestionMenuItems:function(a,c,d){var b={},e={},f=d?"word":"phrase",g=d?"startGrammarCheck":"startSpellCheck",h=a.scayt;if(0<c.length&&"no_any_suggestions"!==c[0])if(d)for(d=0;d<c.length;d++){var k="scayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[d].replace(" ","_");a.addCommand(k,this.createCommand(CKEDITOR.plugins.scayt.suggestions[d],
f,g));d<a.config.scayt_maxSuggestions?(a.addMenuItem(k,{label:c[d],command:k,group:"scayt_suggest",order:d+1}),b[k]=CKEDITOR.TRISTATE_OFF):(a.addMenuItem(k,{label:c[d],command:k,group:"scayt_moresuggest",order:d+1}),e[k]=CKEDITOR.TRISTATE_OFF,"on"===a.config.scayt_moreSuggestions&&(a.addMenuItem("scayt_moresuggest",{label:h.getLocal("btn_moreSuggestions"),group:"scayt_moresuggest",order:10,getItems:function(){return e}}),b.scayt_moresuggest=CKEDITOR.TRISTATE_OFF))}else for(d=0;d<c.length;d++)k="grayt_suggest_"+
CKEDITOR.plugins.scayt.suggestions[d].replace(" ","_"),a.addCommand(k,this.createCommand(CKEDITOR.plugins.scayt.suggestions[d],f,g)),a.addMenuItem(k,{label:c[d],command:k,group:"grayt_suggest",order:d+1}),b[k]=CKEDITOR.TRISTATE_OFF;else b.no_scayt_suggest=CKEDITOR.TRISTATE_DISABLED,a.addCommand("no_scayt_suggest",{exec:function(){}}),a.addMenuItem("no_scayt_suggest",{label:h.getLocal("btn_noSuggestions")||"no_scayt_suggest",command:"no_scayt_suggest",group:"scayt_suggest",order:0});return b},menuGenerator:function(a,
c){var d=a.scayt,b=this.scaytMenuDefinition(a),e={},f=a.config.scayt_contextCommands.split("|"),g=c.getAttribute(d.getLangAttribute())||d.getLang(),h,k;h=d.isScaytNode(c);k=d.isGraytNode(c);h?(b=b.scayt,e=c.getAttribute(d.getScaytNodeAttributeName()),d.fire("getSuggestionsList",{lang:g,word:e}),e=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,h)):k&&(b=b.grayt,e=c.getAttribute(d.getGraytNodeAttributeName()),k=d.getProblemDescriptionText(e,g),b.grayt_problemdescription&&k&&(b.grayt_problemdescription.label=
k),d.fire("getGrammarSuggestionsList",{lang:g,phrase:e}),e=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,h));if(h&&"off"==a.config.scayt_contextCommands)return e;for(var l in b)h&&-1==CKEDITOR.tools.indexOf(f,l.replace("scayt_",""))&&"all"!=a.config.scayt_contextCommands||(e[l]="undefined"!=typeof b[l].state?b[l].state:CKEDITOR.TRISTATE_OFF,"function"!==typeof b[l].verification||b[l].verification(a)||delete e[l],a.addCommand(l,{exec:b[l].exec}),a.addMenuItem(l,{label:a.lang.scayt[b[l].label]||
b[l].label,command:l,group:b[l].group,order:b[l].order}));return e},createCommand:function(a,c,d){return{exec:function(b){b=b.scayt;var e={};e[c]=a;b.replaceSelectionNode(e);"startGrammarCheck"===d&&b.removeMarkupInSelectionNode({grammarOnly:!0});b.fire(d)}}}});
CKEDITOR.plugins.scayt={charsToObserve:[{charName:"cke-fillingChar",charCode:function(){var a=CKEDITOR.version.match(/^\d(\.\d*)*/),a=a&&a[0],c;if(a){c="4.5.7";var d,a=a.replace(/\./g,"");c=c.replace(/\./g,"");d=a.length-c.length;d=0<=d?d:0;c=parseInt(a)>=parseInt(c)*Math.pow(10,d)}return c?Array(7).join(String.fromCharCode(8203)):String.fromCharCode(8203)}()}],onLoadTimestamp:"",state:{scayt:{},grayt:{}},warningCounter:0,suggestions:[],options:{disablingCommandExec:{source:!0,newpage:!0,templates:!0},
data_attribute_name:"data-scayt-word",misspelled_word_class:"scayt-misspell-word",problem_grammar_data_attribute:"data-grayt-phrase",problem_grammar_class:"gramm-problem"},backCompatibilityMap:{scayt_service_protocol:"scayt_serviceProtocol",scayt_service_host:"scayt_serviceHost",scayt_service_port:"scayt_servicePort",scayt_service_path:"scayt_servicePath",scayt_customerid:"scayt_customerId"},alarmCompatibilityMessage:function(){5>this.warningCounter&&(console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
this.warningCounter+=1)},isNewUdSupported:function(a){return a.getUserDictionary?!0:!1},reloadMarkup:function(a){var c;a&&(c=a.getScaytLangList(),a.reloadMarkup?a.reloadMarkup():(this.alarmCompatibilityMessage(),c&&c.ltr&&c.rtl&&a.fire("startSpellCheck, startGrammarCheck")))},replaceOldOptionsNames:function(a){for(var c in a)c in this.backCompatibilityMap&&(a[this.backCompatibilityMap[c]]=a[c],delete a[c])},createScayt:function(a){var c=this,d=CKEDITOR.plugins.scayt;this.loadScaytLibrary(a,function(a){function e(a){return new SCAYT.CKSCAYT(a,
function(){},function(){})}var f=a.window&&a.window.getFrame()||a.editable();if(f){f={lang:a.config.scayt_sLang,container:f.$,customDictionary:a.config.scayt_customDictionaryIds,userDictionaryName:a.config.scayt_userDictionaryName,localization:a.langCode,customer_id:a.config.scayt_customerId,customPunctuation:a.config.scayt_customPunctuation,debug:a.config.scayt_debug,data_attribute_name:c.options.data_attribute_name,misspelled_word_class:c.options.misspelled_word_class,problem_grammar_data_attribute:c.options.problem_grammar_data_attribute,
problem_grammar_class:c.options.problem_grammar_class,"options-to-restore":a.config.scayt_disableOptionsStorage,focused:a.editable().hasFocus,ignoreElementsRegex:a.config.scayt_elementsToIgnore,ignoreGraytElementsRegex:a.config.grayt_elementsToIgnore,minWordLength:a.config.scayt_minWordLength,multiLanguageMode:a.config.scayt_multiLanguageMode,multiLanguageStyles:a.config.scayt_multiLanguageStyles,graytAutoStartup:d.state.grayt[a.name],charsToObserve:d.charsToObserve};a.config.scayt_serviceProtocol&&
(f.service_protocol=a.config.scayt_serviceProtocol);a.config.scayt_serviceHost&&(f.service_host=a.config.scayt_serviceHost);a.config.scayt_servicePort&&(f.service_port=a.config.scayt_servicePort);a.config.scayt_servicePath&&(f.service_path=a.config.scayt_servicePath);"boolean"===typeof a.config.scayt_ignoreAllCapsWords&&(f["ignore-all-caps-words"]=a.config.scayt_ignoreAllCapsWords);"boolean"===typeof a.config.scayt_ignoreDomainNames&&(f["ignore-domain-names"]=a.config.scayt_ignoreDomainNames);"boolean"===
typeof a.config.scayt_ignoreWordsWithMixedCases&&(f["ignore-words-with-mixed-cases"]=a.config.scayt_ignoreWordsWithMixedCases);"boolean"===typeof a.config.scayt_ignoreWordsWithNumbers&&(f["ignore-words-with-numbers"]=a.config.scayt_ignoreWordsWithNumbers);var g;try{g=e(f)}catch(h){c.alarmCompatibilityMessage(),delete f.charsToObserve,g=e(f)}g.subscribe("suggestionListSend",function(a){for(var b={},d=[],c=0;c<a.suggestionList.length;c++)b["word_"+a.suggestionList[c]]||(b["word_"+a.suggestionList[c]]=
a.suggestionList[c],d.push(a.suggestionList[c]));CKEDITOR.plugins.scayt.suggestions=d});g.subscribe("selectionIsChanged",function(c){a.getSelection().isLocked&&a.lockSelection()});g.subscribe("graytStateChanged",function(c){d.state.grayt[a.name]=c.state});g.addMarkupHandler&&g.addMarkupHandler(function(c){var d=a.editable(),e=d.getCustomData(c.charName);e&&(e.$=c.node,d.setCustomData(c.charName,e))});a.scayt=g;a.fire("scaytButtonState",a.readOnly?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_ON)}else d.state.scayt[a.name]=
!1})},destroy:function(a){a.scayt&&a.scayt.destroy();delete a.scayt;a.fire("scaytButtonState",CKEDITOR.TRISTATE_OFF)},loadScaytLibrary:function(a,c){var d,b=function(){CKEDITOR.fireOnce("scaytReady");a.scayt||"function"===typeof c&&c(a)};"undefined"===typeof window.SCAYT||"function"!==typeof window.SCAYT.CKSCAYT?(d=a.config.scayt_srcUrl+"?"+this.onLoadTimestamp,CKEDITOR.scriptLoader.load(d,function(a){a&&b()})):window.SCAYT&&"function"===typeof window.SCAYT.CKSCAYT&&b()}};
CKEDITOR.on("dialogDefinition",function(a){var c=a.data.name;a=a.data.definition.dialog;if("scaytDialog"===c)a.on("cancel",function(a){return!1},this,null,-1);if("checkspell"===c)a.on("cancel",function(a){a=a.sender&&a.sender.getParentEditor();var b=CKEDITOR.plugins.scayt,c=a.scayt;c&&b.state.scayt[a.name]&&c.setMarkupPaused&&c.setMarkupPaused(!1);a.unlockSelection()},this,null,-2);if("link"===c)a.on("ok",function(a){var b=a.sender&&a.sender.getParentEditor();b&&setTimeout(function(){b.fire("reloadMarkupScayt",
{removeOptions:{removeInside:!0,forceBookmark:!0},timeout:0})},0)})});
CKEDITOR.on("scaytReady",function(){if(!0===CKEDITOR.config.scayt_handleCheckDirty){var a=CKEDITOR.editor.prototype;a.checkDirty=CKEDITOR.tools.override(a.checkDirty,function(a){return function(){var b=null,c=this.scayt;if(CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&this.scayt){if(b="ready"==this.status)var f=c.removeMarkupFromString(this.getSnapshot()),c=c.removeMarkupFromString(this._.previousValue),b=b&&c!==f}else b=a.call(this);return b}});a.resetDirty=CKEDITOR.tools.override(a.resetDirty,
function(a){return function(){var b=this.scayt;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&this.scayt?this._.previousValue=b.removeMarkupFromString(this.getSnapshot()):a.call(this)}})}if(!0===CKEDITOR.config.scayt_handleUndoRedo){var a=CKEDITOR.plugins.undo.Image.prototype,c="function"==typeof a.equalsContent?"equalsContent":"equals";a[c]=CKEDITOR.tools.override(a[c],function(a){return function(b){var c=b.editor.scayt,f=this.contents,g=b.contents,h=null;CKEDITOR.plugins.scayt&&
CKEDITOR.plugins.scayt.state.scayt[b.editor.name]&&b.editor.scayt&&(this.contents=c.removeMarkupFromString(f)||"",b.contents=c.removeMarkupFromString(g)||"");h=a.apply(this,arguments);this.contents=f;b.contents=g;return h}})}});