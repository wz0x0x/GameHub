function loadPayload(name) {
  document.getElementById("status").innerText = "Loading: " + name;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "payloads/" + name + ".bin", true);
  xhr.responseType = "arraybuffer";

  xhr.onload = function () {
    if (xhr.status === 200) {
      binloader(xhr.response);
      document.getElementById("status").innerText = "Injected: " + name;
    } else {
      document.getElementById("status").innerText = "Failed loading " + name;
    }
  };

  xhr.onerror = function () {
    document.getElementById("status").innerText = "Network Error";
  };

  xhr.send();
}
