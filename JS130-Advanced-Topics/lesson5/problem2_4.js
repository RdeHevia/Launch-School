setTimeout(function() {     // 0s: 1
  setTimeout(function() {   // 10s: 6
    q();                    // 25s: 13 q
  }, 15);

  d();                      // 10s: 7 d

  setTimeout(function() {   // 10s: 8
    n();                    // 15s: 11 n
  }, 5);

  z();                      // 10s: 9 z
}, 10);

setTimeout(function() {   // 0s: 2
  s();                    // 20s: 12 s
}, 20);

setTimeout(function() {   // 0s: 3
  f();                    // 0s: 5 f (minimum delay is 4s)
});

g();                     // 0s: 4 g

// g -> f -> d -> z -> n -> s -> q