/**
 * @fileOverview charts plugin for CKEditor using Chart.js.
 */

'use strict';

// TODO make chart options configurable
(function() {
	CKEDITOR.plugins.add('chart', {
		// Add translation
		lang: 'en,fr,de',
		// Required plugins
		requires: 'widget,dialog,colordialog',
		// Name of the file in the "icons" folder
		icons: 'chartBar,chartPie',

		// Load library that renders charts inside CKEditor, if Chart object is not already available.
		afterInit: function(editor) {
			var plugin = this;

			if (typeof Chart  === 'undefined') {
				// Chart library is loaded asynchronously, so we can draw anything only once it's loaded.
				CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js'), function() {
					plugin.drawCharts();
				});
			}
		},

		// Function called on initialization of every editor instance created in the page.
		init: function(editor) {
			var plugin = this;

			// The number of rows in Edit Chart dialog window.
			var inputRows = editor.config.chart_maxitems || 12;

			// Inject required CSS stylesheet to classic editors because the <iframe> needs it.
			// Inline editors will ignore this, the developer is supposed to load chart.css directly on a page.
			// "this.path" is a path to the current plugin.
			editor.addContentsCss(CKEDITOR.getUrl(plugin.path + 'chart.css'));

			// A little bit of magic to support "Preview" feature in CKEditor (in a popup).
			// In order to transform downcasted widgets into nice charts we need to:
			// 1. Load the Chart.js library
			// 2. Load a helper script that will "upcast" widgets and initiate charts.
			editor.on('contentPreview', function(evt) {
				evt.data.dataValue = evt.data.dataValue.replace(/<\/head>/,
					'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js') + '"><\/script>' +
					'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/widget2chart.js') + '"><\/script><\/head>');
			});

			// The dialog window to insert / edit a chart type pie.
			CKEDITOR.dialog.add('chartPie', function(editor) {
				var dialog = {
					title: editor.lang.chart.titleDialogBox,
					minWidth: 350,
					minHeight: 100,
					// Executed every time a dialog is shown.
					onShow: function() {
						var widget = editor.widgets.focused;

						if (!widget)
							return;

						// Merge data
						for (var j = 0 ; j < inputRows ; j++) {
							if (widget.data.values[j]) {
								// toString() is used here to set correctly zero values.
								this.setValueOf('data', 'label' + j, widget.data.values[j].label);
								this.setValueOf('data', 'value' + j, widget.data.values[j].value.toString());
								this.setValueOf('data', 'color' + j, widget.data.values[j].color);
								this.setValueOf('data', 'highlight' + j, widget.data.values[j].highlight);
							}
						}

						this.setValueOf('options', 'canvasHeight', widget.data.canvasHeight);
						this.setValueOf('options', 'canvasWidth', widget.data.canvasWidth);
					},
					// Executed every time a dialog is closed (OK is pressed).
					onOk : function(evt) {
						var widget = this.widget,
							values = [];

						for (var j = 0 ; j < inputRows ; j++) {
							if (this.getValueOf('data', 'label' + j) != '' && this.getValueOf('data', 'value' + j) != '') {
								values.push({
									label: this.getValueOf('data', 'label' + j),
									value: parseFloat(this.getValueOf('data', 'value' + j)),
									color: this.getValueOf('data', 'color' + j),
									highlight: this.getValueOf('data', 'highlight' + j)
								});
							}
						}
						widget.setData('values', values);
						widget.setData('chart', this.getValueOf('data', 'chart'));
						widget.setData('canvasHeight', this.getValueOf('options', 'canvasHeight'));
						widget.setData('canvasWidth', this.getValueOf('options', 'canvasWidth'));
					},
					// Define elements in a dialog window.
					contents: [
						{
							id: 'data',
							label: editor.lang.chart.labelData,
							title: editor.lang.chart.labelData,
							elements: [
								{
									type: 'radio',
									id: 'chart',
									label: editor.lang.chart.labelChartType,
									labelLayout: 'horizontal',
									labelStyle: 'display:block;padding: 0 6px;',
									items: [[editor.lang.chart.labelChartPie, 'pie'],
										[editor.lang.chart.labelChartDoughnut, 'doughnut'],
										[editor.lang.chart.labelChartPolar, 'polar']],
									'default': 'pie',
									style: 'margin-bottom:10px',
									setup: function(widget) {
										this.setValue(widget.data.chart);
									}
								},
								{
									type: 'hbox',
									children: [
										{
											type: 'vbox',
											children: [
												{
													type: 'html',
													html: '<strong>' + editor.lang.chart.labl + '</strong>'
												}
											]
										},
										{
											type: 'vbox',
											children: [
												{
													type: 'html',
													html: '<strong>' + editor.lang.chart.labelValue + '</strong>'
												}
											]
										},
										{
											type: 'vbox',
											children: [
												{
													type: 'html',
													html: '<strong>' + editor.lang.chart.labelColor + '</strong>'
												}
											]
										},
										{
											type: 'vbox',
											children: [
												{
													type: 'html',
													html: '<strong>' + editor.lang.chart.labelHighliht + '</strong>'
												}
											]
										}
									]
								}
							]
						},
						{
							id: 'options',
							label: editor.lang.chart.tittleChartOptions,
							title: editor.lang.chart.tittleChartOptions,
							elements: [
								{
									type: 'html',
									html: '<div>' + editor.lang.chart.textInfo4 + '</div>'
								},
								{
									type: 'hbox',
									children: [
										{
											id: 'canvasHeight',
											type: 'text',
											'default': 200,
											label: editor.lang.chart.labelHeight,
											validate: function() {
												var value = this.getValue(),
													pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

												if (!pass) {
													alert(editor.lang.chart.alertValidNumber);
													this.select();
												}

												return pass;
											}
										},
										{
											id: 'canvasWidth',
											type: 'text',
											'default': 200,
											label: editor.lang.chart.labelWidth,
											validate: function() {
												var value = this.getValue(),
													pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

												if (!pass) {
													alert(editor.lang.chart.alertValidNumber);
													this.select();
												}

												return pass;
											}
										}
									]
								}
							]
						}
					]
				};

				// Generate row in dialog box
				for (var i = 0 ; i < inputRows ; i++) {
					dialog.contents[0].elements[1].children[0].children.push({
						id: 'label' + i,
						type: 'text',
						width: '150px'
					});

					dialog.contents[0].elements[1].children[1].children.push({
						id: 'value' + i,
						type: 'text',
						width: '50px',
						validate: function() {
							var value = this.getValue(),
								pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));
							if (!pass) {
								alert(editor.lang.chart.alertValidNumber);
								this.select();
							}

							return pass;
						}
					});

					dialog.contents[0].elements[1].children[2].children.push({
						type: 'hbox',
						children: [
							{
								id: 'color' + i,
								type: 'text',
								width: '75px'
							},
							{
								type: 'button',
								id: 'colorChoose' + i,
								'class': 'colorChooser',
								label: editor.lang.chart.buttonPicker,
								onLoad: function() {
									this.getElement().setStyle('margin-top', '0');
									this.getElement().setStyle('width', '100px');
								},
								onClick: function(c) {
									var inputID = 'color' + c.sender.id.split("colorChoose")[1];
									editor.getColorFromDialog(function(a) {
										a && this.getDialog().getContentElement('data', inputID).setValue(a);
										this.focus()
									}, this)
								}
							}
						]
					});

					dialog.contents[0].elements[1].children[3].children.push({
						type: 'hbox',
						children: [
							{
								id: 'highlight' + i,
								type: 'text',
								width: '75px'
							},
							{
								type: 'button',
								id: 'highlightColorChoose' + i,
								'class': 'colorChooser',
								label: editor.lang.chart.buttonPicker,
								onLoad: function() {
									this.getElement().setStyle('margin-top', '0');
									this.getElement().setStyle('width', '100px');
								},
								onClick: function(c) {
									var inputID = 'highlight' + c.sender.id.split("highlightColorChoose")[1];
									editor.getColorFromDialog(function(a) {
										a && this.getDialog().getContentElement('data', inputID).setValue(a);
										this.focus()
									}, this)
								}
							}
						]
					});
				}
				return dialog;
			});

			// The dialog window to insert / edit a chart type bar.
			CKEDITOR.dialog.add( 'chartBar', function(editor) {
				var dialog = {
					title: editor.lang.chart.titleDialogBox,
					minWidth: 400,
					minHeight: 100,

					// Executed every time a dialog is shown.
					onShow: function() {
						var widget = editor.widgets.focused;
						if (!widget)
							return;

						var datasetsSize = widget.data.values.datasets.length;

						for (var j = 0 ; j < inputRows ; j++) {
							if (widget.data.values.labels[j] != undefined) {
								this.setValueOf('data', 'label' + j, widget.data.values.labels[j]);
								this.setValueOf('data', 'dataset1_value' + j, widget.data.values.datasets[0].data[j].toString());

								if (datasetsSize > 1) {
									this.setValueOf('data', 'dataset2_value' + j, widget.data.values.datasets[1].data[j].toString());
								}
							}
						}

						setColorsValue(this, widget, 0);
						this.setValueOf('data', 'dataset1Label', widget.data.values.datasets[0].label);
						if (datasetsSize > 1) {
							setColorsValue(this, widget, 1);
							this.setValueOf('data', 'dataset2Label', widget.data.values.datasets[1].label);
						}

						this.setValueOf('options', 'canvasHeight', widget.data.canvasHeight);
						this.setValueOf('options', 'canvasWidth', widget.data.canvasWidth);
					},

					// Executed every time a dialog is closed (OK is pressed).
					onOk : function(evt) {
						var widget = this.widget,
							labels = [],
							dataset1 = [],
							dataset2 = [],
							chartModel = this.getValueOf('data', 'chart');

						for (var j = 0 ; j < inputRows ; j++) {
							if (this.getValueOf('data', 'label' + j)) {
								labels.push(this.getValueOf('data', 'label' + j));

								var value1 = (this.getValueOf('data', 'dataset1_value' + j) != '') ?  parseFloat(this.getValueOf('data', 'dataset1_value' + j)): 0;
								dataset1.push(value1);

								var value2 = (this.getValueOf('data', 'dataset2_value' + j) != '') ?  parseFloat(this.getValueOf('data', 'dataset2_value' + j)) : 0;
								dataset2.push(value2);
							}
						}

						// Check is they have value other than 0 in the second dataset
						var total = 0;
						for (var n in dataset2) {
							total += dataset2[n];
						}
						if (total == 0)
							dataset2 = [];

						var values = {labels: labels, datasets: []};

						addDatasetToValues(this, chartModel, values, 0, dataset1);
						if (dataset2.length > 0) {
							addDatasetToValues(this, chartModel, values, 1, dataset2);
						}

						widget.setData('values', values);
						widget.setData('chart', chartModel);
						widget.setData('canvasHeight', this.getValueOf('options', 'canvasHeight'));
						widget.setData('canvasWidth', this.getValueOf('options', 'canvasWidth'));
					},

					// Define elements in a dialog window.
					contents: [
						{
							id: 'data',
							label: editor.lang.chart.labelData,
							title: editor.lang.chart.labelData,
							elements: [
								{
									type: 'radio',
									id: 'chart',
									label: editor.lang.chart.labelChartType,
									labelLayout: 'horizontal',
									labelStyle: 'display:block;padding: 0 6px;',
									items: [[editor.lang.chart.labelChartBar, 'bar'],
										[editor.lang.chart.labelChartLine, 'line'],
										[editor.lang.chart.labelChartRadar, 'radar']],
									'default': 'bar',
									style: 'margin-bottom:10px',
									setup: function(widget) {
										this.setValue(widget.data.chart);
									}
								},
								{
									type: 'html',
									html: '<div>' + editor.lang.chart.textInfo1 + '</div>'
								},
								{
									type: 'fieldset',
									label: 'Labels',
									children: [
										{
											type: 'html',
											html: editor.lang.chart.textInfo5
										},
										{
											type: 'hbox',
											children: [
												{
													id: 'dataset1Label',
													type: 'text',
													label: editor.lang.chart.titleDataSet + ' #1'
												},
												{
													id: 'dataset2Label',
													type: 'text',
													label: editor.lang.chart.titleDataSet + ' #2'
												}
											]
										}
									]
								},
								{
									type: 'hbox',
									children: [
										{
											type: 'html',
											html: '<strong>' + editor.lang.chart.titleLabel + '</strong>'
										},
										{
											type: 'html',
											html: '<strong>' + editor.lang.chart.titleDataSet + ' #1</strong>'
										},
										{
											type: 'html',
											html: '<strong>' + editor.lang.chart.titleDataSet + ' #2</strong>'
										}
									]
								}
							]
						},
						{
							id: 'colors0',
							label: editor.lang.chart.titleColorDataSet + ' #1',
							title: editor.lang.chart.titleColorDataSet + ' #1',
							elements: [
								{
									type: 'html',
									html: '<div>' + editor.lang.chart.textInfo2 + '</div>'
								}
							]
						},
						{
							id: 'colors1',
							label: editor.lang.chart.titleColorDataSet + ' #2',
							title: editor.lang.chart.titleColorDataSet + ' #2',
							elements: [
								{
									type: 'html',
									html: '<div>' + editor.lang.chart.textInfo3 + '</div>'
								}
							]
						},
						{
							id: 'options',
							label: editor.lang.chart.tittleChartOptions,
							title: editor.lang.chart.tittleChartOptions,
							elements: [
								{
									type: 'html',
									html: '<div>' + editor.lang.chart.textInfo4 + '</div>'
								},
								{
									type: 'hbox',
									children: [
										{
											id: 'canvasHeight',
											type: 'text',
											'default': 200,
											label: editor.lang.chart.labelHeight,
											validate: function() {
												var value = this.getValue(),
													pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

												if (!pass) {
													alert(editor.lang.chart.alertValidNumber);
													this.select();
												}

												return pass;
											}
										},
										{
											id: 'canvasWidth',
											type: 'text',
											'default': 300,
											label: editor.lang.chart.labelWidth,
											validate: function() {
												var value = this.getValue(),
													pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

												if (!pass) {
													alert(editor.lang.chart.alertValidNumber);
													this.select();
												}

												return pass;
											}
										}
									]
								}
							]
						}
					]
				};

				generateColorTabs(editor, dialog, 0);
				generateColorTabs(editor, dialog, 1);

				for (var i = 0 ; i < inputRows ; i++) {
					dialog.contents[0].elements.push({
						type : 'hbox',
						children:
							[
								{
									id: 'label' + i,
									type: 'text'
								},
								{
									id: 'dataset1_value' + i,
									type: 'text',
									validate: function() {
										var value = this.getValue(),
											pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

										if (!pass) {
											alert(editor.lang.chart.alertValidNumber);
											this.select();
										}

										return pass;
									}
								},
								{
									id: 'dataset2_value' + i,
									type: 'text',
									validate: function() {
										var value = this.getValue(),
											pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

										if (!pass) {
											alert(editor.lang.chart.alertValidNumber);
											this.select();
										}

										return pass;
									}
								}
							]
					} );
				}
				return dialog;
			} );

			// Helper function that we'd like to run in case Chart.js library was loaded asynchronously.
			this.drawCharts = function() {
				// All available widgets are stored in an object, not an array.
				for (var id in editor.widgets.instances) {
					// The name was provided in editor.widgets.add()
					if (editor.widgets.instances[id].name == 'chart') {
						// Our "data" callback draws widgets, so let's call it.
						editor.widgets.instances[id].fire('data');
					}
				}
			};

			// Here we define the widget for chart type pie.
			editor.widgets.add('chartPie', {
				button: editor.lang.chart.buttonChartPie,
				dialog: 'chartPie',
				template:'<div class="chartjs" data-chart="pie" data-chart-height="200" data-chart-width="200"><canvas height="200" width="200"></canvas><div class="chartjs-legend"></div>' +
				'<link href="' + CKEDITOR.getUrl(plugin.path + 'chart.css') + '" rel="stylesheet" type="text/css">' +
				'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js') + '" type="text/javascript"><\/script>' +
				'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/widget2chart.js') + '" type="text/javascript"><\/script></div>',
				styleableElements: 'div',
				pathName: 'chartPie',

				init: function() {
					if(this.element.data('chart-value')) {
						this.setData('values', JSON.parse(this.element.data('chart-value')));
					}

					this.setData('chart', this.element.data('chart'));
					this.setData('canvasHeight', this.element.data('chart-height'));
					this.setData('canvasWidth', this.element.data('chart-width'));

					this.on('dialog', function(evt) {
						evt.data.widget = this;
					}, this);
				},

				data: function() {
					if (typeof Chart === 'undefined')
						return;

					if (!this.data.values)
						return;

					var canvas = editor.document.createElement('canvas', {height: this.data.canvasHeight, width: this.data.canvasWidth});
					canvas.replace(this.element.getChild(0));
					canvas = canvas.$;

					var legend = this.element.getChild(1).$;
					legend.innerHTML = '';

					if (!canvas.getContext)
						return;

					renderCharts(canvas, this.data.chart, legend, this.data.values);
				},

				// ACF settings. Without allowing elements introduced by this plugin, CKEditor built-in filter would remove it.
				allowedContent:'div(!chartjs)[data-*]];',
				requiredContent: 'div(chartjs)[data-chart-value,data-chart,data-chart-height,data-chart-width]',

				// Executed when CKEditor loads content, when switching from source to wysiwyg mode. Makes HTML content a widget.
				upcast: function(element, data) {
					if (element.name == 'div' && element.hasClass('chartjs')
						&& (element.attributes['data-chart'] == 'pie'
						|| element.attributes['data-chart'] == 'doughnut'
						|| element.attributes['data-chart'] == 'polar')) {
						// Downcasted <div> could have contained some text like "chart" or &nbsp; which was there just to prevent <div>s from being deleted.
						// Get rid of it when upcasting.
						element.setHtml('');
						// Chart.js work on canvas elements, Prepare one.
						var canvas = new CKEDITOR.htmlParser.element('canvas', {height: element.attributes['data-chart-height'], width: element.attributes['data-chart-width']});
						element.add(canvas);
						// And make place for a legend.
						var div = new CKEDITOR.htmlParser.element('div', {'class':"chartjs-legend"});
						element.add(div);
						return element;
					}
				},

				// Executed when CKEditor returns content, when switching from wysiwyg to source mode. Transforms a widget back to a downcasted form.
				downcast: function(element) {
					// Should not happen unless someone has accidentally messed up ACF rules.
					if (!this.data.values)
						return;

					// Create the downcasted form of a widget (a simple <div>).
					var el = new CKEDITOR.htmlParser.element('div', {
						// We could pass here hardcoded "chartjs" class, but this way we would lose here all the classes applied through the Styles dropdown.
						// (In case someone defined his own styles for the chart widget)
						'class': element.attributes['class'],
						'data-chart': this.data.chart,
						'data-chart-height': this.data.canvasHeight,
						'data-chart-width': this.data.canvasWidth,
						'data-chart-value': JSON.stringify(this.data.values)
					});
					return el;
				}

			});

			// Here we define the widget for chart type bar.
			editor.widgets.add('chartBar', {
				// The *label* for the button. The button *name* is assigned automatically based on the widget name.
				button: editor.lang.chart.buttonChartBar,
				// Connect widget with a dialog defined earlier. So our toolbar button will open a dialog window.
				dialog : 'chartBar',
				// Based on this template a widget will be created automatically once user exists the dialog window.
				template:'<div class="chartjs" data-chart="bar" data-chart-height="200" data-chart-width="300"><canvas height="200" width="300"></canvas><div class="chartjs-legend"></div>' +
				'<link href="' + CKEDITOR.getUrl(plugin.path + 'chart.css') + '" rel="stylesheet" type="text/css">' +
				'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js') + '" type="text/javascript"><\/script>' +
				'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/widget2chart.js') + '" type="text/javascript"><\/script></div>',
				// In order to provide styles (classes) for this widget through config.stylesSet we need to explicitly define the stylable elements.
				styleableElements: 'div',
				// Name to be displayed in the elements path (at the bottom of CKEditor),
				pathName: 'chartBar',

				// It is common to use the init method to populate widget data with information loaded from the DOM.
				init : function() {
					// When an empty widget is initialized after clicking a button in the toolbar, we do not have yet chart values.
					if (this.element.data('chart-value')) {
						this.setData('values', JSON.parse(this.element.data('chart-value')));
					}
					// Chart is specified in a template, so it is available even in an empty widget.
					this.setData('chart', this.element.data('chart'));
					this.setData('canvasHeight', this.element.data('chart-height'));
					this.setData('canvasWidth', this.element.data('chart-width'));

					// Pass the reference to this widget to the dialog. See "onOk" in the dialog definition, we needed widget there.
					this.on('dialog', function(evt) {
						evt.data.widget = this;
					}, this);
				},

				// Run when widget data is changed (widget is rendered for the first time, inserted, changed).
				data : function() {
					// Just in case Chart.js was loaded asynchronously and is not available yet.
					if (typeof Chart === 'undefined')
						return;
					// It's hard to draw a chart without numbers.
					if (!this.data.values)
						return;

					// It looks like Chartjs does not handle well updating charts.
					// When hovering over updated canvas old data is picked up sometimes, so we need to always replace an old canvas.
					var canvas = editor.document.createElement('canvas', {height: this.data.canvasHeight, width: this.data.canvasWidth});
					canvas.replace(this.element.getChild(0));
					canvas = canvas.$;

					var legend = this.element.getChild(1).$;
					legend.innerHTML = '';

					// IE8 can't handle the next part (without the help of excanvas etc.).
					if (!canvas.getContext)
						return;

					renderCharts(canvas, this.data.chart, legend, this.data.values);
				},

				// ACF settings. Without allowing elements introduced by this plugin, CKEditor built-in filter would remove it.
				allowedContent:'div(!chartjs)[data-*]; script;',
				requiredContent: 'div(chartjs)[data-chart-value,data-chart,data-chart-height,data-chart-width]',

				// Executed when CKEditor loads content, when switching from source to wysiwyg mode. Makes HTML content a widget.
				upcast: function(element, data) {
					if (element.name == 'div' && element.hasClass('chartjs')
						&& (element.attributes['data-chart'] == 'bar'
						|| element.attributes['data-chart'] == 'line'
						|| element.attributes['data-chart'] == 'radar')) {
						// Downcasted <div> could have contained some text like "chart" or &nbsp; which was there just to prevent <div>s from being deleted.
						// Get rid of it when upcasting.
						element.setHtml('');
						// Chart.js work on canvas elements, Prepare one.
						var canvas = new CKEDITOR.htmlParser.element('canvas', {height: element.attributes['data-chart-height'], width: element.attributes['data-chart-width']});
						element.add(canvas);
						// And make place for a legend.
						var div = new CKEDITOR.htmlParser.element('div', {'class': 'chartjs-legend'});
						element.add(div);
						return element;
					}
				},

				// Executed when CKEditor returns content, when switching from wysiwyg to source mode. Transforms a widget back to a downcasted form.
				downcast: function(element) {
					// Should not happen unless someone has accidentally messed up ACF rules.
					if (!this.data.values)
						return;

					// Create the downcasted form of a widget (a simple <div>).
					var el = new CKEDITOR.htmlParser.element('div', {
						// We could pass here hardcoded "chartjs" class, but this way we would lose here all the classes applied through the Styles dropdown.
						// (In case someone defined his own styles for the chart widget)
						'class': element.attributes['class'],
						'data-chart': this.data.chart,
						'data-chart-height': this.data.canvasHeight,
						'data-chart-width': this.data.canvasWidth,
						'data-chart-value': JSON.stringify(this.data.values)
					});
					return el;
				}
			});
		}
	});
})();

