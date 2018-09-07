const names = [

  'Aaron',
  'Adam',
  'Adlai',
  'Adrian',
  'Agatha',
  'Ahmed',
  'Ahmet',
  'Aimee',
  'Al',
  'Alain',
  'Alan',
  'Alastair',
  'Albert',
  'Alberto',
  'Alejandro',
  'Alex',
  'Alexander',
  'Alexis',
  'Alf',
  'Alfred'

]


class Node {

  constructor({isWord=false} = {}) {
    this.isWord = isWord
    this.children = {}
  }

  build(names) {

    for (let name of names) {

      let node = this

      for (let c of name) {
        if (!node.children[c]) 
          node.children[c] = new Node()
        node = node.children[c]
      }

      node.isWord = true

    }
  }

  show() {
    console.log(JSON.stringify(this.children, null, 4))
  }

  find(name) {

    let nextNode = this

    for (let s of name) {
      if (!nextNode.children[s])
        return false
      nextNode = nextNode.children[s]
    } 

    return nextNode.isWord

  }

}


const trie = new Node()
trie.build(names)
console.log(trie.find('Alastair'))
