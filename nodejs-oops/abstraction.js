function person(fname, lname){
    
    let firstName = fname;
    let lastName = lname; 

    let getDetails_noaccess = function(){
        return (`Name is ${firstName} ${lastName}`);
    }

    this.getDetails_access = function(){

        return (`Name is ${firstName} ${lastName}`);
    }
}

let person1 = new person('abc', 'xyz');

console.log(person1.firstName);
console.log(person1.getDetails_noaccess);
console.log(person1.getDetails_access())