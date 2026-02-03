const API_URL = "https://script.google.com/macros/s/AKfycbyRvvLmZg1zzfGsgFb8XVUApclToxCH1ZyqVG0jlWntK94V_TZWcXq_j-uL-WGLtpK6Gw/exec";


fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    const header = data[0];
    const rows = data.slice(1);

    const moduleIndex = header.indexOf("Module");
    const taskIndex = header.indexOf("Task");
    const percentIndex = header.indexOf("Completed %");

    // Populate module dropdown
    let modules = [...new Set(rows.map(r => r[moduleIndex]))];
    let dropdown = document.getElementById("moduleDropdown");

    modules.forEach(m => {
      dropdown.innerHTML += `<option value="${m}">${m}</option>`;
    });

    dropdown.onchange = () => updateDashboard(dropdown.value);
    updateDashboard(modules[0]);

    function updateDashboard(selectedModule) {
      let filtered = rows.filter(r => r[moduleIndex] === selectedModule);

      // Build table
      let html = `<table>
        <tr><th>Task</th><th>Progress</th></tr>`;

      filtered.forEach(r => {
        html += `
          <tr>
            <td>${r[taskIndex]}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${r[percentIndex]}%"></div>
              </div>
              ${r[percentIndex]}%
            </td>
          </tr>`;
      });

      html += `</table>`;
      document.getElementById("taskTable").innerHTML = html;

      // Chart
      new Chart(document.getElementById("moduleChart"), {
        type: "bar",
        data: {
          labels: filtered.map(r => r[taskIndex]),
          datasets: [{
            label: "Completion %",
            data: filtered.map(r => Number(r[percentIndex])),
          }]
        }
      });
    }
  });
