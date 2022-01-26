J$.iids = {"8":[6,14,6,19],"9":[4,13,4,14],"10":[4,13,4,18],"17":[4,17,4,18],"18":[5,13,5,18],"25":[4,13,4,18],"26":[6,14,6,19],"33":[4,9,4,19],"41":[5,13,5,14],"49":[5,17,5,18],"57":[5,13,5,18],"65":[5,9,5,19],"73":[6,14,6,15],"81":[6,18,6,19],"89":[7,12,7,13],"97":[7,12,7,13],"105":[7,5,7,14],"113":[1,1,8,2],"121":[1,1,8,2],"129":[1,1,8,2],"137":[1,1,8,2],"145":[10,1,10,8],"153":[10,1,10,10],"161":[10,1,10,11],"169":[1,1,10,11],"177":[1,1,8,2],"185":[1,1,10,11],"193":[3,5,6,21],"201":[1,1,8,2],"209":[1,1,8,2],"217":[1,1,10,11],"225":[1,1,10,11],"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe() {\r\n    var x, y;\r\n    do {\r\n        x = x + 1;\r\n        y = y + 1;\r\n    } while (x < 2);\r\n    return x;\r\n}\r\n\r\nsliceMe();"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(169, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(113, arguments.callee, this, arguments);
                            arguments = J$.N(121, 'arguments', arguments, 4);
                            J$.N(129, 'x', x, 0);
                            J$.N(137, 'y', y, 0);
                            var x, y;
                            do {
                                J$.X1(33, x = J$.W(25, 'x', J$.B(10, '+', J$.R(9, 'x', x, 0), J$.T(17, 1, 22, false), 0), x, 0));
                                J$.X1(65, y = J$.W(57, 'y', J$.B(18, '+', J$.R(41, 'y', y, 0), J$.T(49, 1, 22, false), 0), y, 0));
                            } while (J$.X1(193, J$.C(8, J$.B(26, '<', J$.R(73, 'x', x, 0), J$.T(81, 2, 22, false), 0))));
                            return J$.X1(105, J$.Rt(97, J$.R(89, 'x', x, 0)));
                        } catch (J$e) {
                            J$.Ex(201, J$e);
                        } finally {
                            if (J$.Fr(209))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(185, 'sliceMe', J$.T(177, sliceMe, 12, false, 113), 0);
            J$.X1(161, J$.F(153, J$.R(145, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(217, J$e);
        } finally {
            if (J$.Sr(225)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
