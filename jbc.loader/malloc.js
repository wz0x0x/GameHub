// دالة تخصيص المساحة في الذاكرة
function malloc(size) {
    var buffer = new ArrayBuffer(size);
    return {
        addr: window.p.read8(window.p.leakptr(buffer).add32(0x10)),
        buffer: buffer
    };
}
window.malloc = malloc;
