class Node {

  constructor({parent,value}={}) {

    this.parent = parent
    this.children = {}
    this.isName = false
    this.value = null 
    this.freq = 0

  }

}

class Trie {

  constructor(names) {

    this.names = names
    this.cache = {}
    this.root = new Node()

  }

  build() {

    for (let name of this.names) {

      let node = this.root
      for (let c of name) {

        if (!node.children[c]) 
          node.children[c] = new Node({ parent: node, value: c })

        node = node.children[c]

      }

      node.isName = true
      node.value = name

    }

  }

  show() { 

    const node = this.root

    Object.keys(node.children)
      .map(key => node.children[key])
      .map(child => child.value)
      .forEach(console.log)

  }

  _findName(name='') {

    let node = this.root

    for (let c of name) {

      if (!node.children[c])
        return null

      node = node.children[c]
    } 

    if (node.isName)
      node.freq += 1

    return node.isName ? node : null

  }
  _findSuggestions(node, name, suggestions=[]) {
    // start at node and traverse all children until you node w/ no children
    // when isName is true, append node.value to suggestions
    // also need
  }

  find(name='') {

    if (name in this.cache)
      return this.cache[name]

    let node = this._find(name)

    let suggestions = _findSuggestions(node, name, [])
    this.cache[name] = { node, suggestions } 

    return this.cache[name]

  }

  remove(name) {
    // only remove characters from end of word while they have no dependents
  }

}

module.exports = exports = Trie
