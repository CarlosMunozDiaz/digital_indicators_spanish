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
    //Variables
    let width, height, margin = {top: 10, right: 12.5, bottom: 50, left: 35};
    let url_brasil = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1437038791&single=true&output=csv';
    let url_chile = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1435753595&single=true&output=csv';
    let url_colombia = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=217869386&single=true&output=csv';
    let url_ue = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=962648905&single=true&output=csv';

    d3.queue()
        .defer(d3.csv, url_brasil)
        .defer(d3.csv, url_chile)
        .defer(d3.csv, url_colombia)
        .defer(d3.csv, url_ue)
        .await(function(error, dataBrasil, dataChile, dataColombia, dataUE) {
            if (error) throw error;

            //Desarrollo de los cuatro gráficos
            //BRASIL | Establecemos ancho y alto por defecto
            let chartBlockBr = d3.select('#v_fig35_1'), chartBr, x_preBr, x_finalBr, y_preBr, y_finalBr;
            width = parseInt(chartBlockBr.style('width')) - margin.left - margin.right,
            height = parseInt(chartBlockBr.style('height')) - margin.top - margin.bottom;

            initChart35_Simple(dataBrasil, chartBlockBr, chartBr, x_preBr, x_finalBr, y_preBr, y_finalBr);

            //CHILE
            let chartBlockCh = d3.select('#v_fig35_2'), chartCh, x_preCh, x_finalCh, y_preCh, y_finalCh;
            initChart35_Simple(dataChile, chartBlockCh, chartCh, x_preCh, x_finalCh, y_preCh, y_finalCh);

            //COLOMBIA
            let chartBlockCo = d3.select('#v_fig35_3'), chartCo, x_preCo, x_finalCo, y_preCo, y_finalCo;
            initChart35_Grouped(dataColombia, chartBlockCo, chartCo, x_preCo, x_finalCo, y_preCo, y_finalCo);

            //UE27
            let chartBlockUE = d3.select('#v_fig35_4'), chartUE, x_preUE, x_finalUE, y_preUE, y_finalUE;
            initChart35_Grouped(dataUE, chartBlockUE, chartUE, x_preUE, x_finalUE, y_preUE, y_finalUE);


            ////HELPERS
            function initChart35_Simple(data, block, chart, x_pre, x_final, y_pre, y_final) {
                chart = block
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

                x_pre = d3.scaleBand()
                    .domain(data.map(function(d) { return d.Tipo; }))
                    .range([0, width]);

                x_final = function(g){
                    g.call(d3.axisBottom(x_pre).tickFormat(function(d) { return d; }))
                    g.call(function(g){g.selectAll('.tick line').remove()})
                    g.call(function(g){g.select('.domain').remove()});
                }

                chart.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(x_final);

                y_pre = d3.scaleLinear()
                    .domain([0,20])
                    .range([height, 0]);

                y_final = function(svg){
                    svg.call(d3.axisLeft(y_pre).ticks(4).tickFormat(function(d) { return d; }))
                    svg.call(function(g){
                        g.selectAll('.tick line')
                            .attr('class', function(d,i) {
                                if (d == 0) {
                                    return 'line-special';
                                }
                            })
                            .attr('x1', '0%')
                            .attr('x2', `${width}`)
                    })
                    svg.call(function(g){g.select('.domain').remove()});
                }

                chart.append("g")
                    .call(y_final);

                chart.selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr('class', function(d, i) { return `bar-35 bar-35-${i}`; })
                    .style('fill', colors[0])
                    .attr("y", function (d) {
                        return y_pre(0);
                    })
                    .attr("x", function (d, i) {
                        return x_pre(d.Tipo) + (x_pre.bandwidth() / 2) - 15;                                       
                    })            
                    .attr("width", '30px')
                    .transition()
                    .duration(2000)
                    .attr("y", function (d, i) {
                        return y_pre(+d.Valor);                                        
                    })
                    .attr("height", function (d, i) {
                        return height - y_pre(+d.Valor);                                        
                    });
            }

            function initChart35_Grouped(data, block, chart, x_pre, x_final, y_pre, y_final) {
                chart = block
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

                let subgroups = data.columns.slice(1);
                let tipos = d3.map(data, function(d){return(d.Tipo)}).keys();

                x_pre = d3.scaleBand()
                    .domain(tipos)
                    .range([0, width])
                    .padding([0.2]);

                x_final = function(g){
                    g.call(d3.axisBottom(x_pre).tickFormat(function(d) { return d; }))
                    g.call(function(g){g.selectAll('.tick line').remove()})
                    g.call(function(g){g.select('.domain').remove()})
                    g.call(function(g){
                        g.selectAll('.tick text')
                            .call(wrap, x_pre.bandwidth());
                    });
                }
    
                chart.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(x_final);

                y_pre = d3.scaleLinear()
                    .domain([0, 42])
                    .range([ height, 0 ]);

                y_final = function(svg){
                    svg.call(d3.axisLeft(y_pre).ticks(4).tickFormat(function(d) { return d; }))
                    svg.call(function(g){
                        g.selectAll('.tick line')
                            .attr('class', function(d,i) {
                                if (d == 0) {
                                    return 'line-special';
                                }
                            })
                            .attr('x1', '0%')
                            .attr('x2', `${width}`)
                    })
                    svg.call(function(g){g.select('.domain').remove()});
                }
    
                chart.append("g")
                    .call(y_final);

                let xSubgroup = d3.scaleBand()
                    .domain(subgroups)
                    .range([0, x_pre.bandwidth()])
                    .padding([0.05]);
                
                let color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range([colors[0], colors[1], colors[2]]);

                chart.append("g")
                    .selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("transform", function(d) { return "translate(" + x_pre(d.Tipo) + ",0)"; })
                    .selectAll("rect")
                    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: +d[key]}; }); })
                    .enter()
                    .append("rect")
                    .attr("fill", function(d) { return color(d.key); })
                    .attr("y", function (d) { return y_pre(0); })
                    .attr("x", function(d) { return xSubgroup(d.key); })
                    .attr("width", xSubgroup.bandwidth())
                    .transition()
                    .duration(2000)
                    .attr("y", function(d) { return y_pre(d.value); })
                    .attr("height", function(d) { return height - y_pre(d.value); })   
            }
        });
}

