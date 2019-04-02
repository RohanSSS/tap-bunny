const test = require('tape');

test("two plus two is four", t => {
    t.equals(2+2, 4, "should equal four");
    t.end();
})

test("two plus three is five", t => {
    t.equals(2+3, 5, "should equal five");
    t.end();
})

test("two plus four is six", t => {
    t.equals(2+4, 10, "should equal six");
    t.end();
})