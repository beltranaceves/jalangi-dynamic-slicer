function sliceMe() {
    var x = doubleMe(1);
    var y = doubleMe(x);
    do {
        x = x + 1;
        y = y + 1;
    } while (x < 2);
    return x;
}

function doubleMe(x) {
    return x * 2;
}
sliceMe();