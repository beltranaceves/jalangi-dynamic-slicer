function sliceMe() {
    var x = doubleMe(1);
    do {
        x = x + 1;
    } while (x < 2);
    return x;
}
function doubleMe(x) {
    return x * 2;
}
sliceMe();