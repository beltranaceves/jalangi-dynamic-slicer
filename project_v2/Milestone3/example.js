function sliceMe() {
  var a = {
    course: 'Program Analysis',
    parent: { child: "oh no" }
  };
  var b = 'Winter';
  var c = {};
  c = a;
  c.semester = b;
  var d = c.course;
  return a;
}
sliceMe();