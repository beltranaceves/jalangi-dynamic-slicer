J$.iids = {"8":[4,12,4,17],"9":[2,13,2,14],"10":[4,12,4,17],"17":[2,13,2,14],"18":[5,14,5,15],"25":[2,13,2,14],"33":[3,13,3,14],"41":[3,13,3,14],"49":[3,13,3,14],"57":[4,12,4,13],"65":[4,16,4,17],"73":[5,14,5,15],"81":[5,9,5,10],"89":[5,9,5,15],"97":[5,9,5,16],"105":[7,12,7,13],"113":[7,12,7,13],"121":[7,5,7,14],"129":[1,1,8,2],"137":[1,1,8,2],"145":[1,1,8,2],"153":[1,1,8,2],"161":[1,1,8,2],"169":[1,1,8,2],"177":[9,1,9,8],"185":[9,1,9,10],"193":[9,1,9,11],"201":[1,1,11,3],"209":[1,1,8,2],"217":[1,1,11,3],"225":[4,5,6,6],"233":[1,1,8,2],"241":[1,1,8,2],"249":[1,1,11,3],"257":[1,1,11,3],"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe(a, b) {\r\n    var x = 1;\r\n    var y = 0;\r\n    while (y < x) {\r\n        y += 1;\r\n    }\r\n    return y;\r\n}\r\nsliceMe();\r\n\r\n//"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(201, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe(a, b) {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(129, arguments.callee, this, arguments);
                            arguments = J$.N(137, 'arguments', arguments, 4);
                            a = J$.N(145, 'a', a, 4);
                            b = J$.N(153, 'b', b, 4);
                            J$.N(161, 'x', x, 0);
                            J$.N(169, 'y', y, 0);
                            var x = J$.X1(25, J$.W(17, 'x', J$.T(9, 1, 22, false), x, 1));
                            var y = J$.X1(49, J$.W(41, 'y', J$.T(33, 0, 22, false), y, 1));
                            while (J$.X1(225, J$.C(8, J$.B(10, '<', J$.R(57, 'y', y, 0), J$.R(65, 'x', x, 0), 0)))) {
                                J$.X1(97, y = J$.W(89, 'y', J$.B(18, '+', J$.R(81, 'y', y, 0), J$.T(73, 1, 22, false), 0), y, 0));
                            }
                            return J$.X1(121, J$.Rt(113, J$.R(105, 'y', y, 0)));
                        } catch (J$e) {
                            J$.Ex(233, J$e);
                        } finally {
                            if (J$.Fr(241))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(217, 'sliceMe', J$.T(209, sliceMe, 12, false, 129), 0);
            J$.X1(193, J$.F(185, J$.R(177, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(249, J$e);
        } finally {
            if (J$.Sr(257)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
