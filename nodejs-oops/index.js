class Vehicle {

    constructor(name , maker, engine){
        this.name= name;
        this.engine = engine;
        this.maker = maker;
    }
    getDetails(){
        return (`the name is ${this.name}`)
    }
}

let bike1 = new Vehicle('abc', 'maker1', '123')
let bike2 = new Vehicle('pqr', 'maker2', '789')

console.log(bike1.getDetails())