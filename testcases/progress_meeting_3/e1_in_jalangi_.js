J$.iids = {"8":[6,9,6,15],"9":[5,9,5,10],"10":[6,9,6,15],"17":[5,9,5,10],"25":[5,5,5,11],"33":[6,9,6,10],"41":[6,14,6,15],"49":[7,13,7,14],"57":[7,13,7,14],"65":[7,9,7,15],"73":[9,13,9,14],"81":[9,13,9,14],"89":[9,9,9,15],"97":[11,12,11,13],"105":[11,12,11,13],"113":[11,5,11,14],"121":[1,1,12,2],"129":[1,1,12,2],"137":[1,1,12,2],"145":[1,1,12,2],"153":[1,1,12,2],"161":[14,1,14,8],"169":[14,1,14,10],"177":[14,1,14,11],"185":[1,1,16,1],"193":[1,1,12,2],"201":[1,1,16,1],"209":[6,5,10,6],"217":[1,1,12,2],"225":[1,1,12,2],"233":[1,1,16,1],"241":[1,1,16,1],"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\testcases\\progress_meeting_3\\e1_in.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\testcases\\progress_meeting_3\\e1_in_jalangi_.js","code":"function sliceMe() {\r\n    var x;\r\n    var y;\r\n    var z;\r\n    x = 1;\r\n    if (x == 1){\r\n        y = x;    \r\n    }else{\r\n        z = y;\r\n    }\r\n    return z;\r\n}\r\n\r\nsliceMe();\r\n//criteria: 11 \r\n"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(185, 'C:\\software\\jalangi-dynamic-slicer\\testcases\\progress_meeting_3\\e1_in_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\testcases\\progress_meeting_3\\e1_in.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(121, arguments.callee, this, arguments);
                            arguments = J$.N(129, 'arguments', arguments, 4);
                            J$.N(137, 'x', x, 0);
                            J$.N(145, 'y', y, 0);
                            J$.N(153, 'z', z, 0);
                            var x;
                            var y;
                            var z;
                            J$.X1(25, x = J$.W(17, 'x', J$.T(9, 1, 22, false), x, 0));
                            if (J$.X1(209, J$.C(8, J$.B(10, '==', J$.R(33, 'x', x, 0), J$.T(41, 1, 22, false), 0)))) {
                                J$.X1(65, y = J$.W(57, 'y', J$.R(49, 'x', x, 0), y, 0));
                            } else {
                                J$.X1(89, z = J$.W(81, 'z', J$.R(73, 'y', y, 0), z, 0));
                            }
                            return J$.X1(113, J$.Rt(105, J$.R(97, 'z', z, 0)));
                        } catch (J$e) {
                            J$.Ex(217, J$e);
                        } finally {
                            if (J$.Fr(225))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(201, 'sliceMe', J$.T(193, sliceMe, 12, false, 121), 0);
            J$.X1(177, J$.F(169, J$.R(161, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(233, J$e);
        } finally {
            if (J$.Sr(241)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
