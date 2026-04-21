const personArray = [
    {
        name:`isaac`,
        age: 20,
        country:`china`
    },
    {
        name:`john`,
        age: 19,
        country:`usa`
    },
    {
        name:`james`,
        age: 11,
        country:`india`
    },
] 

let checkAge = personArray.every(person => person.age > 18) 

console.log(checkAge)