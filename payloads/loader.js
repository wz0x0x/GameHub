// هذا هو الكود الذي يقوم بعملية الـ Injection الحقيقية
window.loadPayload = function(payload) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', payload, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
        if (xhr.status == 200) {
            var buffer = new Uint8Array(xhr.response);
            // تحويل الملف إلى Buffer وإرساله للنظام
            // ملاحظة: هذا الكود يعتمد على وجود ثغرة kexploit مفعلة في المتصفح
            window.postMessage({ payload: buffer }, "*");
        }
    };
    xhr.send();
};
