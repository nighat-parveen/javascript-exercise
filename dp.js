

// Approch recusrion + memoization - bottom up
// function fib(n) {
//     if(n === 0 || n === 1) return n;
//     return fib(n-2) + fib(n-1);
// }
// approcah 2 memoiztion
function fib(n,dp){
    if(n === 0 || n === 1) return n;

    if(dp[n]!==undefined) return dp[n];

    dp[n] = fib(n-2, dp) + fib(n-1, dp);

    return dp[n];
}

// space optimization
function fib3(n) {
    if(n == 0 || n==1) return n;
    prev1 = 0;
    prev2 = 1;
    let curr;
    for(let i = 2;i<n;i++) {
        curr = prev1 + prev2;
        prev1 = prev2;
        prev2 = curr;
    }
    return prev1 + prev2;
}




let x = 10;
let dp = [];
dp[0] = 0;
dp[1] = 1;
// const result  = fib(x, dp);
const result = fib3(x);
// console.log(dp);
console.log(result);