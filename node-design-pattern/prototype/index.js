function Movie(title) {
    this.title = title
  }
  
  const harryPotter = new Movie('Harry Potter')
  const rushHour2 = new Movie('Rush Hour 2')
  const fastAndFurious = new Movie('Fast And Furious')
  
  console.log(harryPotter)
  console.log(rushHour2)
  console.log(fastAndFurious)

// The prototype design pattern simply creates copies of existing functional objects as opposed to defining brand new objects.

// The biggest benefit of using the pattern in JavaScript is the performance boost gained as opposed to object oriented classes. This means that when you define functions inside an object, they will be created by reference. In other words, all child objects will point to the same method instead of creating their own individual copies!