J$.iids = {"8":[4,7,4,24],"9":[2,16,2,19],"10":[4,11,4,19],"17":[2,16,2,26],"18":[4,7,4,24],"25":[2,16,2,26],"33":[2,16,2,26],"41":[3,16,3,25],"49":[3,16,3,25],"57":[3,16,3,25],"65":[4,7,4,10],"73":[4,11,4,17],"81":[4,18,4,19],"89":[4,7,4,20],"97":[4,23,4,24],"105":[5,16,5,23],"113":[5,16,5,23],"121":[5,7,5,24],"129":[7,3,7,10],"137":[7,15,7,21],"145":[7,3,7,22],"147":[7,3,7,14],"153":[7,3,7,23],"161":[8,3,8,9],"169":[8,3,8,10],"177":[1,1,9,2],"185":[1,1,9,2],"193":[1,1,9,2],"201":[1,1,9,2],"209":[1,1,9,2],"217":[11,1,11,8],"225":[11,10,11,11],"233":[11,13,11,14],"241":[11,16,11,17],"249":[11,19,11,20],"257":[11,22,11,23],"265":[11,25,11,26],"273":[11,28,11,29],"281":[11,31,11,32],"289":[11,34,11,35],"297":[11,37,11,39],"305":[11,9,11,40],"313":[11,1,11,41],"321":[11,1,11,42],"329":[1,1,11,42],"337":[1,1,9,2],"345":[1,1,11,42],"353":[4,3,6,4],"361":[1,1,9,2],"369":[1,1,9,2],"377":[1,1,11,42],"385":[1,1,11,42],"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js","code":"function sliceMe(arr) {    \r\n  var length = arr.length;\r\n  var status = \"invalid\";\r\n  if (arr[length-1] > 0){\r\n      status = \"valid\";\r\n  }\r\n  console.log(status);\r\n  status;\r\n}\r\n\r\nsliceMe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(329, 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example_jalangi_.js', 'C:\\software\\jalangi-dynamic-slicer\\project_v2\\Milestone3\\example.js');
            function sliceMe(arr) {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(177, arguments.callee, this, arguments);
                            arguments = J$.N(185, 'arguments', arguments, 4);
                            arr = J$.N(193, 'arr', arr, 4);
                            J$.N(201, 'length', length, 0);
                            J$.N(209, 'status', status, 0);
                            var length = J$.X1(33, J$.W(25, 'length', J$.G(17, J$.R(9, 'arr', arr, 0), 'length', 0), length, 1));
                            var status = J$.X1(57, J$.W(49, 'status', J$.T(41, "invalid", 21, false), status, 1));
                            if (J$.X1(353, J$.C(8, J$.B(18, '>', J$.G(89, J$.R(65, 'arr', arr, 0), J$.B(10, '-', J$.R(73, 'length', length, 0), J$.T(81, 1, 22, false), 0), 4), J$.T(97, 0, 22, false), 0)))) {
                                J$.X1(121, status = J$.W(113, 'status', J$.T(105, "valid", 21, false), status, 0));
                            }
                            J$.X1(153, J$.M(145, J$.R(129, 'console', console, 2), 'log', 0)(J$.R(137, 'status', status, 0)));
                            J$.X1(169, J$.R(161, 'status', status, 0));
                        } catch (J$e) {
                            J$.Ex(361, J$e);
                        } finally {
                            if (J$.Fr(369))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            sliceMe = J$.N(345, 'sliceMe', J$.T(337, sliceMe, 12, false, 177), 0);
            J$.X1(321, J$.F(313, J$.R(217, 'sliceMe', sliceMe, 1), 0)(J$.T(305, [
                J$.T(225, 1, 22, false),
                J$.T(233, 2, 22, false),
                J$.T(241, 3, 22, false),
                J$.T(249, 4, 22, false),
                J$.T(257, 5, 22, false),
                J$.T(265, 6, 22, false),
                J$.T(273, 7, 22, false),
                J$.T(281, 8, 22, false),
                J$.T(289, 9, 22, false),
                J$.T(297, 10, 22, false)
            ], 10, false)));
        } catch (J$e) {
            J$.Ex(377, J$e);
        } finally {
            if (J$.Sr(385)) {
                J$.L();
                continue jalangiLabel1;
            } else {
                J$.L();
                break jalangiLabel1;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
