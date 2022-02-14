class person{
    constructor(name){
        this.name = name;
    }

    toString(){
        return (`Name of person: ${this.name}`);
    }
}

class student extends person{
    constructor(name, id){
        //super keyword for calling above class constructor
        super(name);
        this.id = id;
    }

    toString(){
        return (`${super.toString()}, Student ID: ${this.id}`);
    }
}

let student1 = new student('abc', 20);
console.log(student1.toString())