let a = 100; let b = 20; let c = 15
let m = 0
let summation = 0
// recurring till n>b for f(n)
let FunC = function fn(n) {
    if (n < b) return m
    m += n - c;
    fn(n++)
}
// recurring till the n>b for f(a+f(n)+.....f(b))
const result = (n) => {
    if (!n) return summation
    if (n <= b) return summation += result(a + result(n + 1));
}
console.log(result(2000))