/**
 * GAME HUB - Payload Loader System
 * Developed for PS4 Host Environment
 */

function loadPayload(payloadPath) {
    // 1. إظهار رسالة للمستخدم في بوكس المعلومات
    if (document.getElementById('helper')) {
        document.getElementById('helper').innerText = "جاري جلب ملف الـ Payload من المجلد...";
    }

    // 2. إنشاء طلب لجلب ملف الـ .bin
    var xhr = new XMLHttpRequest();
    xhr.open('GET', payloadPath, true);
    xhr.responseType = 'arraybuffer'; // نحتاج البيانات كصفوف بايتات

    xhr.onload = function (e) {
        if (this.status == 200) {
            // تحويل الملف المستلم إلى Uint8Array
            var payloadBuffer = new Uint8Array(this.response);
            
            if (document.getElementById('helper')) {
                document.getElementById('helper').innerText = "تم جلب الملف بنجاح.. جاري الحقن في الذاكرة.";
            }

            // 3. استدعاء دالة الحقن (Inject)
            // ملاحظة: هذه الدالة تعتمد على اسم المحرك في ملف exploit.js الخاص بك
            // في معظم النسخ تسمى الدالة PL_Loader أو runPayload
            try {
                if (typeof PL_Loader === 'function') {
                    PL_Loader(payloadBuffer);
                } else if (typeof runPayload === 'function') {
                    runPayload(payloadBuffer);
                } else {
                    alert("خطأ: لم يتم العثور على محرك الحقن في ملفات exploit.js");
                }
            } catch (err) {
                alert("حدث خطأ أثناء محاولة الحقن: " + err.message);
            }
        } else {
            alert("فشل في العثور على الملف في المسار: " + payloadPath);
        }
    };

    xhr.onerror = function () {
        alert("خطأ في الشبكة أو في مسار المجلد payloads/");
    };

    xhr.send();
}

// دالة مساعدة لربط الأزرار باللودر
function r(fileName) {
    var fullPath = "payloads/" + fileName;
    loadPayload(fullPath);
}
