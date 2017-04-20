var psv = d3.dsvFormat("|");
//^created a method that will parse on "|"
d3.text("DC_Features_20170201.txt")
	.get(function (error,data) {
		var rows = psv.parse(data)
		var features = {};

		for (var p = 0; p < rows.length; p++) {
			if(features[rows[p].FEATURE_CLASS]){
				features[rows[p].FEATURE_CLASS] += 1
			}else{
				features[rows[p].FEATURE_CLASS] = 1
			}
		}

var height = d3.max(Object.values(features))/5

var margin = {left: 10, right: 10, top: 10, bottom:10 }

var barWidth = 25
var barGap = 4
var colNumber = Object.keys(features).length
var whitespace = (colNumber-1)*barGap
var width = ((barWidth+barGap)*colNumber)-barGap
console.log(height, width)


var x = d3.scaleBand()
			.domain(Object.keys(features))
			.range([0,width])
			.paddingInner(whitespace/width);

var xAxis = d3.axisBottom(x);

var svg = d3.select('#chart').append('svg')
			.attr('height', '100%' )
			.attr('width', '100%' )

var chartGroup = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

chartGroup.selectAll('rect')
	.data(Object.values(features))
	.enter().append('rect')
    .attr('x', function(d, i) { return i * (barWidth+barGap); } )
    .attr('y', function(d, i) { return height-d/5; })
    .attr('width', barWidth )
    .attr('height', function(d,i){return d/5;})
    .attr('rx', 0)
    .attr('ry', 0)
    .style('fill', '#000');

chartGroup.append('g')
	.attr('class', 'x axis hidden')
	.attr('transform', 'translate(' + 0 + ',' + height + ')')
	.call(xAxis)
	.selectAll('text')
		.attr("y", 0)
		.attr("x", 5)
		.attr("transform", "rotate(45)")
		.style("text-anchor", "start");
});


