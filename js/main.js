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
    let chartBlock = d3.select('#v_fig2a'), chart, x_pre, x_final, y_pre, y_final, auxColors;
    let width, height, margin = {top: 10, right: 10, bottom: 85, left: 35};
    let groups = ['GDP','Speed'];
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1296035760&single=true&output=csv';
    let selectElement = document.getElementById('select_2a');
    d3.csv(url, function(error, data) {
        if (error) throw error;

        //Datos de LAC
        data = data.filter(function(item) {
            if(item.Region == 'LAC') {
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

        //Eje X
        x_pre = d3.scaleBand()
            .domain(d3.map(data, function(d){ return d.Country_EN; }).keys())
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

        //Eje Y
        y_pre = d3.scaleLinear()
            .domain([0, 200])
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

        auxColors = d3.scaleOrdinal()
            .domain(groups)
            .range([colors[0], colors[1]]);

        //Inicialización
        initChart('2020');

        function initChart(year) {
            let auxData = data.filter(function(d) {
                if(d.Year == year) {
                    return d;
                }
            });

            let stackedData = d3.stack()
                .keys(auxColors.domain())
                (auxData);

            chart.append("g")
            .attr('class','chart-2a')
            .selectAll("g")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", function(d) { return auxColors(d.key); })
            .attr('class', function(d) {
                return 'circle-padre-2a-' + d.key;
            })
            .selectAll("circle")
            .data(function(d) { return d; })
            .enter()
            .append("circle")
            .style('opacity', function(d) {
                if(+d.data['GDP'] == 0) {
                    return '0';
                } else {
                    return '1';
                }
            })
            .attr('class', function(d) {
                return 'circle-2a circle-2a-' + d.data.Country_EN;
            })
            .attr('r', 6)
            .attr('cx', function(d) { return x_pre(d.data.Country_EN) + x_pre.bandwidth() / 2; })
            .attr('cy', y_pre(0))
            .on('mouseenter mousemove', function(d,i,e) {
                //Texto en tooltip
                let html = `<p class="v_tooltip-title">Relación PIB/ancho de banda ${d.data.Country_ES} en ${d.data.Year}</p>
                            <p class="v_tooltip-text">Velocidad: ${d.data.Speed}MBPS</p>
                            <p class="v_tooltip-text">PIB per cápita: ${d.data.GDP}%</p>`;
                
                tooltip.html(html);

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d,i,e) {
                //Quitamos el tooltip
                getOutTooltip(tooltip);
            })
            .transition()
            .duration(2000)
            .attr('cy', (d) => { return y_pre(d[1]); });
        }

        function updateChart(year) {
            let auxData = data.filter(function(d) {
                if(d.Year == year) {
                    return d;
                }
            });

            let stackedData = d3.stack()
                .keys(auxColors.domain())
                (auxData);

            chart.select('.chart-2a')
                .selectAll('g')
                .data(stackedData)
                .attr("fill", function(d) { return auxColors(d.key); })
                .selectAll(".circle-2a")
                .data(function(d) { return d; })
                .style('opacity', function(d) {
                    if(+d.data['GDP'] == 0) {
                        return '0';
                    } else {
                        return '1';
                    }
                })
                .transition()
                .duration(2000)
                .attr('cy', (d) => { return y_pre(d[1]); });
        }
        
        //Listener
        selectElement.addEventListener('change', function(e) {
            updateChart(e.target.options[e.target.selectedIndex].value)
        });
    });
}

function init2b() {
    let chartBlock = d3.select('#v_fig2b'), chart, x_pre, x_final, y_pre, y_final, auxColors;
    let width, height, margin = {top: 10, right: 10, bottom: 25, left: 35};

    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1296035760&single=true&output=csv';
    let selectBtnBlock = document.getElementById('buttons_2b');
    let selectBtns = selectBtnBlock.getElementsByClassName('btn');
    let currentBtn = selectBtns[0];

    d3.csv(url, function(error, data) {
        if (error) throw error;
        data = data.filter(function(d) {
            if(d.Year == '2020') {
                return d;
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
                
        //Eje X
        x_pre = d3.scaleLinear()
            .domain([0, 10])
            .range([0,width])
            .nice();

        x_final = svg => svg
            .call(d3.axisBottom(x_pre).ticks(5))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", (d) => { if (d == 0) { return 'line-special'; } })
                .attr("y1", '0%')
                .attr("y2", `-${height}`)
            );

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(x_final);

        //Eje Y
        y_pre = d3.scaleLinear()
            .domain([0, 300])
            .range([height, 0])
            .nice();
        
        y_final = svg => svg
            .call(d3.axisLeft(y_pre).ticks(5))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", function(d) { if (d == 0) { return 'line-special'; }})
                .attr("x1", `0`)
                .attr("x2", `${width}`)
            );

        chart.append('g')
            .call(y_final);

        auxColors = d3.scaleOrdinal()
            .domain(['LAC', 'OECD'])
            .range([colors[0], colors[1]]);

        function initChart() {
            chart.append('g')
                .selectAll("dot")
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'circle-scatterplot')
                .style('opacity', '1')
                .attr("fill", function(d) { return auxColors(d.Region); })
                .attr('r', 6)            
                .attr('cx', (d) => {return x_pre(+d['GDP'])})
                .on('mouseenter mousemove', function(d,i,e) {
                    //Texto en tooltip
                    let html = `<p class="v_tooltip-title">Relación PIB/ancho de banda en ${d.Country_ES} (${d.Region}) en ${d.Year}</p>
                        <p class="v_tooltip-text">Velocidad: ${d.Speed}MBPS</p>
                        <p class="v_tooltip-text">PIB per cápita: ${d.GDP}%</p>`;
        
                    tooltip.html(html);
    
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
                .transition()
                .ease(d3.easeBounce)
                .duration(1750)
                .attr('cy', (d) => {return y_pre(+d['Speed'])})
                .delay((d,i) => {return i * 50});
        }

        initChart();

        function updateChart(type) {
            chart.selectAll('.circle-scatterplot')
                .style('opacity', function(d) {
                    if(type == 'Both') {
                        return '1';
                    } else {
                        if (d.Region == type) {
                            return '1';
                        } else {
                            return '0.1';
                        }
                    }
                });
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

function init16_18() {
    let chartBlock = d3.select('#v_fig16_18'), chart, x_pre_0, x_pre_1, x_final, y_pre, y_final, slice;
    let width, height, margin = {top: 10, right: 10, bottom: 80, left: 27.5};
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=0&single=true&output=csv';
    let selectElement = document.getElementById('select_16_18');
    
    d3.csv(url, function(error, data) {
        if (error) throw error;

        let industrias = d3.map(data, function(d) { return d.industry_group_name_ES; }).keys();
        let columnas = ['disruptive_tech_skills','tech_skills'];

        width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
        height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

        chart = chartBlock
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        //Eje X - Tipos
        x_pre_0 = d3.scaleBand()
            .range([0, width])
            .domain(industrias);

        //Eje X - Habilidades
        x_pre_1 = d3.scaleBand()
            .range([x_pre_0.bandwidth(), 0])
            .paddingInner(0.5)
            .paddingOuter(0.5)
            .domain(columnas);

        x_final = function(g){
            g.call(d3.axisBottom(x_pre_0));
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
            g.call(function(g){
                g.selectAll('.tick text')
                    .style("text-anchor", "end")
                    .attr("dx", "-0.4em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-35)" 
                    });
            });
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(x_final);

        //Eje Y
        y_pre = d3.scaleLinear()
            .range([height, 0])
            .domain([0,2])
            .nice();
    
        y_final = function(g){
            g.call(d3.axisLeft(y_pre).ticks(5))
            g.call(function(g){g.select('.domain').remove()})
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr('x1', '0%')
                    .attr('x2', `${width}`)
            });
        }

        chart.append("g")
            .call(y_final);

        //Colores
        let auxColors = d3.scaleOrdinal()
            .domain(columnas)
            .range([colors[1], colors[0]]);

        initChart('Argentina');

        function initChart(country) {
            let auxData = data.filter(function(d) {
                if (d.Pais == country) {
                    return d;
                }
            });

            slice = chart.selectAll(".slice")
                .data(auxData)
                .enter()
                .append("g")
                .attr("class", function(d) {
                    return 'slice slice-' + d.industry_group_name_ES; //Regex
                })
                .attr("transform", function(d) { return "translate(" + x_pre_0(d['industry_group_name_ES']) + ",0)"; });

            slice.selectAll("rect")
                .data(function(d) { return columnas.map(function(key) { return {key: key, value: +d[key]}; }); })
                .enter()
                .append("rect")
                .attr('class', 'rect')
                .attr("x", function(d) { return x_pre_1(d.key); })
                .attr("y", function(d) { return y_pre(0); })
                .attr("width", x_pre_1.bandwidth())
                .attr("height", function(d) { return height - y_pre(0); })
                .attr("fill", function(d) { return auxColors(d.key); })
                .on('mouseenter mousemove', function(d,i,e) {
                    let key = d.key == 'tech_skills' ? 'Habilidades tecnológicas' : 'Habilidades tecnológicas disruptivas';
                    let sector = e[i].parentNode.classList.value.split(/\s(.*)/s)[1].split('-')[1];
                    //Texto en tooltip
                    let html = `<p class="v_tooltip-title">${country} - ${sector}</p>
                        <p class="v_tooltip-text">${key}: ${d.value}</p>`;
        
                    tooltip.html(html);
    
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
                .transition()
                .duration(2000)
                .attr("y", function(d) { return y_pre(d.value); })
                .attr("height", function(d) { return height - y_pre(d.value); });
        }

        function updateChart(country) {
            let auxData = data.filter(function(d) {
                if (d.Pais == country) {
                    return d;
                }
            });

            chart.selectAll(".slice")
                .data(auxData)
                .enter()
                .append("g")
                .attr("class", "slice")
                .attr("transform", function(d) { return "translate(" + x_pre_0(d['industry_group_name_ES']) + ",0)"; });

            slice.selectAll(".rect")
                .data(function(d) { return columnas.map(function(key) { return {key: key, value: +d[key]}; }); })
                .transition()
                .duration(2000)
                .attr("y", function(d) { return y_pre(d.value); })
                .attr("height", function(d) { return height - y_pre(d.value); });
        }

        //Listener
        selectElement.addEventListener('change', function(e) {
            updateChart(e.target.options[e.target.selectedIndex].value)
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
                .domain(data.map(function(d) { return d.Tipo_ES; }))
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
                        return x_pre(d.Tipo_ES) + (x_pre.bandwidth() / 2) - 15;                                       
                    })            
                    .attr("width", '30px')
                    .on('mouseenter mousemove', function(d,i,e) {
                        //Texto en tooltip
                        let pais = block.node().id == 'v_fig35_1' ? 'Brasil en 2019' : 'Chile en 2018';
                        let html = `<p class="v_tooltip-title">Firmas usando Big Data en ${pais}</p>
                            <p class="v_tooltip-text">${d.Tipo_ES}: ${d.Valor}</p>`;
            
                        tooltip.html(html);
        
                        //Tooltip
                        positionTooltip(window.event, tooltip);
                        getInTooltip(tooltip);
                    })
                    .on('mouseout', function(d,i,e) {
                        //Quitamos el tooltip
                        getOutTooltip(tooltip);
                    })
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

                let subgroups = data.columns.slice(2);
                let tipos = d3.map(data, function(d){return(d.Tipo_ES)}).keys();

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
                    .attr('class', function(d) {
                        return 'group group-' + d.Tipo_ES;
                    })
                    .attr("transform", function(d) { return "translate(" + x_pre(d.Tipo_ES) + ",0)"; })
                    .selectAll("rect")
                    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: +d[key]}; }); })
                    .enter()
                    .append("rect")
                    .attr('class', function(d) {
                        return 'bar bar-' + d.key;
                    })
                    .attr("fill", function(d) { return color(d.key); })
                    .attr("y", function (d) { return y_pre(0); })
                    .attr("x", function(d) { return xSubgroup(d.key); })
                    .attr("width", xSubgroup.bandwidth())
                    .on('mouseenter mousemove', function(d,i,e) {
                        //Texto en tooltip
                        let pais = '', tipo = '', sector = '';

                        if(block.node().id == 'v_fig35_3') {
                            pais = 'Colombia';
                            tipo = d.key == 'proceso_analisis' ? 'Procesos de análisis de datos' : d.key == 'ia' ? 'IA' : 'Big data';
                            sector = e[i].parentNode.classList.value.split(/\s(.*)/s)[1].split('-')[1];
                        } else {
                            pais = 'the EU';
                            tipo = d.key == 'ia_21' ? 'IA (en 2021)' : 'Big data (en 2019)';
                            sector = e[i].parentNode.classList.value.split(/\s(.*)/s)[1].split('-')[1];
                        }

                        let html = `<p class="v_tooltip-title">Firmas usando ${tipo} en ${pais}</p>
                            <p class="v_tooltip-text">${sector} Firmas: ${d.value}</p>`;
            
                        tooltip.html(html);
        
                        //Tooltip
                        positionTooltip(window.event, tooltip);
                        getInTooltip(tooltip);
                    })
                    .on('mouseout', function(d,i,e) {
                        //Quitamos el tooltip
                        getOutTooltip(tooltip);
                    })
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
            .on('mouseenter mousemove', function(d,i,e) {
                //Texto en tooltip
                let html = `<p class="v_tooltip-title">${d.data.Country_ES} (${d.data.Region})</p>
                    <p class="v_tooltip-text">Educación superior en campos de estudio STEM: ${d.data.stem}%</p>
                    <p class="v_tooltip-text">Educación superior en campos de estudio SEM: ${d.data.sem}%</p>
                    <p class="v_tooltip-text">Educación superior en campos de estudio T (TIC): ${d.data.t_tic}%</p>`;
    
                tooltip.html(html);

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d,i,e) {
                //Quitamos el tooltip
                getOutTooltip(tooltip);
            })
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
                .on('mouseenter mousemove', function(d,i,e) {
                    console.log(d); //Coger el nombre del padre > A través de alguna clase CSS
    
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
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
    let chartBlock = d3.select('#v_fig42a'), chart, x_pre_Y, x_pre_T_2010, x_pre_T_2020, x_final_Y, x_final_T_2010, x_final_T_2020, y_pre, y_final, auxColors, slice_2010, slice_2020;
    let width, height, margin = {top: 10, right: 5, bottom: 45, left: 30};
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1639180365&single=true&output=csv';
    d3.csv(url, function(error, data) {
        if (error) throw error;

        let tipos = d3.map(data, function(d) { return d.Type; }).keys();
        tipos = tipos.reverse();
        let tiposEs = ['Sitios','Certificados'];
        let years = ['2010', '2020'];
        let columnas = ['OECD','LAC'];

        width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
        height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

        chart = chartBlock
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        //Eje X - Años
        x_pre_Y = d3.scaleBand()
            .range([0, width])
            .domain(years);

        x_final_Y = function(g){
            g.call(d3.axisBottom(x_pre_Y));
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        //Eje X - Tipos
        x_pre_T_2010 = d3.scaleBand()
            .range([x_pre_Y.bandwidth(), 0])
            .paddingInner(0.25)
            .paddingOuter(0.5)
            .domain(tipos);

        x_final_T_2010 = function(g){
            g.call(d3.axisBottom(x_pre_T_2010));
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        x_pre_T_2020 = d3.scaleBand()
            .range([width, x_pre_Y.bandwidth()])
            .paddingInner(0.25)
            .paddingOuter(0.5)
            .domain(tipos);

        x_final_T_2020 = function(g){
            g.call(d3.axisBottom(x_pre_T_2020));
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + (height + 20) + ")")
            .call(x_final_Y);

        chart.append("g")
            .attr("transform", "translate(0," + (height) + ")")
            .call(x_final_T_2010);

        chart.append("g")
            .attr("transform", "translate(0," + (height) + ")")
            .call(x_final_T_2020);

        //Eje Y
        y_pre = d3.scaleLinear()
            .domain([0, 1])
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

        auxColors = d3.scaleOrdinal()
            .range([colors[0], colors[1]])
            .domain(columnas);

        //Diferenciar datos para 2010 y 2020
        let auxData_2010 = data.filter(function(d) {
            if (d.Year == '2010') {
                return d;
            }
        });
        
        let auxData_2020 = data.filter(function(d) {
            if(d.Year == '2020') {
                return d;
            }
        });

        //Inicialización
        slice_2010 = chart.selectAll(".slice")
            .data(auxData_2010)
            .enter()
            .append("g")
            .attr("class", function(d) {
                return "slice-2010-" + d.Type;
            })
            .attr("transform", function(d) { return "translate(" + x_pre_T_2010(d['Type']) + ",0)"; });

        slice_2010.selectAll("rect")
            .data(function(d) { return columnas.map(function(key) { return {key: key, value: +d[key]}; }); })
            .enter()
            .append("rect")
            .attr('class', function(d) {
                return 'group-2010-' + d.key;
            })
            .attr("x", function(d, i) { 
                if(i == 0) {
                    return x_pre_T_2010.bandwidth() / 8;
                } else {
                    return (x_pre_T_2010.bandwidth() / 2) + (x_pre_T_2010.bandwidth() / 8);
                }
            })
            .attr("y", function(d) { return y_pre(0); })
            .attr("width", x_pre_T_2010.bandwidth() / 4)
            .attr("height", function(d) { return height - y_pre(0); })
            .attr("fill", function(d) { return auxColors(d.key); })
            .on('mouseenter mousemove', function(d,i,e) {
                //Texto en tooltip
                let tipo = e[i].parentNode.classList.value.split('-')[2];
                tipo = tipo == 'Sites' ? 'Sitios' : 'Certificados';
                let html = `<p class="v_tooltip-title">${d.key} en 2010</p>
                    <p class="v_tooltip-text">${tipo}: ${d.value}</p>`;
    
                tooltip.html(html);

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d,i,e) {
                //Quitamos el tooltip
                getOutTooltip(tooltip);
            })
            .transition()
            .duration(2000)
            .attr("y", function(d) { return y_pre(d.value); })
            .attr("height", function(d) { return height - y_pre(d.value); });

        slice_2020 = chart.selectAll(".slice_2")
            .data(auxData_2020)
            .enter()
            .append("g")
            .attr("class", function(d) {
                return "slice-2020-" + d.Type;
            })
            .attr("transform", function(d) { return "translate(" + x_pre_T_2020(d['Type']) + ",0)"; });

        slice_2020.selectAll("rect")
            .data(function(d) { return columnas.map(function(key) { return {key: key, value: +d[key]}; }); })
            .enter()
            .append("rect")
            .attr('class', function(d) {
                return 'group-2020-' + d.key;
            })
            .attr("x", function(d, i) { 
                if(i == 0) {
                    return x_pre_T_2020.bandwidth() / 8;
                } else {
                    return (x_pre_T_2020.bandwidth() / 2) + (x_pre_T_2020.bandwidth() / 8);
                }
            })
            .attr("y", function(d) { return y_pre(0); })
            .attr("width", x_pre_T_2020.bandwidth() / 4)
            .attr("height", function(d) { return height - y_pre(0); })
            .attr("fill", function(d) { return auxColors(d.key); })
            .on('mouseenter mousemove', function(d,i,e) {
                //Texto en tooltip
                let tipo = e[i].parentNode.classList.value.split('-')[2];
                tipo = tipo == 'Sites' ? 'Sitios' : 'Certificados';
                let html = `<p class="v_tooltip-title">${d.key} en 2020</p>
                    <p class="v_tooltip-text">${tipo}: ${d.value}</p>`;
    
                tooltip.html(html);

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d,i,e) {
                //Quitamos el tooltip
                getOutTooltip(tooltip);
            })
            .transition()
            .duration(2000)
            .attr("y", function(d) { return y_pre(d.value); })
            .attr("height", function(d) { return height - y_pre(d.value); });
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
            .on('mouseenter mousemove', function(d,i,e) {
                //Texto en tooltip
                let html = `<p class="v_tooltip-title">${d.data.Country_ES} in ${d.data.Year}</p>
                    <p class="v_tooltip-text">Certificados: ${d.data.certificates}</p>
                    <p class="v_tooltip-text">Sitios: ${d.data.sites}</p>
                    <p class="v_tooltip-text">Suma de ambos: ${parseInt(d.data.certificates)+parseInt(d.data.sites)}</p>`;
    
                tooltip.html(html);

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d,i,e) {
                //Quitamos el tooltip
                getOutTooltip(tooltip);
            })
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
                .data(function(d) { return d; })
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
    //Variables
    let chartBlock = d3.select('#v_fig48a'), chart, x_pre, x_final, y_pre, y_final;
    let width, height, margin = {top: 10, right: 10, bottom: 20, left: 145};
    let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmJKRvDm4iWZrbYtr2eFi0uQYcV3czLLDugi7M5V3slFP8PJDPHDKyK1Rql6lPUQVMO0AZ8zRk5H6/pub?gid=1162998583&single=true&output=csv';
    let selectElement = document.getElementById('select_48a');
    
    d3.csv(url, function(error, data) {
        if (error) throw error;

        data = data.reverse();
        
        width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
        height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

        chart = chartBlock
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        //Eje X
        x_pre = d3.scaleLinear()
            .domain([0,1])
            .range([0, width]);

        x_final = function(g){
            g.call(d3.axisBottom(x_pre).ticks(5))
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
        
        //Eje Y
        y_pre = d3.scaleBand()
            .domain(data.map(function(d) { return d.Type; }))
            .range([height, 0]);

        y_final = function(svg){
            svg.call(d3.axisLeft(y_pre).tickFormat(function(d) { return d; }))
            svg.call(function(g){g.selectAll('.tick line').remove()})
            svg.call(function(g){g.select('.domain').remove()});
        }        
        
        chart.append("g")
            .call(y_final);

        //Primeros datos > Argentina
        let country = 'Argentina';
        initChart(country);

        function initChart(country) {
            chart.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr('class', function(d, i) { return `bar bar-${i}`; })
                .style('fill', colors[0])
                .attr("x", x_pre(0) )
                .attr("y", function(d) { return y_pre(d.Type) + y_pre.bandwidth() / 4; })
                .attr("width", x_pre(0))
                .attr("height", y_pre.bandwidth() / 2)
                .on('mouseenter mousemove', function(d,i,e) {
                    let html = '';

                    console.log(country);

                    if(country == 'Argentina') {
                        html = `<p class="v_tooltip-title">Comparando ${d.Type} entre países</p>
                        <p class="v_tooltip-text"><b>Argentina: ${d.Argentina}</b></p>
                        <p class="v_tooltip-text">Brasil: ${d.Brasil}</p>
                        <p class="v_tooltip-text">Chile: ${d.Chile}</p>
                        <p class="v_tooltip-text">Colombia: ${d.Colombia}</p>
                        <p class="v_tooltip-text">México: ${d.Mexico}</p>`
                    } else if (country == 'Brazil') {
                        html = `<p class="v_tooltip-title">Comparando ${d.Type} entre países</p>
                        <p class="v_tooltip-text">Argentina: ${d.Argentina}</p>
                        <p class="v_tooltip-text"><b>Brasil: ${d.Brasil}</b></p>
                        <p class="v_tooltip-text">Chile: ${d.Chile}</p>
                        <p class="v_tooltip-text">Colombia: ${d.Colombia}</p>
                        <p class="v_tooltip-text">México: ${d.Mexico}</p>`
                    } else if (country == 'Chile') {
                        html = `<p class="v_tooltip-title">Comparando ${d.Type} entre países</p>
                        <p class="v_tooltip-text">Argentina: ${d.Argentina}</p>
                        <p class="v_tooltip-text">Brasil: ${d.Brasil}</p>
                        <p class="v_tooltip-text"><b>Chile: ${d.Chile}</b></p>
                        <p class="v_tooltip-text">Colombia: ${d.Colombia}</p>
                        <p class="v_tooltip-text">México: ${d.Mexico}</p>`
                    } else if (country == 'Colombia') {
                        html = `<p class="v_tooltip-title">Comparando ${d.Type} entre países</p>
                        <p class="v_tooltip-text">Argentina: ${d.Argentina}</p>
                        <p class="v_tooltip-text">Brasil: ${d.Brasil}</p>
                        <p class="v_tooltip-text">Chile: ${d.Chile}</p>
                        <p class="v_tooltip-text"><b>Colombia: ${d.Colombia}</b></p>
                        <p class="v_tooltip-text">Mexico: ${d.Mexico}</p>`
                    } else {
                        html = `<p class="v_tooltip-title">Comparando ${d.Type} entre países</p>
                        <p class="v_tooltip-text">Argentina: ${d.Argentina}</p>
                        <p class="v_tooltip-text">Brasil: ${d.Brasil}</p>
                        <p class="v_tooltip-text">Chile: ${d.Chile}</p>
                        <p class="v_tooltip-text">Colombia: ${d.Colombia}</p>
                        <p class="v_tooltip-text"><b>México: ${d.Mexico}</b></p>`
                    }

                    tooltip.html(html);
    
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
                .transition()
                .duration(2000)
                .attr("width", d => Math.abs(x_pre(d[country]) - x_pre(0)))
        }

        function updateChart(country) {
            chart
                .selectAll(".bar")
                .data(data)
                .transition()
                .duration(1500)    
                .attr('width', d => Math.abs(x_pre(d[country]) - x_pre(0)));
        }

        //Listener
        selectElement.addEventListener('change', function(e) {
            updateChart(e.target.options[e.target.selectedIndex].value)
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
        for(let i = 0; i < nestedData.length; i++) {
            chart.selectAll('.circles')
                .data(nestedData[i].data)
                .enter()
                .append('circle')
                .attr('class', `circle-${nestedData[i].key}`)
                .attr("r", 7)
                .attr("cx", function(d) { return x_pre(d.Year) + x_pre.bandwidth() / 2; })
                .attr("cy", function(d) { return y_pre(+d.value); })
                .style("fill", 'transparent')
                .style("stroke-width", '2')
                .style("stroke", '#105099')
                .style('opacity', '0')
                .on('mouseenter mousemove', function(d,i,e) {
                    //Texto en tooltip
                    let pais = e[i].classList.value.split('-')[1];
                    pais = pais = 'Brazil' ? 'Brasil' : pais;
                    let html = `<p class="v_tooltip-title">${pais} en ${d.Year}</p>
                        <p class="v_tooltip-text">Número de unicornios: ${d.value}</p></p>`;

                    this.style.opacity = '1';

                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);

                    this.style.opacity = '0';
                });
        }
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