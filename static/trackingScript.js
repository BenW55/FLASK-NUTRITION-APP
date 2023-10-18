    // setup 
    var myform = document.getElementById("calWeight");
    const cal = JSON.parse(localStorage.getItem("cal") || "[]");
    const weight = JSON.parse(localStorage.getItem("weight") || "[]");
    const time = JSON.parse(localStorage.getItem("time") || "[]");
    myform.addEventListener("submit", updateChart);
    const data = {
      labels: time,
      datasets: [{
        label: 'Calories',
        data: cal,
        backgroundColor:
          'rgba(255, 26, 104, 0.2)',
        borderColor:
          'rgba(255, 26, 104, 1)',
        borderWidth: 1,
        yAxisID: 'y'
      },{
        label: 'Weight',
        data: weight,
        backgroundColor: 
          'rgba(120, 26, 75, 0.2)',
        borderColor:
          'rgba(124, 12, 104, 1)',
        borderWidth: 1,
        yAxisID: 'weight'
      }]
    };

    // config 
    const config = {
      type: 'line',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear',
            position: 'left'
          },
          weight:{
            beginAtZero: true,
            type: 'linear',
            position: 'right',
            grid: {
                drawOnChartArea: false
            }
          }
        }
      }
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    // Instantly assign Chart.js version
    const chartVersion = document.getElementById('chartVersion');
    
    
    function updateChart(event)
    {
            event.preventDefault();
        var myForm = document.getElementById("calWeight");
        var formData = new FormData(myForm);
        var calWeight = {};
        // Get iterators for keys and values
        const keys = formData.keys();
        const values = formData.values();

        formData.forEach(function(value, key) {
            calWeight[key] = value;
        });
        cal.push(calWeight["cal"]);
        localStorage.setItem("cal", JSON.stringify(cal));
        weight.push(calWeight["weight"]);
        localStorage.setItem("weight", JSON.stringify(weight));
        let date = document.querySelector('#dateInput');
        let day = new Date(date.value);
        let stringDay = day.toString();
        let stringDayArray = stringDay.split(" ");

        time.push(stringDayArray[1] +" " +  stringDayArray[2] + " " + stringDayArray[3]);
        localStorage.setItem("time", JSON.stringify(time));
        myChart.update();
    }