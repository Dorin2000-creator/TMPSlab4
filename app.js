// Command Pattern
class Command {
    constructor(execute, undo) {
      this.execute = execute;
      this.undo = undo;
    }
  }
  
  // Observer Pattern
  class ObserverList {
    constructor() {
      this.observerList = [];
    }
  
    add(observer) {
      this.observerList.push(observer);
    }
  
    remove(observer) {
      this.observerList = this.observerList.filter(obs => obs !== observer);
    }
  
    notify(data) {
      this.observerList.forEach(observer => observer.update(data));
    }
  }
  
  // Memento Pattern
  class Memento {
    constructor(state) {
      this.state = state;
    }
  
    getState() {
      return this.state;
    }
  }
  
  class Caretaker {
    constructor() {
      this.mementos = [];
    }
  
    addMemento(memento) {
      this.mementos.push(memento);
    }
  
    getMemento() {
      return this.mementos.pop();
    }
  }
  
  // Template Method Pattern
  class ListTemplate {
    constructor() {
      if (this.constructor === ListTemplate) {
        throw new Error("Cannot instantiate abstract class");
      }
    }
  
    render() {
      this.createItem();
      this.addItemToList();
    }
  }
  
  class TodoItemTemplate extends ListTemplate {
    constructor(value) {
      super();
      this.value = value;
    }
  
    createItem() {
      const li = document.createElement("li");
      li.textContent = this.value;
      li.addEventListener("click", () => {
        const command = new Command(
          () => {
            li.remove();
          },
          () => {
            const list = document.getElementById("todo-list");
            list.appendChild(li);
          }
        );
  
        command.execute();
        commandObserver.notify(command);
        caretaker.addMemento(new Memento(command));
      });
      this.item = li;
    }
  
    addItemToList() {
      const list = document.getElementById("todo-list");
      list.appendChild(this.item);
    }
  }
  
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const undoButton = document.getElementById("undo-button");
  
  const commandObserver = new ObserverList();
  const caretaker = new Caretaker();
  
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const todoItem = new TodoItemTemplate(todoInput.value);
    todoItem.render();
  
    todoInput.value = "";
  });
  
  commandObserver.add({
    update: (command) => {
      command.execute();
    },
  });
  
  undoButton.addEventListener("click", () => {
    const memento = caretaker.getMemento();
    if (memento) {
      memento.getState().undo();
    }
  });
  