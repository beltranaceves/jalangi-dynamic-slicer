J$.iids = {"8":[7,14,7,19],"9":[2,13,2,21],"10":[5,13,5,18],"17":[2,22,2,23],"18":[6,13,6,18],"25":[2,13,2,24],"26":[7,14,7,19],"33":[2,13,2,24],"34":[12,12,12,17],"41":[2,13,2,24],"49":[3,13,3,21],"57":[3,22,3,23],"65":[3,13,3,24],"73":[3,13,3,24],"81":[3,13,3,24],"89":[5,13,5,14],"97":[5,17,5,18],"105":[5,13,5,18],"113":[5,9,5,19],"121":[6,13,6,14],"129":[6,17,6,18],"137":[6,13,6,18],"145":[6,9,6,19],"153":[7,14,7,15],"161":[7,18,7,19],"169":[8,12,8,13],"177":[8,12,8,13],"185":[8,5,8,14],"193":[1,1,9,2],"201":[1,1,9,2],"209":[1,1,9,2],"217":[1,1,9,2],"225":[12,12,12,13],"233":[12,16,12,17],"241":[12,12,12,17],"249":[12,5,12,18],"257":[11,1,13,2],"265":[11,1,13,2],"273":[11,1,13,2],"281":[14,1,14,8],"289":[14,1,14,10],"297":[14,1,14,11],"305":[1,1,14,11],"313":[1,1,9,2],"321":[1,1,14,11],"329":[11,1,13,2],"337":[1,1,14,11],"345":[4,5,7,21],"353":[1,1,9,2],"361":[1,1,9,2],"369":[11,1,13,2],"377":[11,1,13,2],"385":[1,1,14,11],"393":[1,1,14,11],"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe() {\r\n    var x = doubleMe(1);\r\n    var y = doubleMe(x);\r\n    do {\r\n        x = x + 1;\r\n        y = y + 1;\r\n    } while (x < 2);\r\n    return x;\r\n}\r\n\r\nfunction doubleMe(x) {\r\n    return x * 2;\r\n}\r\nsliceMe();"};
jalangiLabel2:
    while (true) {
        try {
            J$.Se(305, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(193, arguments.callee, this, arguments);
                            arguments = J$.N(201, 'arguments', arguments, 4);
                            J$.N(209, 'x', x, 0);
                            J$.N(217, 'y', y, 0);
                            var x = J$.X1(41, J$.W(33, 'x', J$.F(25, J$.R(9, 'doubleMe', doubleMe, 1), 0)(J$.T(17, 1, 22, false)), x, 1));
                            var y = J$.X1(81, J$.W(73, 'y', J$.F(65, J$.R(49, 'doubleMe', doubleMe, 1), 0)(J$.R(57, 'x', x, 0)), y, 1));
                            do {
                                J$.X1(113, x = J$.W(105, 'x', J$.B(10, '+', J$.R(89, 'x', x, 0), J$.T(97, 1, 22, false), 0), x, 0));
                                J$.X1(145, y = J$.W(137, 'y', J$.B(18, '+', J$.R(121, 'y', y, 0), J$.T(129, 1, 22, false), 0), y, 0));
                            } while (J$.X1(345, J$.C(8, J$.B(26, '<', J$.R(153, 'x', x, 0), J$.T(161, 2, 22, false), 0))));
                            return J$.X1(185, J$.Rt(177, J$.R(169, 'x', x, 0)));
                        } catch (J$e) {
                            J$.Ex(353, J$e);
                        } finally {
                            if (J$.Fr(361))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            function doubleMe(x) {
                jalangiLabel1:
                    while (true) {
                        try {
                            J$.Fe(257, arguments.callee, this, arguments);
                            arguments = J$.N(265, 'arguments', arguments, 4);
                            x = J$.N(273, 'x', x, 4);
                            return J$.X1(249, J$.Rt(241, J$.B(34, '*', J$.R(225, 'x', x, 0), J$.T(233, 2, 22, false), 0)));
                        } catch (J$e) {
                            J$.Ex(369, J$e);
                        } finally {
                            if (J$.Fr(377))
                                continue jalangiLabel1;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(321, 'sliceMe', J$.T(313, sliceMe, 12, false, 193), 0);
            doubleMe = J$.N(337, 'doubleMe', J$.T(329, doubleMe, 12, false, 257), 0);
            J$.X1(297, J$.F(289, J$.R(281, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(385, J$e);
        } finally {
            if (J$.Sr(393)) {
                J$.L();
                continue jalangiLabel2;
            } else {
                J$.L();
                break jalangiLabel2;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
