const test = require("tape");

test("five times two is four", t => {
  t.equals(2 * 2, 4, "should equal four");
  t.end();
});

test("two times three is six", t => {
  t.equals(2 * 3, 6, "should equal six");
  t.end();
});

test("two times four is eight", t => {
  t.equals(2 * 4, 8, "should equal eight");
  t.end();
});

test("two times five is ten", t => {
  t.equals(2 * 5, 10, "should equal ten");
  t.end();
});
