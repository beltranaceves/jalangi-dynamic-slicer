J$.iids = {"8":[6,12,6,17],"9":[3,13,3,14],"10":[5,15,5,19],"16":[5,15,5,19],"17":[3,13,3,14],"18":[5,20,5,23],"24":[14,9,14,13],"25":[3,13,3,14],"33":[4,13,4,14],"34":[5,20,5,23],"41":[4,13,4,14],"42":[6,12,6,17],"49":[4,13,4,14],"50":[7,16,7,17],"57":[5,13,5,14],"58":[10,16,10,17],"65":[5,13,5,14],"66":[14,9,14,13],"73":[5,15,5,16],"74":[15,13,15,18],"81":[5,17,5,19],"97":[5,20,5,21],"105":[5,20,5,23],"121":[6,12,6,13],"129":[6,16,6,17],"137":[7,16,7,17],"145":[7,13,7,14],"153":[7,13,7,17],"161":[7,13,7,18],"169":[10,16,10,17],"177":[10,13,10,14],"185":[10,13,10,17],"193":[10,13,10,18],"201":[14,9,14,10],"209":[14,11,14,13],"217":[15,13,15,14],"225":[15,17,15,18],"233":[15,13,15,18],"241":[15,9,15,19],"249":[17,12,17,13],"257":[17,12,17,13],"265":[17,5,17,14],"273":[1,1,18,2],"281":[1,1,18,2],"289":[1,1,18,2],"297":[1,1,18,2],"305":[1,1,18,2],"313":[20,1,20,8],"321":[20,1,20,10],"329":[20,1,20,11],"337":[1,1,21,20],"345":[1,1,18,2],"353":[1,1,21,20],"361":[6,9,12,10],"369":[5,5,13,6],"377":[5,5,13,6],"385":[5,5,13,6],"393":[14,5,16,6],"401":[1,1,18,2],"409":[1,1,18,2],"417":[1,1,21,20],"425":[1,1,21,20],"nBranches":6,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\testcases\\progress_meeting_3\\e3_in.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\testcases\\progress_meeting_3\\e3_in_jalangi_.js","code":"function sliceMe() {\r\n    var x;\r\n    var y = 0;\r\n    var z = 0;\r\n    for(x = 0;x<10;x++){\r\n        if(x < 5){\r\n            y+=x;\r\n        }\r\n        else{\r\n            z+=1;  \r\n            break;          \r\n        }\r\n    }    \r\n    if (y>11){\r\n        z = y + y;    \r\n    }    \r\n    return z;\r\n}\r\n\r\nsliceMe();\r\n//criteria: line 17"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(337, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\testcases\\progress_meeting_3\\e3_in_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\testcases\\progress_meeting_3\\e3_in.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(273, arguments.callee, this, arguments);
                            arguments = J$.N(281, 'arguments', arguments, 4);
                            J$.N(289, 'x', x, 0);
                            J$.N(297, 'y', y, 0);
                            J$.N(305, 'z', z, 0);
                            var x;
                            var y = J$.X1(25, J$.W(17, 'y', J$.T(9, 0, 22, false), y, 1));
                            var z = J$.X1(49, J$.W(41, 'z', J$.T(33, 0, 22, false), z, 1));
                            for (J$.X1(377, x = J$.W(65, 'x', J$.T(57, 0, 22, false), x, 0)); J$.X1(369, J$.C(16, J$.B(10, '<', J$.R(73, 'x', x, 0), J$.T(81, 10, 22, false), 0))); J$.X1(385, J$.B(34, '-', x = J$.W(105, 'x', J$.B(26, '+', J$.U(18, '+', J$.R(97, 'x', x, 0)), J$.T(89, 1, 22, false), 0), x, 0), J$.T(113, 1, 22, false), 0))) {
                                if (J$.X1(361, J$.C(8, J$.B(42, '<', J$.R(121, 'x', x, 0), J$.T(129, 5, 22, false), 0)))) {
                                    J$.X1(161, y = J$.W(153, 'y', J$.B(50, '+', J$.R(145, 'y', y, 0), J$.R(137, 'x', x, 0), 0), y, 0));
                                } else {
                                    J$.X1(193, z = J$.W(185, 'z', J$.B(58, '+', J$.R(177, 'z', z, 0), J$.T(169, 1, 22, false), 0), z, 0));
                                    break;
                                }
                            }
                            if (J$.X1(393, J$.C(24, J$.B(66, '>', J$.R(201, 'y', y, 0), J$.T(209, 11, 22, false), 0)))) {
                                J$.X1(241, z = J$.W(233, 'z', J$.B(74, '+', J$.R(217, 'y', y, 0), J$.R(225, 'y', y, 0), 0), z, 0));
                            }
                            return J$.X1(265, J$.Rt(257, J$.R(249, 'z', z, 0)));
                        } catch (J$e) {
                            J$.Ex(401, J$e);
                        } finally {
                            if (J$.Fr(409))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(353, 'sliceMe', J$.T(345, sliceMe, 12, false, 273), 0);
            J$.X1(329, J$.F(321, J$.R(313, 'sliceMe', sliceMe, 1), 0)());
        } catch (J$e) {
            J$.Ex(417, J$e);
        } finally {
            if (J$.Sr(425)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
