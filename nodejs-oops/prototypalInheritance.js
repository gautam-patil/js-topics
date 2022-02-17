function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.area = function (){
    var radius = this.radius;
    return Math.PI * radius * radius;
}

Circle.prototype.circumference = function (){
    return 2 * Math.PI * this.radius;
}

var circle = new Circle(10);

console.log(circle.area())