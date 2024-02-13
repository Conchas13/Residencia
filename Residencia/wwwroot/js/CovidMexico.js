var url = 'https://localhost:7235/APICovid/API/2';

var TotalG;
var TotalIf;
var TotalFalle;


$(document).ready(function () {
    HoldOn.open(optionsl);
    getTotalPoblacion();
    getAPISexo();
    getAPIEdad();
    getAPI2();
    getAPIEstados();
    getAPIOEnfer();
    getAPIEmbarazadas();
    getAPIIntubados();
    getAPIInstitucion();
    
});

//--------------------------------------Primeros 3 Recuadros--------------------------------------

//Poblacion en general de México
function getTotalPoblacion() {

    fetch('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json')
        .then(response => response.json())
        .then(data => {
            var Total = data.Series[0].OBSERVATIONS[0].OBS_VALUE;
            /* console.log(numeral(Total).format('0,0')); */
            $("#Total").text(numeral(Total).format('0,0'));
            TotalG = Total;

            getAPI();
        })
        .catch(error => console.error('Error:', error));

}

//Optener los datos de la API que cree
function getAPI() {
    //    axios.get('https://localhost:7235/APICovid', {
    //        headers: {
    //            "Cache-Control": "no-cache",
    //            "Content-Type": "application/x-www-form-urlencoded",
    //        },
    //})
    //        .then(function (response) {
    //            var Total = JSON.parse(response);
    //            //.Series[0].OBSERVATIONS[0].OBS_VALUE
    //            /* console.log(numeral(Total).format('0,0'));*/
    //            //$("#Total").text(numeral(Total).format('0,0'));
    //            //TotalG = Total;
    //            //getTotalPoblacionPcP(Total);
    //            console.log(Total);
    //        });
    ///-------------------------Otro metodo diferente------------------------------------------------
    Fetch('/home/GetInfectados', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total[0].TotalInfectados);
                $("#TotalIf").text(numeral(Total[0].TotalInfectados).format('0,0'));
                TotalIf = Total[0].TotalInfectados;

                getTotalPoblacionIfP();

            }
            catch (err) {
                alert(err);
            }
        }
    )
    ///-------------------------Otro metodo diferente------------------------------------------------
    //$.ajax({
    //    dataType: 'json',
    //    type: "GET",
    //    url: url,
    //    cors: true,
    //    contentType: 'application/json',
    //    secure: true,
    //    headers: {
    //        'Access-Control-Allow-Origin': '*',
    //    },
    //    //beforeSend: function (xhr) {
    //    //    xhr.setRequestHeader("Authorization", "Basic " + btoa(""));
    //    //},
    //    success: function (data) {
    //        console.log(data);
    //        console.log("Hola")
    //    },
    //    error: function (data) {
    //        console.log(data);
    //        console.log("Adios")
    //    } 
    //});
}


//Porcentaje de la población en México Infectada
function getTotalPoblacionIfP() {

    var Op = (TotalIf * 100) / TotalG;

    $("#TotalIfP").text(numeral(Op).format('0.00 %'));


}


//--------------------------------------Grafica Infectados--------------------------------------
function GraficaSexo(h, m) {

    var options1 = {
        series: [h, m],
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: ["Hombres", "Mujeres"],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        title: {
            text: "Personas infectadas por COVID-19"
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: false
        },
         colors: ["#1f77b4", "#ff69b4"],
    };
    //Aqui es donde se le da el nombre a la grafica para poder ser llamada 
    var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();
}

function getAPISexo() {
    Fetch('/home/GetSexo', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total);
                var h, m;
                h = Total[0].TotalPersonasInfectadas;
                m = Total[1].TotalPersonasInfectadas;

                GraficaSexo(h, m);
            }
            catch (err) {
                alert(err);
            }
        }
    )
}


