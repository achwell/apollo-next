interface Animal {
    name: string
    group: string | undefined
    setGroup(group: string): void
}

class Cat implements Animal {
    name: string
    group: string | undefined
    constructor(name: string) {
        this.name = name
    }
    setGroup(group: string): void {
        this.group = group
    }
}

class Dog implements Animal {
    name: string
    group: string | undefined
    constructor(name: string) {
        this.name = name
    }
    setGroup(group: string): void {
        this.group = group
    }
    bark() { }
}

interface AnimalConstructor<T> {
    new(name: string): T
}
function initializeAnimal<T extends Animal>(a: AnimalConstructor<T>, name: string) {
    const animal = new a(name)
    animal.name = name
    animal.setGroup('mamals')
    return animal
}

const cat = initializeAnimal(Cat, 'Felix')
const dog = initializeAnimal(Dog, 'Ava')

dog.bark()
console.log({ cat })
console.log({ dog })
