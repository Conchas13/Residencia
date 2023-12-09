var TotalG;
var ArrayTotal = [];
var ArrayTotalPc = [];
var ArrayAñosTotal = [];
var ArrayAñosTotalPc = [];

/*en caunto la pag se cargue muestras la grafica o los datos*/
$(document).ready(function () {
    //grafica();
    getTotalPoblacion();
    //getTotalPoblacionPcP();
    //getTotalPA();
    getEstados();
    $('#selEsta').select2();

    $('#selEsta').on('change', function () {
        alert($('#selEsta').val());
    });
});

//Poblacion en general de México
function getTotalPoblacion() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var Total = response.data.Series[0].OBSERVATIONS[0].OBS_VALUE;
            /* console.log(numeral(Total).format('0,0'));*/
            $("#Total").text(numeral(Total).format('0,0'));
            TotalG = Total;

            getTotalPoblacionPcP();
        });
}

//Porcentaje de la población en México con Pc
function getTotalPoblacionPcP() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/6206972690/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var Total = response.data.Series[0].OBSERVATIONS[0].OBS_VALUE;
            //console.log(Total);
            $("#TotalPcP").text(numeral(Total / 100).format('0.00 %'));
            var TotalPc = (TotalG * Total) / 100;
            $("#TotalPc").text(numeral(TotalPc).format('0,0'));

            getTotalPA();
        });
}

//Población en general de México (varios años)
function getTotalPA() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/false/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var PoblacionTotal = response.data.Series[0].OBSERVATIONS;
            ArrayAñosTotal = PoblacionTotal.map((x) => x.TIME_PERIOD);
            //console.log(PoblacionTotal);
            ArrayTotal = PoblacionTotal.map((x) => x.OBS_VALUE);


            getTotalPAPc();

        });

}

//Población de la población en México con Pc (varios años)
function getTotalPAPc() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/6206972690/es/0700/false/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var PoblacionTotalPc = response.data.Series[0].OBSERVATIONS;
            ArrayAñosTotalPc = PoblacionTotalPc.map((x) => x.TIME_PERIOD)
            //console.log(ArrayAñosTotalPc);
            ArrayTotalPc = PoblacionTotalPc.map((x) => x.OBS_VALUE);
            configuraciongrafica();
        });

}

function removeDuplicates(inArray) {
    var arr = inArray.concat() // create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for (var i = 0; i < arr.length; ++i) {
        //create the second cycle of the loop from element n+1
        for (var j = i + 1; j < arr.length; ++j) {
            //if the two elements are equal , then they are duplicate
            if (arr[i] === arr[j]) {
                arr.splice(j, 1); //remove the duplicated element 
            }
        }
    }
    return arr;
}

function configuraciongrafica() {
    var Mezcla = ArrayAñosTotal.concat(ArrayAñosTotalPc);
    var res = removeDuplicates(Mezcla).toSorted();
    var a1 = [], a2 = [], a3 = [];
    //console.log(res);

    for (var i = 0; i < res.length; i++) {

        var c1 = false, c2 = false;



        for (var j = 0; j < ArrayAñosTotal.length; j++) {
            if (res[i] == ArrayAñosTotal[j]) {
                a1.push(parseFloat(ArrayTotal[j]));
                c1 = true;
            }
        }
        if (!c1) {
            a1.push(0);
        }

        for (var k = 0; k < ArrayAñosTotalPc.length; k++) {
            if (res[i] == ArrayAñosTotalPc[k]) {
                a2.push(parseFloat(ArrayTotalPc[k]));
                c2 = true;
            }
        }
        if (!c2) {
            a2.push(0);
        }
    }

    //console.log(a1);
    //console.log(a2);

    for (var i = 0; i < a1.length; i++) {
        if (a2[i] == 0) {
            a3.push(0);
        }
        else {
            if (a1[i] != 0) {
                a3.push((a2[i] * a1[i]) / 100)
            }
            else {
                a3.push((a2[i] * 126014024) / 100)
            }
        }
    }
    //console.log(a3);

    grafica(a1, a3, res);
}


//Grafica general de México
function grafica(Poblacion, PoblacionPc, Titulos) {
    //var options = {
    //    series: [{
    //        name: 'Población.',
    //        data: [44, 55, 41, 67, 22, 43]
    //    }, {
    //        name: 'Población que cuenta con Pc en sus hogares.',
    //        data: [13, 23, 20, 8, 13, 27]

    //    }],
    //    chart: {
    //        type: 'bar',
    //        height: 350,
    //        stacked: true,
    //        toolbar: {
    //            show: true
    //        },
    //        zoom: {
    //            enabled: true
    //        }
    //    },
    //    responsive: [{
    //        breakpoint: 480,
    //        options: {
    //            legend: {
    //                position: 'bottom',
    //                offsetX: -10,
    //                offsetY: 0
    //            }
    //        }
    //    }],
    //    plotOptions: {
    //        bar: {
    //            horizontal: false,
    //            borderRadius: 10,
    //            dataLabels: {
    //                total: {
    //                    enabled: true,
    //                    style: {
    //                        fontSize: '13px',
    //                        fontWeight: 900
    //                    }
    //                }
    //            }
    //        },
    //    },
    //    xaxis: {
    //        type: 'datetime',
    //        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
    //            '01/05/2011 GMT', '01/06/2011 GMT'
    //        ],
    //    },
    //    legend: {
    //        position: 'right',
    //        offsetY: 40
    //    },
    //    fill: {
    //        opacity: 1
    //    }
    //};

    var options = {
        series: [{
            name: 'Población.',
            data: Poblacion
        }, {
            name: 'Población que cuenta con Pc en sus hogares.',
            data: PoblacionPc
        }],
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'category',
            categories: Titulos
        },
        //tooltip: {
        //    x: {
        //        format: 'dd/MM/yy HH:mm'
        //    },
        //},
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}




//Construir selec de manera automatica 
function DropDownConstructor(datosJson, targetSelect) {
    $('#' + targetSelect).empty();

    for (var i = 0; i < datosJson.length; i++) {
        if (datosJson[i].value.length == 8) {
            $('#' + targetSelect).append($('<option>', { value: datosJson[i].value, text: datosJson[i].Description }));
        }

    }

    //$('#' + targetSelect).val('-1');
}

//
function getEstados() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/CL_GEO_AREA/null/es/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var data = response.data.CODE;
            //console.log(data);
            DropDownConstructor(data, 'selEsta')

        });
}


