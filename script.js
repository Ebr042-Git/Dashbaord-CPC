const sheetURL = "https://script.google.com/macros/s/AKfycbyRvvLmZg1zzfGsgFb8XVUApclToxCH1ZyqVG0jlWntK94V_TZWcXq_j-uL-WGLtpK6Gw/exec";

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    let labels = [];
    let progressValues = [];

    data.forEach(item => {
      const task = item["Task"];
      const percent = Number(item["Completed %"]) || 0;

      labels.push(task);
      progressValues.push(percent);

      taskContainer.innerHTML += `
        <div>
          <h3>${task}</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${percent}%"></div>
          </div>
          <p>${percent}% Complete</p>
        </div>
      `;
    });

    new Chart(document.getElementById("progressChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "% Complete",
          data: progressValues
        }]
      }
    });
  })
  .catch(err => console.error("Fetch error:", err));
