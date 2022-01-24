function sliceMe() {
    var a = {
        course: 'Program Analysis',
        parent: {}
    };
    var b = 'Winter';
    var c = {};
    c = a;
    c.semester = b;
}
sliceMe();