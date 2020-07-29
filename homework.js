class A {
    constructor() {
        this.nameA = 'a'
    }

    validateA() {
        console.log("A")
    }
}

class B extends A {
    constructor() {
        super()
        this.nameB = 'b'
    }

    validateB() {
        console.log("B")
    }
}

class C extends B {
    constructor() {
        super()
        this.nameC = 'c'
    }

    validateC() {
        console.log("C")
    }
}

function findMembers(instance, fieldPrefix, funcPrefix) {

    function recurse(instance) {
        // base case
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            return name.startsWith(fieldPrefix) || name.startsWith(funcPrefix)
        })

        return [...names, ...recurse(instance.__proto__)]
    }

    return recurse(instance)
}


var c = new C()

// 编写一个函数findMembers

const members = findMembers(c, 'name', 'validate')
console.log(members)

// 原型链 查找
