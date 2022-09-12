//VARIBLES
let colors = [
    '#105099',
    '#3269A7',
    '#5482B6',
    '#769BC4',
    '#BACDE1'
];
let tooltip = d3.select('#chartsTooltip');


//INIT FUNCTIONS
init2a();
init2b();
init16_18();
init35();
init10();
init42a();
init42b();
init48a();
init48b();
init48c();

//FUNCTIONS
function init2a() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1296035760&single=true&output=csv';
    let selectElement = document.getElementById('select_2a');
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("2a", data);
        
        //Listener
        selectElement.addEventListener('change', function(e) {
            alert("Chart 2a > " + e.target.options[e.target.selectedIndex].value);
            //updateChart(e.target.options[e.target.selectedIndex].value)
        });

        //Init elements


    });
}

function init2b() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1296035760&single=true&output=csv';
    let selectBtnBlock = document.getElementById('buttons_2b');
    let selectBtns = selectBtnBlock.getElementsByClassName('btn');
    let currentBtn = selectBtns[0];

    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("2b", data);
        
        //Listener
        for(let i = 0; i < selectBtns.length; i++) {
            selectBtns[i].addEventListener('click', function(e) {
                console.log(e.target, e.target.textContent);
                if(e.target != currentBtn) {
                    //CSS Class Change
                    currentBtn.classList.remove('active');
                    e.target.classList.add('active');
                    //Updating Chart
                    //updateChart(currentBtn.textContent);
                    //New assignation
                    currentBtn = e.target;
                    alert("Chart 2b - Button > " + currentBtn.textContent);
                }
            });
        }
    });
}

function init16_18() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=0&single=true&output=csv';
    let selectElement = document.getElementById('select_16_18');
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("16_18", data);

        //Listener
        selectElement.addEventListener('change', function(e) {
            alert("Chart 16-17-18 > " + e.target.options[e.target.selectedIndex].value);
            //updateChart(e.target.options[e.target.selectedIndex].value)
        });
    });
}

function init35() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1437038791&single=true&output=csv';
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("35", data);
    });
}

function init10() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=355194318&single=true&output=csv';
    let selectBtnBlock = document.getElementById('buttons_10');
    let selectBtns = selectBtnBlock.getElementsByClassName('btn');
    let currentBtn = selectBtns[0];
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("10", data);
        
        //Listener
        for(let i = 0; i < selectBtns.length; i++) {
            selectBtns[i].addEventListener('click', function(e) {
                console.log(e.target, e.target.textContent);
                if(e.target != currentBtn) {
                    //CSS Class Change
                    currentBtn.classList.remove('active');
                    e.target.classList.add('active');
                    //Updating Chart
                    //updateChart(currentBtn.textContent);
                    //New assignation
                    currentBtn = e.target;
                    alert("Chart 10 - Button > " + currentBtn.textContent);
                }
            });
        }
        
    });
}

function init42a() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1639180365&single=true&output=csv';
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("42a", data);
    });
}

function init42b() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=846839345&single=true&output=csv';
    let selectElement = document.getElementById('select_42b');
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("42b", data);

        //Listener
        selectElement.addEventListener('change', function(e) {
            alert("Chart 42b > " + e.target.options[e.target.selectedIndex].value);
            //updateChart(e.target.options[e.target.selectedIndex].value)
        });
    });
}

function init48a() {
    let url = '';
    let selectElement = document.getElementById('select_48a');
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("48a", data);

        //Listener
        selectElement.addEventListener('change', function(e) {
            alert("Chart 48a > " + e.target.options[e.target.selectedIndex].value);
            //updateChart(e.target.options[e.target.selectedIndex].value)
        });
    });
}

function init48b() {
    //Variables
    let chartBlock = d3.select('#v_fig48b'), chart, x_pre, x_final, y_pre, y_final, line, paths;
    let width, height, margin = {top: 10, right: 5, bottom: 20, left: 25};
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=404906190&single=true&output=csv';
    d3.csv(url, function(error, data) {
        if (error) throw error;
        
        //DATA
        let innerData = data.map(function(d) {
            return {
                Year: d.Year,
                'Brazil': +d['Brazil'],
                'Argentina': +d['Argentina'],
                'Chile': +d['Chile'],
                'Colombia': +d['Colombia'],
                'Mexico': +d['Mexico']
            }
        });
        let keys = data.columns.slice(1);
        let nestedData = keys.map(function(item) {
            let aux = [];
            innerData.map(function(d) {
                aux.push({'Year':d.Year, 'value': d[item]});
            });
            return {'key': item, 'data': aux}; 
        });
        console.log("48b", nestedData);

        //INIT VISUALIZATIONS VARIABLES
        width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
        height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

        chart = chartBlock
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        //X Axis
        x_pre = d3.scaleBand()
            .domain(nestedData[0].data.map(function(d) { return d.Year; }))
            .range([0, width]);
        
        x_final = function(g){
            g.call(d3.axisBottom(x_pre))
            g.call(function(g){g.selectAll('.tick line').remove();})
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr('class','x_axis')
            .call(x_final);

        //Y Axis
        y_pre = d3.scaleLinear()
            .domain([0, 15])
            .range([height, 0]);

        y_final = function(svg){
            svg.call(d3.axisLeft(y_pre).ticks(3))
            svg.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr("x1", '0')
                    .attr("x2", '' + width + '')
            })
            svg.call(function(g){g.select('.domain').remove()});
        }      

        chart.append("g")
            .attr('class','y_axis')
            .call(y_final);

        //Lines
        line = d3.line()
            .x(function(d) { return x_pre(d.Year) + x_pre.bandwidth() / 2; })
            .y(function(d) { return y_pre(+d.value); });

        paths = chart.selectAll(".line")
            .data(nestedData)
            .enter()
            .append("path")
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", function(d, i) {
                return colors[i];
            })
            .attr("stroke-width", 2)
            .attr('d', function(d) {
                return line(d.data);
            });

        paths.attr("stroke-dasharray", 768 + " " + 768)
            .attr("stroke-dashoffset", 768)
            .transition()
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .duration(3000);

        //Quedarían los círculos para el tooltip
    });
}

//Aquí jugaremos con display: none de los distintos SVG y con la visualización del tooltip
function init48c() {
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1192825969&single=true&output=csv';
    let selectElement = document.getElementById('select_48c');
    d3.csv(url, function(error, data) {
        if (error) throw error;
        console.log("48c", data);

        //Listener
        selectElement.addEventListener('change', function(e) {
            alert("Chart 48c > " + e.target.options[e.target.selectedIndex].value);
            //updateChart(e.target.options[e.target.selectedIndex].value)
        });
    });
}