## Cuprins

- [Command Pattern](#command-pattern)
- [Observer Pattern](#observer-pattern)
- [Memento Pattern](#memento-pattern)
- [Template Method Pattern](#template-method-pattern)

## Command Pattern:
Command Pattern încapsulează o solicitare ca un obiect, permițând parametrizarea clienților cu diferite solicitări, cozi sau jurnale de solicitări și suportul pentru anularea operațiunilor. În codul de mai sus, Command Pattern este utilizat pentru a reprezenta acțiunile care pot fi efectuate și anulate într-un obiect.
```
class Command {
  constructor(execute, undo) {
    this.execute = execute;
    this.undo = undo;
  }
}
```
## Observer Pattern:
Observer Pattern definește o relație între un obiect și mai mulți observatori, astfel încât atunci când obiectul se modifică, toți observatorii săi sunt notificați. În acest caz, obiectul este ObserverList, iar observatorii sunt adăugați, eliminați sau notificați cu metodele respective.

```
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
```
## Memento Pattern:
Memento Pattern oferă posibilitatea de a restaura starea unui obiect la o stare anterioară, fără a expune detaliile interne ale acestuia. În acest cod, Memento Pattern este utilizat pentru a salva starea unui obiect Command și a reveni la starea respectivă în cazul în care este necesar.

```
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
```
## Template Method Pattern:
Template Method Pattern definește scheletul unei operații într-o metodă, amânând unele etape ale acesteia la metodele secundare. În acest caz, ListTemplate este o clasă abstractă care definește o metodă render(). Aceasta este extinsă de TodoItemTemplate, care oferă implementarea metodelor secundare pentru a crea și adăuga elemente în listă.

```
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
    // ...
  }

  addItemToList() {
    // ...
  }
}
```