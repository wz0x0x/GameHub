function loadPayload(payloadPath) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', payloadPath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = new Uint8Array(xhr.response);
            if (typeof jbc_payload === 'function') {
                jbc_payload(data); // إرسال للثغرة
                document.getElementById('helper').innerText = "تم الإرسال بنجاح! ✅";
            } else {
                document.getElementById('helper').innerText = "الثغرة (Exploit) لم تكتمل بعد.. انتظر قليلاً";
            }
        } else {
            document.getElementById('helper').innerText = "فشل: لم يتم العثور على الملف في مجلد payloads";
        }
    };

    xhr.onerror = function() {
        document.getElementById('helper').innerText = "خطأ في الشبكة أو المسار!";
    };

    xhr.send();
}