/**
 *	This method set the colors value in the tab
 */
function setColorsValue(that, widget, tabNumber) {
	that.setValueOf('colors' + tabNumber, 'fillColor', widget.data.values.datasets[tabNumber].fillColor);
	that.setValueOf('colors' + tabNumber, 'strokeColor', widget.data.values.datasets[tabNumber].strokeColor);
	if (widget.data.chart == 'bar') {
		that.setValueOf('colors' + tabNumber, 'highlightFill', widget.data.values.datasets[tabNumber].highlightFill);
		that.setValueOf('colors' + tabNumber, 'highlightStroke', widget.data.values.datasets[tabNumber].highlightStroke);
	} else {
		that.setValueOf('colors' + tabNumber, 'pointColor', widget.data.values.datasets[tabNumber].pointColor);
		that.setValueOf('colors' + tabNumber, 'pointStrokeColor', widget.data.values.datasets[tabNumber].pointStrokeColor);
		that.setValueOf('colors' + tabNumber, 'pointHighlightFill', widget.data.values.datasets[tabNumber].pointHighlightFill);
		that.setValueOf('colors' + tabNumber, 'pointHighlightStroke', widget.data.values.datasets[tabNumber].pointHighlightStroke);
	}
}

/**
 *	This method add dataset to the values object
 */
