const test = require("tape");

test("two plus two is four", t => {
  t.equals(2 + 2, 4, "should equal four");
  t.end();
});

test("two plus three is five", t => {
  t.equals(2 + 2, 5, "should equal five");
  t.end();
});

test("two plus four is six", t => {
  t.equals(2 + 4, 6, "should equal six");
  t.end();
});

test("two plus five is seven", t => {
  t.equals(2 + 5, 7, "should equal seven");
  t.end();
});

test("two plus six is eight", t => {
  t.equals(2 + 5, 8, "should equal eight");
  t.end();
});
