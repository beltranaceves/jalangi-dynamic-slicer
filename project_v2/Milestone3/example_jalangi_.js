J$.iids = {"8":[4,13,4,14],"9":[2,13,2,14],"16":[5,14,5,15],"17":[2,13,2,14],"25":[2,13,2,14],"33":[3,13,3,14],"41":[3,13,3,14],"49":[3,13,3,14],"57":[4,13,4,14],"65":[6,17,6,18],"73":[6,17,6,18],"81":[6,13,6,19],"89":[5,14,5,15],"97":[9,12,9,13],"105":[9,12,9,13],"113":[9,5,9,14],"121":[1,1,10,2],"129":[1,1,10,2],"137":[1,1,10,2],"145":[1,1,10,2],"153":[1,1,10,2],"161":[1,1,10,2],"169":[11,1,11,8],"177":[11,1,11,10],"185":[11,1,11,11],"193":[1,1,13,3],"201":[1,1,10,2],"209":[1,1,13,3],"217":[4,13,4,14],"225":[5,14,5,15],"233":[1,1,10,2],"241":[1,1,10,2],"249":[1,1,13,3],"257":[1,1,13,3],"nBranches":4,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe(a, b) {\r\n    var x = 1;\r\n    var y = 0;\r\n    switch (x) {\r\n        case x:\r\n            y = 1;\r\n            break;\r\n    }\r\n    return y;\r\n}\r\nsliceMe();\r\n\r\n//"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(193, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe(a, b) {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(121, arguments.callee, this, arguments);
                            arguments = J$.N(129, 'arguments', arguments, 4);
                            a = J$.N(137, 'a', a, 4);
                            b = J$.N(145, 'b', b, 4);
                            J$.N(153, 'x', x, 0);
                            J$.N(161, 'y', y, 0);
                            var x = J$.X1(25, J$.W(17, 'x', J$.T(9, 1, 22, false), x, 1));
                            var y = J$.X1(49, J$.W(41, 'y', J$.T(33, 0, 22, false), y, 1));
                            switch (J$.X1(217, J$.C1(8, J$.R(57, 'x', x, 0)))) {
                            case J$.X1(225, J$.C2(16, J$.R(89, 'x', x, 0))):
                                J$.X1(81, y = J$.W(73, 'y', J$.T(65, 1, 22, false), y, 0));
                                break;
                            }
                            return J$.X1(113, J$.Rt(105, J$.R(97, 'y', y, 0)));
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
            sliceMe = J$.N(209, 'sliceMe', J$.T(201, sliceMe, 12, false, 121), 0);
            J$.X1(185, J$.F(177, J$.R(169, 'sliceMe', sliceMe, 1), 0)());
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