function addDatasetToValues(that, chartModel, values, tabNumber, dataset) {
	if (chartModel == 'bar') {
		values.datasets[tabNumber] = {
			label: that.getValueOf('data', 'dataset1Label'),
			fillColor: that.getValueOf('colors' + tabNumber, 'fillColor'),
			strokeColor: that.getValueOf('colors' + tabNumber, 'strokeColor'),
			highlightFill: that.getValueOf('colors' + tabNumber, 'highlightFill'),
			highlightStroke: that.getValueOf('colors' + tabNumber, 'highlightStroke'),
			data: dataset
		};
	} else {
		values.datasets[tabNumber] = {
			label: that.getValueOf('data', 'dataset1Label'),
			fillColor: that.getValueOf('colors' + tabNumber, 'fillColor'),
			strokeColor: that.getValueOf('colors' + tabNumber, 'strokeColor'),
			pointColor: that.getValueOf('colors' + tabNumber, 'pointColor'),
			pointStrokeColor: that.getValueOf('colors' + tabNumber, 'pointStrokeColor'),
			pointHighlightFill: that.getValueOf('colors' + tabNumber, 'pointHighlightFill'),
			pointHighlightStroke: that.getValueOf('colors' + tabNumber, 'pointHighlightStroke'),
			data: dataset
		};
	}
}

