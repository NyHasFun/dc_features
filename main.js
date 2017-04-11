// var psv = d3.dsvFormat("|");
// //^created a method that will parse on "|"
// d3.text("DC_Features_20170201.txt")
// 	.get(function (error,data) {
// 		var rows = psv.parse(data)
// 		var features = {};

// 		for (var p = 0; p < rows.length; p++) {
// 			if(features[rows[p].FEATURE_CLASS]){
// 				features[rows[p].FEATURE_CLASS] += 1
// 			}else{
// 				features[rows[p].FEATURE_CLASS] = 1
// 			}
// 		}
// 		console.log(JSON.stringify(features))
// 	});


features = {"Park":685,"School":648,"Summit":23,"Populated Place":179,"Locale":376,"Channel":4,"Stream":30,"Military":52,"Island":7,"Bridge":54,"Falls":1,"Cemetery":36,"Building":2039,"Civil":57,"Church":687,"Hospital":101,"Trail":12,"Canal":5,"Tower":31,"Dam":5,"Reservoir":13,"Lake":3,"Cape":12,"Area":17,"Crossing":2,"Valley":5,"Spring":5,"Woods":1,"Bay":2,"Harbor":1,"Beach":2,"Post Office":79,"Airport":19,"Pillar":1,"Gut":1,"Reserve":1}

var colWidth = 30
var colPadding = 4
var colNumber = Object.keys(features).length
var whitespace = (colNumber-1)*colPadding
var space = ((colWidth+colPadding)*colNumber)-colPadding


var x = d3.scaleBand()
			.domain(Object.keys(features))
			.range([0,space])
			.paddingInner(whitespace/space);

var xAxis = d3.axisBottom(x);

 	var svg = d3.select('body').append('svg')
 				.attr('height', '100%' )
 				.attr('width', '100%' )

 	svg.selectAll('rect')
 		.data(Object.values(features))
 		.enter().append('rect')
 	    .attr('x', function(d, i) { return i * (colWidth+colPadding); } )
 	    .attr('y', function(d, i) { return 500-d/2; })
 	    .attr('width', colWidth )
 	    .attr('height', function(d,i){return d/2;})
 	    .attr('rx', 0)
 	    .attr('ry', 0)
 	    .style('fill', '#000');

 	svg.append('g')
 		.attr('class', 'x axis hidden')
 		.attr('transform', 'translate(' + 0 + ',' + 500 + ')')
 		.call(xAxis)
 		.selectAll('text')
 			.attr("y", 0)
    		.attr("x", 5)
			.attr("transform", "rotate(45)")
			.style("text-anchor", "start");