//--------------------------------------Grafica de edades--------------------------------------
function GraficaEdad(t,v) {
    var options2 = {
        series: [{
            data: v
        }],
        chart: {
            height: 350,
            width: 6000,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        //colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: "Edades de las personas infectadas por COVID-19"
        },
        legend: {
            show: false
        },
        xaxis: {
            categories:
               t,
            labels: {
                style: {
                    //colors: colors,
                    fontSize: '12px'
                }
            }
        }
    };

    var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();

}


function getAPIEdad() {
    Fetch('/home/GetEdad', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total);
                var title = [], value = [];
                for (var i = 0; i < Total.length; i++) {
                    title.push(Total[i].EdadNumerica)
                    value.push(Total[i].TotalPersonasInfectadas)
                }
                //h = Total[0].TotalPersonasInfectadas;
                //m = Total[1].TotalPersonasInfectadas;

                GraficaEdad(title, value);
            }
            catch (err) {
                alert(err);
            }
        }
    )
}


//--------------------------------------Segundos 3 Recuadros--------------------------------------

//Poblacion en general de México
function getAPI2() {

    Fetch('/home/GetInfectados', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total[0].TotalInfectados);
                $("#TotalIf2").text(numeral(Total[0].TotalInfectados).format('0,0'));
                TotalIf = Total[0].TotalInfectados;

                getAPIFallecidos();

            }
            catch (err) {
                alert(err);
            }
        }
    )
}

//Optener los datos de la API que cree
function getAPIFallecidos() {
    
    Fetch('/home/GetFallecidos', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total[0].Fallecidos);
                $("#TotalFa").text(numeral(Total[0].Fallecidos).format('0,0'));
                TotalFalle = Total[0].Fallecidos;

                getAPIFallecidosP();

            }
            catch (err) {
                alert(err);
            }
        }
    )
}


//Porcentaje de la población en México Infectada 
function getAPIFallecidosP() {

    var Op = (TotalFalle) / TotalIf;

    $("#TotalFP").text(numeral(Op).format('0.00 %'));


}




//--------------------------------------Grafica de infectados por Estado--------------------------------------

function GraficaEstados(t, v) {

    var options3 = {
        series: [{
            data: v
        }],
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        //colors: colors,
        title: {
            text: "Cantidad de infectados por Estado"
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: t,
            labels: {
                style: {
                    //colors: colors,
                    fontSize: '12px'
                }
            }
        }
    };

    var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart3.render();
}


function getAPIEstados() {
    Fetch('/home/GetEstados', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total);
                var title = [], value = [];
                for (var i = 0; i < Total.length; i++) {
                    title.push(Total[i].Estado)
                    value.push(Total[i].TotalPersonasInfectadas)
                }

                GraficaEstados(title, value);
            }
            catch (err) {
                alert(err);
            }
        }
    )
}

//--------------------------------------Grafica de Enfermedades--------------------------------------

function GraficaOEnfer(Ne, Di, Ep, As, In, Hi, Oc, Ca, Ob, Re, Ta) {
    var options4 = {
        series: [Ne, Di, Ep, As, In, Hi, Oc, Ca, Ob, Re, Ta],
        chart: {
            width: '100%',
            type: 'donut',
        },
        labels: ["Neumonia", "Diabetes", "EPOC", "Asma", "Inmunosupresion", "Hipertension", "OtraConmorbilidad", "Cardiovascular", "Obesidad", "RenalCronica","Tabaquismo"],
        title: {
            text: "Personas infectadas con otras enfermedades"
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
    chart4.render();

}


function getAPIOEnfer() {
    Fetch('/home/GetOEnfer', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total[0].Neumonia);

                var Ne, Di, Ep, As, In, Hi, Oc, Ca, Ob, Re, Ta;
                
                Ne = Total[0].Neumonia;
                Di = Total[0].Diabetes;
                Ep = Total[0].EPOC;
                As = Total[0].Asma;
                In = Total[0].Inmunosupresion;
                Hi = Total[0].Hipertension;
                Oc = Total[0].OtraComorbilidad;
                Ca = Total[0].Cardiovascular;
                Ob = Total[0].Obesidad;
                Re = Total[0].RenalCronica;
                Ta = Total[0].Tabaquismo;

                //console.log(Ne, Di, Ep, As, In, Hi, Oc, Ca, Ob, Re, Ta);
                    GraficaOEnfer(Ne, Di, Ep, As, In, Hi, Oc, Ca, Ob, Re, Ta);
            }
            catch (err) {
                alert(err);
            }
        }
    )
}