/**
 *	This Method generate colors tabs, as the tabs are similar
 */
function generateColorTabs(editor, dialog, tabNumber) {
	// default colors we will inject in the tabs
	var defaultColors = [
		{
			fillColor: 'rgba(220,220,220,0.2)',
			strokeColor: 'rgba(220,220,220,1)',
			highlightFill: 'rgba(220,220,220,0.75)',
			highlightStroke: 'rgba(220,220,220,1)',
			pointColor: "rgba(220,220,220,1)",
			pointHighlightStroke: "rgba(220,220,220,1)"
		},
		{
			fillColor: 'rgba(151,187,205,0.2)',
			strokeColor: 'rgba(151,187,205,1)',
			highlightFill: 'rgba(151,187,205,0.75)',
			highlightStroke: 'rgba(151,187,205,1)',
			pointColor: "rgba(151,187,205,1)",
			pointHighlightStroke: "rgba(151,187,205,1)"
		}];

	// tabs contents
	dialog.contents[tabNumber + 1].elements.push(
		{
			type: 'fieldset',
			label: editor.lang.chart.labelCoreColor,
			children: [
				{
					type: 'hbox',
					children: [
						{
							type: 'text',
							id: 'fillColor',
							label: editor.lang.chart.labelFillColor,
							'default': defaultColors[tabNumber].fillColor,
							labelLayout: 'vertical',
							width: '150px'
						},
						{
							type: 'button',
							id: 'fillColorChoose',
							'class': 'colorChooser',
							label: editor.lang.chart.buttonPicker,
							onLoad: function() {
								this.getElement().getParent().setStyle('vertical-align', 'bottom');
								this.getElement().getParent().setStyle('width', '22%');
								this.getElement().setStyle('width', '100px');
								this.getElement().setStyle('float', 'right');
								this.getElement().setStyle('margin-right', '25px');
							},
							onClick: function() {
								editor.getColorFromDialog(function(a) {
									a && this.getDialog().getContentElement('colors' + tabNumber, 'fillColor').setValue(a);
									this.focus()
								}, this)
							}
						},
						{
							type: 'text',
							id: 'strokeColor',
							label: editor.lang.chart.labelStrokeColor,
							'default': defaultColors[tabNumber].strokeColor,
							labelLayout: 'vertical',
							width: '150px'
						},
						{
							type: 'button',
							id: 'strokeColorChoose',
							'class': 'colorChooser',
							label: editor.lang.chart.buttonPicker,
							onLoad: function() {
								this.getElement().getParent().setStyle('vertical-align', 'bottom');
								this.getElement().setStyle('width', '100px');
								this.getElement().setStyle('float', 'right');
							},
							onClick: function() {
								editor.getColorFromDialog(function(a) {
									a && this.getDialog().getContentElement('colors' + tabNumber, 'strokeColor').setValue(a);
									this.focus()
								}, this)
							}
						}
					]
				}
			]
		},
		{
			type: 'hbox',
			children: [
				{
					type: 'fieldset',
					label: editor.lang.chart.labelBarColors,
					children: [
						{
							type: 'hbox',
							style: 'margin-bottom: 15px',
							children: [
								{
									type: 'text',
									id: 'highlightFill',
									label: editor.lang.chart.labelHighlihtFill,
									'default': defaultColors[tabNumber].highlightFill,
									labelLayout: 'vertical',
									width: '150px'
								},
								{
									type: 'button',
									id: 'highlightFillColorChoose',
									'class': 'colorChooser',
									label: editor.lang.chart.buttonPicker,
									onLoad: function() {
										this.getElement().getParent().setStyle('vertical-align', 'bottom');
										this.getElement().setStyle('width', '100px');
										this.getElement().setStyle('float', 'right');
									},
									onClick: function() {
										editor.getColorFromDialog(function(a) {
											a && this.getDialog().getContentElement('colors' + tabNumber, 'highlightFill').setValue(a);
											this.focus()
										}, this)
									}
								}
							]
						},
						{
							type: 'hbox',
							children: [
								{
									type: 'text',
									id: 'highlightStroke',
									label: editor.lang.chart.labelHighlihtStroke,
									'default': defaultColors[tabNumber].highlightStroke,
									labelLayout: 'vertical',
									width: '150px'
								},
								{
									type: 'button',
									id: 'highlightStrokeColorChoose',
									'class': 'colorChooser',
									label: editor.lang.chart.buttonPicker,
									onLoad: function() {
										this.getElement().getParent().setStyle('vertical-align', 'bottom');
										this.getElement().setStyle('width', '100px');
										this.getElement().setStyle('float', 'right');
									},
									onClick: function() {
										editor.getColorFromDialog(function(a) {
											a && this.getDialog().getContentElement('colors' + tabNumber, 'highlightStroke').setValue(a);
											this.focus()
										}, this)
									}
								}
							]
						}
					]
				},
				{
					type: 'fieldset',
					label: editor.lang.chart.labelLineRadarColors,
					children: [
						{
							type: 'hbox',
							style: 'margin-bottom: 15px',
							children: [
								{
									type: 'text',
									id: 'pointColor',
									label: editor.lang.chart.labelPointColor,
									'default': defaultColors[tabNumber].pointColor,
									labelLayout: 'vertical',
									width: '150px'
								},
								{
									type: 'button',
									id: 'pointColorChoose',
									'class': 'colorChooser',
									label: editor.lang.chart.buttonPicker,
									onLoad: function() {
										this.getElement().getParent().setStyle('vertical-align', 'bottom');
										this.getElement().setStyle('width', '100px');
										this.getElement().setStyle('float', 'right');
									},
									onClick: function() {
										editor.getColorFromDialog(function(a) {
											a && this.getDialog().getContentElement('colors' + tabNumber, 'pointColor').setValue(a);
											this.focus()
										}, this)
									}
								}
							]
						},
						{
							type: 'hbox',
							style: 'margin-bottom: 15px',
							children: [
								{
									type: 'text',
									id: 'pointStrokeColor',
									label: editor.lang.chart.labelPointStrokeColor,
									'default': '#fff',
									labelLayout: 'vertical',
									width: '150px'
								},
								{
									type: 'button',
									id: 'pointStrokeColorChoose',
									'class': 'colorChooser',
									label: editor.lang.chart.buttonPicker,
									onLoad: function() {
										this.getElement().getParent().setStyle('vertical-align', 'bottom');
										this.getElement().setStyle('width', '100px');
										this.getElement().setStyle('float', 'right');
									},
									onClick: function() {
										editor.getColorFromDialog(function(a) {
											a && this.getDialog().getContentElement('colors' + tabNumber, 'pointStrokeColor').setValue(a);
											this.focus()
										}, this)
									}
								}
							]
						},
						{
							type: 'hbox',
							style: 'margin-bottom: 15px',
							children: [
								{
									type: 'text',
									id: 'pointHighlightFill',
									label: editor.lang.chart.labelPointHighlightFill,
									'default': '#fff',
									labelLayout: 'vertical',
									width: '150px'
								},
								{
									type: 'button',
									id: 'pointHighlightFillColorChoose',
									'class': 'colorChooser',
									label: editor.lang.chart.buttonPicker,
									onLoad: function() {
										this.getElement().getParent().setStyle('vertical-align', 'bottom');
										this.getElement().setStyle('width', '100px');
										this.getElement().setStyle('float', 'right');
									},
									onClick: function() {
										editor.getColorFromDialog(function(a) {
											a && this.getDialog().getContentElement('colors' + tabNumber, 'pointHighlightFill').setValue(a);
											this.focus()
										}, this)
									}
								}
							]
						},
						{
							type: 'hbox',
							children: [
								{
									type: 'text',
									id: 'pointHighlightStroke',
									label: 'Point highlight stroke',
									'default': defaultColors[tabNumber].pointHighlightStroke,
									labelLayout: 'vertical',
									width: '150px'
								},
								{
									type: 'button',
									id: 'pointHighlightStrokeColorChoose',
									'class': 'colorChooser',
									label: editor.lang.chart.buttonPicker,
									onLoad: function() {
										this.getElement().getParent().setStyle('vertical-align', 'bottom');
										this.getElement().setStyle('width', '100px');
										this.getElement().setStyle('float', 'right');
									},
									onClick: function() {
										editor.getColorFromDialog(function(a) {
											a && this.getDialog().getContentElement('colors' + tabNumber, 'pointHighlightStroke').setValue(a);
											this.focus()
										}, this)
									}
								}
							]
						}
					]
				}
			]
		});
}

