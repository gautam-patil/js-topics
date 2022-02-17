var circle = {
    create: function (radius){
        
        var circle = Object.create(this);
        circle.radius = radius;
        return circle;
    },
    area: function (){
        var radius = this.radius;
        return Math.PI * radius * radius;
    },
    circumference: function (){
        return 2* Math.PI * this.radius;
    }
}

var circle2 = circle.create(10);
console.log(circle2.create())