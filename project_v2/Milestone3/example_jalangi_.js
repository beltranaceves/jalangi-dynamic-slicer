J$.iids = {"9":[2,11,2,29],"17":[2,11,2,29],"25":[2,11,2,29],"33":[3,11,3,19],"41":[3,11,3,19],"49":[3,11,3,19],"57":[4,11,4,13],"65":[4,11,4,13],"73":[4,11,4,13],"81":[5,3,5,4],"89":[5,14,5,15],"97":[5,3,5,15],"105":[5,3,5,16],"113":[6,3,6,4],"121":[6,16,6,17],"129":[6,3,6,17],"137":[6,3,6,18],"145":[7,11,7,12],"153":[7,11,7,19],"161":[7,11,7,19],"169":[7,11,7,19],"177":[8,10,8,11],"185":[8,10,8,11],"193":[8,3,8,12],"201":[1,1,9,2],"209":[1,1,9,2],"217":[1,1,9,2],"225":[1,1,9,2],"233":[1,1,9,2],"241":[1,1,9,2],"249":[11,1,11,8],"257":[11,1,11,10],"265":[11,1,11,11],"273":[1,1,11,11],"281":[1,1,9,2],"289":[1,1,11,11],"297":[1,1,9,2],"305":[1,1,9,2],"313":[1,1,11,11],"321":[1,1,11,11],"nBranches":0,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe() {\r\n  var a = 'Program Analysis';\r\n  var b = 'Winter';\r\n  var c = {};\r\n  c.course = a;\r\n  c.semester = b;\r\n  var d = c.course;\r\n  return d;\r\n}\r\n\r\nsliceMe();"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(273, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(201, arguments.callee, this, arguments);
                            arguments = J$.N(209, 'arguments', arguments, 4);
                            J$.N(217, 'a', a, 0);
                            J$.N(225, 'b', b, 0);
                            J$.N(233, 'c', c, 0);
                            J$.N(241, 'd', d, 0);
                            var a = J$.X1(25, J$.W(17, 'a', J$.T(9, 'Program Analysis', 21, false), a, 1));
                            var b = J$.X1(49, J$.W(41, 'b', J$.T(33, 'Winter', 21, false), b, 1));
                            var c = J$.X1(73, J$.W(65, 'c', J$.T(57, {}, 11, false), c, 1));
                            J$.X1(105, J$.P(97, J$.R(81, 'c', c, 0), 'course', J$.R(89, 'a', a, 0), 0));
                            J$.X1(137, J$.P(129, J$.R(113, 'c', c, 0), 'semester', J$.R(121, 'b', b, 0), 0));
                            var d = J$.X1(169, J$.W(161, 'd', J$.G(153, J$.R(145, 'c', c, 0), 'course', 0), d, 1));
                            return J$.X1(193, J$.Rt(185, J$.R(177, 'd', d, 0)));
                        } catch (J$e) {
                            J$.Ex(297, J$e);
                        } finally {
                            if (J$.Fr(305))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(289, 'sliceMe', J$.T(281, sliceMe, 12, false, 201), 0);
            J$.X1(265, J$.F(257, J$.R(249, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(313, J$e);
        } finally {
            if (J$.Sr(321)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
