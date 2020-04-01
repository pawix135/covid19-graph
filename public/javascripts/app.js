let button = $("#getNewData");
let countires = $("#countries");

let ctx = document.getElementById("corona").getContext("2d");
let graph = (myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Liczba potwierdzonych",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  }
}));

$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: "/getcountires",
    success: function(data) {
      data.forEach(element => {
        $(countires).append(`<option value='${element}'>${element}</option>`);
      });
    }
  });
});

$(button).click(() => {
  let country = { country: countires.val() };
  $.ajax({
    method: "GET",
    url: "/getdata",
    data: country,
    success: function(data) {
      let labels = [];
      let confirmed = [];
      let bgcolors = [];
      let bordercolors = [];

      data.forEach(element => {
        if (element.confirmed != 0) {
          labels.push(element.date);
          confirmed.push(element.confirmed);
          bgcolors.push(random_rgba());
          bordercolors.push(random_rgba());
        }
      });

      updateGraph(graph, labels, confirmed, bgcolors, bordercolors);
    }
  });
});

function updateGraph(graph, labels, confirmed, bgcolors, bordercolors) {
  graph.type = "bar";
  graph.data.labels = labels;
  graph.data.datasets[0].labels = labels;
  graph.data.datasets[0].data = confirmed;
  graph.data.datasets[0].backgroundColor = bgcolors;
  graph.data.datasets[0].borderColor = bordercolors;
  graph.data.datasets[0].borderWidth = 1;

  graph.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach(dataset => {
    dataset.data.pop();
  });
  chart.update();
}

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
}