function init10() {
    //Variables
    let chartBlock = d3.select('#v_fig10'), chart, x_pre, x_final, y_pre, y_final, color;
    let width, height, margin = {top: 10, right: 12.5, bottom: 25, left: 101.5};
    let groups = ['sem','t_tic'];
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=355194318&single=true&output=csv';
    //Buttons
    let selectBtnBlock = document.getElementById('buttons_10');
    let selectBtns = selectBtnBlock.getElementsByClassName('btn');
    let currentBtn = selectBtns[0];
    d3.csv(url, function(error, data) {
        if (error) throw error;
        
        //INIT VISUALIZATION VARIABLES
        let innerData = data.slice();

        width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
        height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

        chart = chartBlock
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        x_pre = d3.scaleLinear()
            .domain([0,20])
            .range([0, width])
            .nice();

        x_final = function(g){
            g.call(d3.axisBottom(x_pre).ticks(5).tickFormat(function(d) { return d + '%'; }))
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr('y1', '0%')
                    .attr('y2', `-${height}`)
            })
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(x_final);

        y_pre = d3.scaleBand()
            .domain(data.map(function(d) { return d.Country_ES; }))
            .range([height, 0]);

        y_final = function(svg){
            svg.call(d3.axisLeft(y_pre).tickFormat(function(d) { return d; }))
            svg.call(function(g){g.selectAll('.tick line').remove()})
            svg.call(function(g){g.select('.domain').remove()});
        }        
        
        chart.append("g")
            .call(y_final);

        color = d3.scaleOrdinal()
            .domain(groups)
            .range([colors[0], colors[1]]);

        let stackedData = d3.stack()
            .keys(color.domain())
            (innerData);

        chart.append("g")
            .attr('class','chart-10')
            .selectAll("g")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", function(d) { return color(d.key); })
            .attr('class', function(d) {
                return 'rect-padre-10-' + d.key;
            })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr('class', function(d) {
                return 'rect-10 rect-10-' + d.data.Country_ES;
            })
            .attr("x", function (d) {
                return x_pre(0);
            })
            .attr("y", function (d) {
                return y_pre(d.data.Country_ES) + y_pre.bandwidth() / 4;
            })  
            .attr("height", y_pre.bandwidth() / 2)
            .transition()
            .duration(2000)
            .attr("x", function (d) { return x_pre(d[0]); })
            .attr("width", function (d) { return x_pre(d[1]) - x_pre(d[0]); });

        function updateChart(btn) {
            if (btn == 'STEM') {
                groups = ['sem', 't_tic'];
                color = d3.scaleOrdinal()
                    .domain(groups)
                    .range([colors[0], colors[1]]);
            } else if (btn == 'SEM') {
                groups = ['sem'];
                color = d3.scaleOrdinal()
                    .domain(groups)
                    .range([colors[0]]);
            } else {
                groups = ['t_tic'];
                color = d3.scaleOrdinal()
                    .domain(groups)
                    .range([colors[1]]);
            }

            stackedData = d3.stack()
                .keys(color.domain())
                (innerData);

            chart.select('.chart-10')
                .selectAll('g')
                .remove()
                .exit();

            chart.select('.chart-10')
                .selectAll("g")
                .data(stackedData)
                .enter()
                .append("g")
                .attr("fill", function(d) { return color(d.key); })
                .attr('class', function(d) {
                    return 'rect-padre-10-' + d.key;
                })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr('class', function(d) {
                    return 'rect-10 rect-10-' + d.data.Country_ES;
                })
                .attr("x", function (d) {
                    return x_pre(0);
                })
                .attr("y", function (d) {
                    return y_pre(d.data.Country_ES) + y_pre.bandwidth() / 4;
                })  
                .attr("height", y_pre.bandwidth() / 2)
                .transition()
                .duration(2000)
                .attr("x", function (d) { return x_pre(d[0]); })
                .attr("width", function (d) { return x_pre(d[1]) - x_pre(d[0]); }); 
        }
        
        //Listener
        for(let i = 0; i < selectBtns.length; i++) {
            selectBtns[i].addEventListener('click', function(e) {
                if(e.target != currentBtn) {
                    //CSS Class Change
                    currentBtn.classList.remove('active');
                    e.target.classList.add('active');
                    //Updating Chart
                    updateChart(e.target.textContent);
                    //New assignation
                    currentBtn = e.target;
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
    //VARIABLES
    let chartBlock = d3.select('#v_fig42b'), chart, x_pre, x_final, y_pre, y_final, color;
    let width, height, margin = {top: 10, right: 5, bottom: 85, left: 35};
    let groups = ['certificates','sites'];
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=846839345&single=true&output=csv';
    let selectElement = document.getElementById('select_42b');
    d3.csv(url, function(error, data) {
        if (error) throw error;

        //INIT VISUALIZATION VARIABLES
        let innerData = data.filter(function(item) {
            if(item.Year == '2020') {
                return item;
            }
        });

        width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
        height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

        chart = chartBlock
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        x_pre = d3.scaleBand()
            .domain(d3.map(innerData, function(d){ return d.Country_ES; }).keys())
            .range([0, width])
            .padding(0.4);
        
        x_final = function(g) {
            g.call(d3.axisBottom(x_pre));
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
            g.call(function(g){
                g.selectAll('.tick text')
                    .style("text-anchor", "end")
                    .attr("dx", "-0.4em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-40)" 
                    });
            })
        }
                
        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(x_final);

        y_pre = d3.scaleLinear()
            .domain([0, 680])
            .range([height, 0]);

        y_final = function(g) {
            g.call(d3.axisLeft(y_pre).ticks(5));
            g.selectAll('.tick line')
                .attr('class', function(d,i) {
                    if (d == 0) {
                        return 'line-special';
                    }
                })
                .attr('x1', '0')
                .attr('x2', '' + width +'');
        }

        chart.append("g")
            .attr("class", "yaxis")
            .call(y_final);

        color = d3.scaleOrdinal()
            .domain(groups)
            .range([colors[0], colors[1]]);

        let stackedData = d3.stack()
            .keys(color.domain())
            (innerData);
        
        chart.append("g")
            .attr('class','chart-42b')
            .selectAll("g")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", function(d) { return color(d.key); })
            .attr('class', function(d) {
                return 'rect-padre-42b-' + d.key;
            })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr('class', function(d) {
                return 'rect-42b rect-42b-' + d.data.Country_ES;
            })
            .attr("x", function(d) { return x_pre(d.data.Country_ES); })
            .attr("y", function(d) { return y_pre(0); })
            .attr("height", function(d) { return 0; })
            .attr("width",x_pre.bandwidth())
            .transition()
            .duration(2000)
            .attr("y", function(d) { return y_pre(d[1]); })
            .attr("height", function(d) { return y_pre(d[0]) - y_pre(d[1]); });

        function updateChart(year) {
            innerData = data.filter(function(item) {
                if(item.Year == year) {
                    return item;
                }
            });

            stackedData = d3.stack()
                .keys(color.domain())
                (innerData);

            chart.select('.chart-42b')
                .selectAll('g')
                .data(stackedData)
                .attr("fill", function(d) { return color(d.key); })
                .selectAll(".rect-42b")
                .data(function(d) {console.log(d); return d; })
                .attr("x", function(d) { return x_pre(d.data.Country_ES); })
                //.attr("y", function(d) { return y_pre(0); })
                //.attr("height", function(d) { return 0; })
                .attr("width",x_pre.bandwidth())
                .transition()
                .duration(2000)
                .attr("y", function(d) { return y_pre(d[1]); })
                .attr("height", function(d) { return y_pre(d[0]) - y_pre(d[1]); });
        }

        //Listener
        selectElement.addEventListener('change', function(e) {
            updateChart(e.target.options[e.target.selectedIndex].value)
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

/* HELPERS */
function wrap(text, width) {
    text.each(function() {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > (width + 10)) {
            line.pop()
            tspan.text(line.join(" "))
            line = [word]
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
            }
        }
    })
  }