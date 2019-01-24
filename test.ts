const obj1 = {
    a: 1,
    b: 2
};

const obj2 = {
    a: 3,
    d: 4
};

const obj3 = obj1;
obj3.a = 7;

console.log(obj3);
console.log(obj1);
