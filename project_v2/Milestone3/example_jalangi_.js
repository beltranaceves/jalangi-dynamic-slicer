J$.iids = {"9":[2,13,2,21],"10":[8,12,8,17],"17":[2,22,2,23],"25":[2,13,2,24],"33":[2,13,2,24],"41":[2,13,2,24],"49":[3,9,3,10],"57":[3,9,3,10],"65":[3,5,3,11],"73":[4,12,4,13],"81":[4,12,4,13],"89":[4,5,4,14],"97":[1,1,5,2],"105":[1,1,5,2],"113":[1,1,5,2],"121":[8,12,8,13],"129":[8,16,8,17],"137":[8,12,8,17],"145":[8,5,8,18],"153":[7,1,9,2],"161":[7,1,9,2],"169":[7,1,9,2],"177":[10,1,10,8],"185":[10,1,10,10],"193":[10,1,10,11],"201":[1,1,10,11],"209":[1,1,5,2],"217":[1,1,10,11],"225":[7,1,9,2],"233":[1,1,10,11],"241":[1,1,5,2],"249":[1,1,5,2],"257":[7,1,9,2],"265":[7,1,9,2],"273":[1,1,10,11],"281":[1,1,10,11],"nBranches":0,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe() {\r\n    var x = doubleMe(2);\r\n    x = 1;\r\n    return x;\r\n}\r\n\r\nfunction doubleMe(x) {  \r\n    return x * 2;\r\n}\r\nsliceMe();"};
jalangiLabel2:
    while (true) {
        try {
            J$.Se(201, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(97, arguments.callee, this, arguments);
                            arguments = J$.N(105, 'arguments', arguments, 4);
                            J$.N(113, 'x', x, 0);
                            var x = J$.X1(41, J$.W(33, 'x', J$.F(25, J$.R(9, 'doubleMe', doubleMe, 1), 0)(J$.T(17, 2, 22, false)), x, 1));
                            J$.X1(65, x = J$.W(57, 'x', J$.T(49, 1, 22, false), x, 0));
                            return J$.X1(89, J$.Rt(81, J$.R(73, 'x', x, 0)));
                        } catch (J$e) {
                            J$.Ex(241, J$e);
                        } finally {
                            if (J$.Fr(249))
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
                            J$.Fe(153, arguments.callee, this, arguments);
                            arguments = J$.N(161, 'arguments', arguments, 4);
                            x = J$.N(169, 'x', x, 4);
                            return J$.X1(145, J$.Rt(137, J$.B(10, '*', J$.R(121, 'x', x, 0), J$.T(129, 2, 22, false), 0)));
                        } catch (J$e) {
                            J$.Ex(257, J$e);
                        } finally {
                            if (J$.Fr(265))
                                continue jalangiLabel1;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(217, 'sliceMe', J$.T(209, sliceMe, 12, false, 97), 0);
            doubleMe = J$.N(233, 'doubleMe', J$.T(225, doubleMe, 12, false, 153), 0);
            J$.X1(193, J$.F(185, J$.R(177, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(273, J$e);
        } finally {
            if (J$.Sr(281)) {
                J$.L();
                continue jalangiLabel2;
            } else {
                J$.L();
                break jalangiLabel2;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
