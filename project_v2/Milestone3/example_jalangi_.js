J$.iids = {"9":[3,13,3,31],"17":[4,22,4,29],"25":[4,13,4,31],"33":[2,11,5,4],"41":[2,11,5,4],"49":[2,11,5,4],"57":[6,11,6,19],"65":[6,11,6,19],"73":[6,11,6,19],"81":[7,11,7,13],"89":[7,11,7,13],"97":[7,11,7,13],"105":[8,7,8,8],"113":[8,7,8,8],"121":[8,3,8,9],"129":[9,3,9,4],"137":[9,16,9,17],"145":[9,3,9,17],"153":[9,3,9,18],"161":[10,11,10,12],"169":[10,11,10,19],"177":[10,11,10,19],"185":[10,11,10,19],"193":[11,10,11,11],"201":[11,10,11,11],"209":[11,3,11,12],"217":[1,1,12,2],"225":[1,1,12,2],"233":[1,1,12,2],"241":[1,1,12,2],"249":[1,1,12,2],"257":[1,1,12,2],"265":[13,1,13,8],"273":[13,1,13,10],"281":[13,1,13,11],"289":[1,1,13,11],"297":[1,1,12,2],"305":[1,1,13,11],"313":[1,1,12,2],"321":[1,1,12,2],"329":[1,1,13,11],"337":[1,1,13,11],"nBranches":0,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe() {\r\n  var a = {\r\n    course: 'Program Analysis',\r\n    parent: { child: \"oh no\" }\r\n  };\r\n  var b = 'Winter';\r\n  var c = {};\r\n  c = a;\r\n  c.semester = b;\r\n  var d = c.course;\r\n  return a;\r\n}\r\nsliceMe();"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(289, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(217, arguments.callee, this, arguments);
                            arguments = J$.N(225, 'arguments', arguments, 4);
                            J$.N(233, 'a', a, 0);
                            J$.N(241, 'b', b, 0);
                            J$.N(249, 'c', c, 0);
                            J$.N(257, 'd', d, 0);
                            var a = J$.X1(49, J$.W(41, 'a', J$.T(33, {
                                course: J$.T(9, 'Program Analysis', 21, false),
                                parent: J$.T(25, {
                                    child: J$.T(17, "oh no", 21, false)
                                }, 11, false)
                            }, 11, false), a, 1));
                            var b = J$.X1(73, J$.W(65, 'b', J$.T(57, 'Winter', 21, false), b, 1));
                            var c = J$.X1(97, J$.W(89, 'c', J$.T(81, {}, 11, false), c, 1));
                            J$.X1(121, c = J$.W(113, 'c', J$.R(105, 'a', a, 0), c, 0));
                            J$.X1(153, J$.P(145, J$.R(129, 'c', c, 0), 'semester', J$.R(137, 'b', b, 0), 0));
                            var d = J$.X1(185, J$.W(177, 'd', J$.G(169, J$.R(161, 'c', c, 0), 'course', 0), d, 1));
                            return J$.X1(209, J$.Rt(201, J$.R(193, 'a', a, 0)));
                        } catch (J$e) {
                            J$.Ex(313, J$e);
                        } finally {
                            if (J$.Fr(321))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(305, 'sliceMe', J$.T(297, sliceMe, 12, false, 217), 0);
            J$.X1(281, J$.F(273, J$.R(265, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(329, J$e);
        } finally {
            if (J$.Sr(337)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
