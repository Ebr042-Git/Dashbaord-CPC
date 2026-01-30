const url = "https://script.google.com/macros/s/AKfycbyRvvLmZg1zzfGsgFb8XVUApclToxCH1ZyqVG0jlWntK94V_TZWcXq_j-uL-WGLtpK6Gw/exec";

fetch(url)
  .then(res => {
    console.log("Response status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("DATA:", data);
    document.getElementById("taskContainer").innerText =
      JSON.stringify(data, null, 2);
  })
  .catch(err => {
    console.error("FETCH ERROR:", err);
  });
