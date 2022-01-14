J$.iids = {"9":[5,9,5,10],"10":[7,9,7,14],"17":[5,9,5,10],"25":[5,5,5,11],"33":[6,9,6,10],"41":[6,9,6,10],"49":[6,5,6,11],"57":[7,9,7,10],"65":[7,13,7,14],"73":[7,9,7,14],"81":[7,5,7,15],"89":[8,5,8,12],"97":[8,17,8,25],"105":[8,5,8,26],"107":[8,5,8,16],"113":[8,5,8,27],"121":[9,12,9,13],"129":[9,12,9,13],"137":[9,5,9,14],"145":[1,1,10,2],"153":[1,1,10,2],"161":[1,1,10,2],"169":[1,1,10,2],"177":[1,1,10,2],"185":[12,1,12,8],"193":[12,1,12,10],"201":[12,1,12,11],"209":[1,1,12,11],"217":[1,1,10,2],"225":[1,1,12,11],"233":[1,1,10,2],"241":[1,1,10,2],"249":[1,1,12,11],"257":[1,1,12,11],"nBranches":0,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone2\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone2\\example_jalangi_.js","code":"function sliceMe() {\r\n    var x;\r\n    var y;\r\n    var z;\r\n    x = 1;\r\n    y = 2;\r\n    z = x + y;\r\n    console.log(\"patata\");\r\n    return x;\r\n}\r\n\r\nsliceMe();"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(209, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone2\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone2\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(145, arguments.callee, this, arguments);
                            arguments = J$.N(153, 'arguments', arguments, 4);
                            J$.N(161, 'x', x, 0);
                            J$.N(169, 'y', y, 0);
                            J$.N(177, 'z', z, 0);
                            var x;
                            var y;
                            var z;
                            J$.X1(25, x = J$.W(17, 'x', J$.T(9, 1, 22, false), x, 0));
                            J$.X1(49, y = J$.W(41, 'y', J$.T(33, 2, 22, false), y, 0));
                            J$.X1(81, z = J$.W(73, 'z', J$.B(10, '+', J$.R(57, 'x', x, 0), J$.R(65, 'y', y, 0), 0), z, 0));
                            J$.X1(113, J$.M(105, J$.R(89, 'console', console, 2), 'log', 0)(J$.T(97, "patata", 21, false)));
                            return J$.X1(137, J$.Rt(129, J$.R(121, 'x', x, 0)));
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
            sliceMe = J$.N(225, 'sliceMe', J$.T(217, sliceMe, 12, false, 145), 0);
            J$.X1(201, J$.F(193, J$.R(185, 'sliceMe', sliceMe, 1), 0)());
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
