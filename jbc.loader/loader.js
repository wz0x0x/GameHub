// جيه بي سي لودر - محرك إرسال البايلود الخاص بـ Lev
function loadPayload(payloadPath) {
    // 1. إظهار رسالة في بوكس المعلومات
    if (document.getElementById('helper')) {
        document.getElementById('helper').innerText = "جاري قراءة الملف من المسار: " + payloadPath;
    }

    // 2. استخدام Fetch لجلب ملف الـ .bin وتحويله لبيانات باينري
    fetch(payloadPath)
        .then(response => {
            if (!response.ok) throw new Error("الملف غير موجود في مجلد payloads");
            return response.arrayBuffer();
        })
        .then(buffer => {
            // 3. إرسال البيانات إلى محرك الـ JBC (الموجود في ملفاتك الأخرى)
            // ملاحظة: جهازه يحتاج أن يكون الثغرة (Exploit) شغال أولاً
            if (typeof jbc_payload === 'function') {
                jbc_payload(new Uint8Array(buffer));
                if (document.getElementById('helper')) {
                    document.getElementById('helper').innerText = "تم إرسال البايلود بنجاح! ✅";
                }
            } else {
                // محاولة الإرسال عبر اللودر التقليدي إذا لم يجد jbc
                let data = new Uint8Array(buffer);
                // هنا نضع كود الإرسال الاحتياطي
                console.log("Payload data ready: ", data.length, " bytes");
                if (document.getElementById('helper')) {
                    document.getElementById('helper').innerText = "خطأ: محرك jbc_payload غير مفعّل. هل شغلت الثغرة؟";
                }
            }
        })
        .catch(error => {
            if (document.getElementById('helper')) {
                document.getElementById('helper').innerText = "فشل التحميل: " + error.message;
            }
        });
}

// تصدير الدالة لتكون جاهزة للاستخدام من index.html
window.loadPayload = loadPayload;
