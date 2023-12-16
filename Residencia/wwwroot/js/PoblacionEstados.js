var TotalG;
var ArrayTotal = [];
var ArrayTotalPc = [];
var ArrayAñosTotal = [];
var ArrayAñosTotalPc = [];
var SelectedEstado ='07000001';
var chart1;
var firsttime = true;

/*en cuanto la pág se cargue muestras la grafica o los datos*/
$(document).ready(function () {
    //grafica();
    getTotalPoblacion(SelectedEstado);
    //getTotalPoblacionPcP();
    
    getEstados();
    $('#selEsta').select2();

    $('#selEsta').on('change', function () {
        var Estado = $('#selEsta').val();
        getTotalPoblacion(Estado); getTotalPA(Estado);
    });
});

//Poblacion en general de México
function getTotalPoblacion(Estado) {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var Total = response.data.Series[0].OBSERVATIONS[0].OBS_VALUE;
            /* console.log(numeral(Total).format('0,0'));*/
            $("#Total").text(numeral(Total).format('0,0'));
            TotalG = Total;

            getTotalPoblacionPcP(Total,Estado);
        });
}

//Poblacion total por Estado
function getTotalPoblacionPcP(PoblacionMexico, Estado) {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/' + Estado + '/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var Total = response.data.Series[0].OBSERVATIONS[0].OBS_VALUE;
            //console.log(Total);
            var TotalPc = (Total) / PoblacionMexico;
            $("#TotalPcP").text(numeral(TotalPc).format('0.00 %'));
            //console.log(TotalPc)
            //console.log(Total)
            //console.log(PoblacionMexico)
            $("#TotalPc").text(numeral(Total).format('0,0'));

            getTotalPA(Estado);
        });
}

//Población en general de México (varios años)
function getTotalPA(Estado) {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/false/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var PoblacionTotal = response.data.Series[0].OBSERVATIONS;
            ArrayAñosTotal = PoblacionTotal.map((x) => x.TIME_PERIOD);
            //console.log(PoblacionTotal);
            ArrayTotal = PoblacionTotal.map((x) => x.OBS_VALUE);


            getTotalPAPc(Estado);

        });

}

//Poblacion total por Estado (varios años)
function getTotalPAPc(Estado) {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/' + Estado + '/false/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
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
//Donde se crean las funciones de la grafica 
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

    console.log(a1);
    console.log(a2);
    console.log(res);

    //for (var i = 0; i < a1.length; i++) {
    //    if (a2[i] == 0) {
    //        a3.push(0);
    //    }
    //    else {
    //        if (a1[i] != 0) {
    //            a3.push((a2[i] * a1[i]) / 100)
    //        }
    //        else {
    //            a3.push((a2[i] * 126014024) / 100)
    //        }
    //    }
    //}
    //console.log(a3);

    if (firsttime) {
        grafica(a1, a2, res);
        firsttime = false;
    }
    else {
        chart1.updateSeries([{
            name: 'Población.',
            data: a1
        }, {
            name: 'Población por Estado.',
            data: a2
        }])
    }

    
}


//Grafica general de México
function grafica(Poblacion, PoblacionPc, Titulos) {


    $('#chat').html('');

    var options = {
        series: [{
            name: 'Población.',
            data: Poblacion
        }, {
            name: 'Población por Estado.',
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

    //Aqui es donde se le da el nombre a la grafica para poder ser llamada 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart1 = chart;
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

//Donde se optienen los estados
function getEstados() {
    axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/CL_GEO_AREA/null/es/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(function (response) {
            var data = response.data.CODE;
            //console.log(data);
            DropDownConstructor(data, 'selEsta')

        });
}


