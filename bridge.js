function loadPayload(name) {
  document.getElementById("status").innerText = "جارٍ الحقن: " + name;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "payloads/" + name + ".bin", true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function() {
    if (xhr.status === 200) {
      binloader(xhr.response); // الدالة من loader.js
      document.getElementById("status").innerText = "تم الحقن بنجاح: " + name;
    } else {
      document.getElementById("status").innerText = "فشل تحميل: " + name;
    }
  };
  xhr.onerror = function() {
    document.getElementById("status").innerText = "خطأ في الاتصال";
  };
  xhr.send();
}