/**
 *	This method display chart in CKeditor
 */
function renderCharts(canvas, chartModel, legend, values) {
	// Prepare canvas and chart instance.
	var ctx = canvas.getContext('2d'),
		chart = new Chart(ctx);

	// Render Line chart.
	if (chartModel == 'bar') {
		var currentChart = chart.Bar(values);

		// For "Bar" type legend makes sense only with more than one dataset.
		setLegend(values, legend, currentChart);
	}
	else if (chartModel == 'line') {
		var currentChart = chart.Line(values);

		// For "Line" type legend makes sense only with more than one dataset.
		setLegend(values, legend, currentChart)
	}
	else if (chartModel == 'radar') {
		var currentChart = chart.Radar(values);

		// For "Radar" type legend makes sense only with more than one dataset.
		setLegend(values, legend, currentChart)
	}
	// Render Pie chart and legend.
	else if (chartModel == 'pie') {
		legend.innerHTML = chart.Pie(values).generateLegend();
	}
	// Render Doughnut chart and legend.
	else if (chartModel == 'doughnut') {
		legend.innerHTML = chart.Doughnut(values).generateLegend();
	}
	// Render Polar chart and legend.
	else if (chartModel == 'polar') {
		legend.innerHTML = chart.PolarArea(values).generateLegend();
	}
}

function setLegend(values, legend, currentChart) {
	if (values.datasets.length > 1) {
		legend.innerHTML = currentChart.generateLegend();
	}
}