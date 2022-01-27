J$.iids = {"8":[7,14,7,19],"9":[2,13,2,14],"10":[5,13,5,18],"17":[2,13,2,14],"18":[6,13,6,18],"25":[2,13,2,14],"26":[7,14,7,19],"33":[3,13,3,14],"41":[3,13,3,14],"49":[3,13,3,14],"57":[5,13,5,14],"65":[5,17,5,18],"73":[5,13,5,18],"81":[5,9,5,19],"89":[6,13,6,14],"97":[6,17,6,18],"105":[6,13,6,18],"113":[6,9,6,19],"121":[7,14,7,15],"129":[7,18,7,19],"137":[8,12,8,13],"145":[8,12,8,13],"153":[8,5,8,14],"161":[1,1,9,2],"169":[1,1,9,2],"177":[1,1,9,2],"185":[1,1,9,2],"193":[11,1,11,8],"201":[11,1,11,10],"209":[11,1,11,11],"217":[1,1,11,11],"225":[1,1,9,2],"233":[1,1,11,11],"241":[4,5,7,21],"249":[1,1,9,2],"257":[1,1,9,2],"265":[1,1,11,11],"273":[1,1,11,11],"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe() {\r\n    var x = 0;\r\n    var y = 0;\r\n    do {\r\n        x = x + 1;\r\n        y = y + 1;\r\n    } while (x < 2);\r\n    return x;\r\n}\r\n\r\nsliceMe();"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(217, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(161, arguments.callee, this, arguments);
                            arguments = J$.N(169, 'arguments', arguments, 4);
                            J$.N(177, 'x', x, 0);
                            J$.N(185, 'y', y, 0);
                            var x = J$.X1(25, J$.W(17, 'x', J$.T(9, 0, 22, false), x, 1));
                            var y = J$.X1(49, J$.W(41, 'y', J$.T(33, 0, 22, false), y, 1));
                            do {
                                J$.X1(81, x = J$.W(73, 'x', J$.B(10, '+', J$.R(57, 'x', x, 0), J$.T(65, 1, 22, false), 0), x, 0));
                                J$.X1(113, y = J$.W(105, 'y', J$.B(18, '+', J$.R(89, 'y', y, 0), J$.T(97, 1, 22, false), 0), y, 0));
                            } while (J$.X1(241, J$.C(8, J$.B(26, '<', J$.R(121, 'x', x, 0), J$.T(129, 2, 22, false), 0))));
                            return J$.X1(153, J$.Rt(145, J$.R(137, 'x', x, 0)));
                        } catch (J$e) {
                            J$.Ex(249, J$e);
                        } finally {
                            if (J$.Fr(257))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(233, 'sliceMe', J$.T(225, sliceMe, 12, false, 161), 0);
            J$.X1(209, J$.F(201, J$.R(193, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(265, J$e);
        } finally {
            if (J$.Sr(273)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
