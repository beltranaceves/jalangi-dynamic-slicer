function sliceMe() {
    var x = 0;
    var y = 0;
    do {
        x = x + 1;
        y = y + 1;
        break;
    } while (x < 2);
    return x;
}

sliceMe();