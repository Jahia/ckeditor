/**
 * @fileOverview Replaces widgets generate by CKeditor with charts using Chart.js.
 *
 * This file should be included on websites as CKEditor returns just a div element
 * with data attributes that needs to be replaced with a proper chart.
 */

// For IE8 and below the code will not be executed.
if (typeof document.addEventListener !== 'undefined')
	document.addEventListener( 'DOMContentLoaded', function() {
	// Make sure Chart.js is enabled on a page.
	if (typeof Chart === 'undefined') {
		if (typeof console !== "undefined") {
			console.log('ERROR: You must include chart.min.js on this page in order to use Chart.js');
		}
		return;
	}

	// Loop over all found elements.
	[].forEach.call(document.querySelectorAll('div.chartjs'), function (el) {
			// Get chart information from data attributes.
			var chartModel = el.getAttribute('data-chart'),
				values = JSON.parse(el.getAttribute('data-chart-value'));

			// Malformed element, exit.
			if (!values || !chartModel)
				return;

			// <div> may contain some text like "chart" or &nbsp which is there just to prevent <div>s from being deleted.
			el.innerHTML = '';

			// Prepare some DOM elements for Chart.js.
			var canvas = document.createElement('canvas');
			canvas.height = el.getAttribute('data-chart-height');
			canvas.width = el.getAttribute('data-chart-width');
			el.appendChild(canvas);

			var legend = document.createElement('div');
			legend.setAttribute('class', 'chartjs-legend');
			el.appendChild(legend);

			// Prepare canvas and chart instance.
			var i, ctx = canvas.getContext("2d"),
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
	);
});

function setLegend(values, legend, currentChart) {
	if (values.datasets.length > 1) {
		legend.innerHTML = currentChart.generateLegend();
	}
}