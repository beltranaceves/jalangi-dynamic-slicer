J$.iids = {"nBranches":2,"originalCodeFileName":"C:\\software\\jalangi2\\experiments\\Milestone2\\example.js","instrumentedCodeFileName":"C:\\software\\jalangi2\\experiments\\Milestone2\\example_jalangi_.js","code":"function sliceMe() {\r\n    var x = 5;\r\n    var y;\r\n    console.log(\"Hello World\");\r\n    if (x < 10)\r\n        x = x + 5;\r\n    y = 0;\r\n    return y;\r\n    }\r\nsliceMe();"};
jalangiLabel1:
    while (true) {
        try {
            J$.Se(217, 'C:\\software\\jalangi2\\experiments\\Milestone2\\example_jalangi_.js', 'C:\\software\\jalangi2\\experiments\\Milestone2\\example.js');
            function sliceMe() {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(161, arguments.callee, this, arguments);
                            arguments = J$.N(169, 'arguments', arguments, 4);
                            J$.N(177, 'x', x, 0);
                            J$.N(185, 'y', y, 0);
                            var x = J$.X1(25, J$.W(17, 'x', J$.T(9, 5, 22, false), x, 1));
                            var y;
                            J$.X1(57, J$.M(49, J$.R(33, 'console', console, 2), 'log', 0)(J$.T(41, "Hello World", 21, false)));
                            if (J$.X1(241, J$.C(8, J$.B(10, '<', J$.R(65, 'x', x, 0), J$.T(73, 10, 22, false), 0))))
                                J$.X1(105, x = J$.W(97, 'x', J$.B(18, '+', J$.R(81, 'x', x, 0), J$.T(89, 5, 22, false), 0), x, 0));
                            J$.X1(129, y = J$.W(121, 'y', J$.T(113, 0, 22, false), y, 0));
                            return J$.X1(153, J$.Rt(145, J$.R(137, 'y', y, 0)));
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
