// هذا الملف هو الجسر بين الأزرار وبين ثغرة الجهاز
function loadPayload(fileName) {
    var helper = document.getElementById('helper');
    var path = "payloads/" + fileName;

    helper.innerText = "جاري قراءة الملف: " + fileName + "...";
    helper.style.color = "#ffd700";

    // 1. جلب ملف الـ bin
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        if (this.status == 200) {
            var payloadBuffer = new Uint8Array(this.response);
            helper.innerText = "تم قراءة " + fileName + " ✅ جاري الحقن...";

            // 2. محاولة إيجاد دالة الحقن في ملفاتك (exploit.js / rop.js)
            try {
                // سنحاول تشغيل أشهر الدوال التي تستخدم في الهوستات
                if (typeof PL_Loader === 'function') {
                    PL_Loader(payloadBuffer);
                } else if (typeof runPayload === 'function') {
                    runPayload(payloadBuffer);
                } else if (typeof load_payload === 'function') {
                    load_payload(payloadBuffer);
                } else {
                    helper.innerText = "خطأ: لم أجد دالة (PL_Loader) في ملف exploit.js";
                    helper.style.color = "#ff4444";
                }
            } catch (err) {
                helper.innerText = "حدث خطأ أثناء الحقن: " + err.message;
            }
        } else {
            helper.innerText = "خطأ: الملف غير موجود في مجلد payloads/";
            helper.style.color = "#ff4444";
        }
    };
    xhr.send();
}

// الدالة التي تستدعيها الأزرار في index.html
function r(f) {
    loadPayload(f);
}