//--------------------------------------Grafica de Embarazadas--------------------------------------

function GraficaEmbarazadas(s,n) {
    var options5 = {
        series: [s,n],
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: ["Embarazadas", "No Embarazadas"],
        colors: ["#ff69b4", "#9c29b7"],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        title: {
            text: "Población infectadas embarazada"
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: false
        }
    };

    //Aqui es donde se le da el nombre a la grafica para poder ser llamada 
    var chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
    chart5.render();

}


function getAPIEmbarazadas() {
    Fetch('/home/GetEmbarazadas', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total);
                var s, n;
                s = Total[0].Embarazadas;
                n = Total[0].NoEmbarazadas;

                GraficaEmbarazadas(s, n);
            }
            catch (err) {
                alert(err);
            }
        }
    )
}

//--------------------------------------Grafica Intubados--------------------------------------

function GraficaIntubados(i, ni, /*noai*/) {

    var options6 = {
        series: [i, ni, /*noai*/],
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: ["Intubados", "No Intubados", "No Aplica Intubación"],
        colors: ["#1f77b4", "#bb285c"],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        title: {
            text: "Personas infectadas con COVID-19 intubadas"
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: false
        }
    };

    //Aqui es donde se le da el nombre a la grafica para poder ser llamada 
    var chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
    chart6.render();

}

function getAPIIntubados() {
    Fetch('/home/GetIntubados', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total)
                var i, ni, noai;
                i = Total[0].Intubados;
                ni = Total[0].NoIntubados;
                //noai = Total[0].NoAplicaIntubacion

                GraficaIntubados(i, ni, /*noai*/);
            }
            catch (err) {
                alert(err);
            }
        }
    )
}

//--------------------------------------Grafica de Institucion--------------------------------------

function GraficaInstitucion(t, v) {

    var options7 = {
        series: [{
            data: v
        }],
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        //colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        title: {
            text: "Institución medica que antendió al infectado"
        },
        xaxis: {
            categories: t,
            labels: {
                style: {
                    //colors: colors,
                    fontSize: '12px'
                }
            }
        }
    };

    var chart7 = new ApexCharts(document.querySelector("#chart7"), options7);
    chart7.render();

}


function getAPIInstitucion() {
    Fetch('/home/GetInstitucion', {

    },
        function (response) {
            try {
                var Total = response;
                //console.log(Total);
                var title = [], value = [];
                for (var i = 0; i < Total.length; i++) {
                    title.push(Total[i].InstitucionMedica)
                    value.push(Total[i].TotalPersonasInfectadas)
                }
                
                GraficaInstitucion(title, value);

                HoldOn.close();
            }
            catch (err) {
                alert(err);
            }
        }
    )
}

//---------------------------------------------------------------------------------------------------
function Fetch(Ruta, Parametros, OnComplete, ReturnJson = true) {
    //  Ruta:       Metodo al que se quiere llegar (url); si esta en otro controlador diferente a la vista especificar controlador (Home/Metodo)
    //  Parametros: Objeto a enviar al metodo (las propiedades deben tener el mismo nombre que los parametros del metodo)
    //  OnComplete: Funcion a realizar con el resultado
    //  ReturnJson: Convierte la respuesta en json

    fetch(Ruta, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Parametros)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                throw "Error en la llamada";
            }
        })
        .then(function (response) {
            try {
                if (response == "")
                    response = "[]"
                if (ReturnJson) {
                    var data = JSON.parse(response);
                    OnComplete(data);
                }
                else {
                    OnComplete(response);
                }
            } catch (e) {
                console.log(e.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


//namespace Residencia.wwwroot.js
//{
//    public class CovidMexico
//    {
//    }
//}
