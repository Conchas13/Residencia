var TotalG;

/*en caunto la pag se cargue muestras la grafica o los datos*/
$(document).ready(function () {
    grafica();
    getTotalPoblacion();
    getTotalPoblacionPcP();
});

function getTotalPoblacion(){
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var Total = response.data.Series[0].OBSERVATIONS[0].OBS_VALUE;
           /* console.log(numeral(Total).format('0,0'));*/
            $("#Total").text(numeral(Total).format('0,0'));
            TotalG = Total;
        });
} 

function getTotalPoblacionPcP() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/6206972690/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var Total = response.data.Series[0].OBSERVATIONS[0].OBS_VALUE;
            //console.log(Total);
            $("#TotalPcP").text(numeral(Total / 100).format('0.00 %')); 
            var TotalPc = (TotalG * Total) / 100;
            $("#TotalPc").text(numeral(TotalPc).format('0,0'));
        });
} 



function grafica() {
    var options = {
        series: [{
            name: 'Población.',
            data: [44, 55, 41, 67, 22, 43]
        }, {
            name: 'Población que cuenta con Pc en sus hogares.',
            data: [13, 23, 20, 8, 13, 27]
        
        }],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        xaxis: {
            type: 'datetime',
            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                '01/05/2011 GMT', '01/06/2011 GMT'
            ],
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}


