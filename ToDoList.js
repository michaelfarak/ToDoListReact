class DoneItem extends React.Component {
    constructor(props) {
        super(props);
        this.returning = this.returning.bind(this)
        this.deleteDone = this.deleteDone.bind(this)
    }
    deleteDone(event) {
        this.props.deleteDone(event)
    }
    returning(event) {
        this.props.returning(event)
    }

    render() {
        return (
            <ul id="doneList"> Done Tasks
                {this.props.ItemDoneList.map((NewItemDone) => <li key={NewItemDone.key}>{NewItemDone.text}<button className="fa fa-arrow-circle-left" onClick={this.returning}></button><button id={NewItemDone.key} className="fa fa-trash" onClick={this.deleteDone}></button></li>)}
            </ul>
        )
    }
}

class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.checkItems = this.checkItems.bind(this)
        this.returnItems = this.returnItems.bind(this)
        this.deleteDoneItems = this.deleteDoneItems.bind(this)
        this.state = {
            numOfItemsDone: 0,
            ItemDoneList: [],
        }
    }
    deleteDoneItems(event) {
        console.log(event.target.id)
        event.target.parentElement.remove()
        var updatesDone = JSON.parse(localStorage.getItem("listOfTaskDone"))
        updatesDone.splice(event.target.id, 1)
        var updateDone = JSON.stringify(updatesDone)
        localStorage.setItem("listOfTaskDone", updateDone);
    }

    checkItems(event) {
        var NewItemDone = {
            text: event.target.parentElement.textContent,
            key: this.state.numOfItemsDone
        };
        this.state.ItemDoneList.push(NewItemDone)
        this.setState({
            ItemDoneList: this.state.ItemDoneList,
        })
        this.state.numOfItemsDone = this.state.numOfItemsDone + 1;

        event.target.parentElement.remove(); // remove when checked
    }

    returnItems(event) {
        this.props.returnItems(event);
    }

    componentWillMount() {
        localStorage.getItem("listOfTaskDone") && this.setState({
            ItemDoneList: JSON.parse(localStorage.getItem("listOfTaskDone"))
        })
    }

    componentDidUpdate(nextProps, nextState) {
        localStorage.setItem("listOfTaskDone", JSON.stringify(this.state.ItemDoneList))
    }

    handleClick(event) {
        console.log(event)
        this.props.handleClick(event)//delete
    }

    render() {

        return (

            <div>
                <ul id="doList">Task List
        {this.props.ItemList.map((NewItem) => <li key={NewItem.key}>{NewItem.text}<button className="fa fa-check-circle" onClick={this.checkItems}></button><button id={NewItem.key} className="fa fa-trash" onClick={this.handleClick}></button></li>)}
                </ul>
                <div>
                    <DoneItem deleteDone={this.deleteDoneItems} returning={this.returnItems} id={this.state.numOfItemsDone} ItemDoneList={this.state.ItemDoneList} />
                </div>
            </div>
        )
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.AddItem = this.AddItem.bind(this)
        this.delete = this.delete.bind(this)
        this.ReturnFromDone = this.ReturnFromDone.bind(this)
        this.state = {
            numOfItems: 0,
            ItemList: [],
        }
    }

    ReturnFromDone(event) {
        var returnItem = {
            text: event.target.parentElement.textContent,
            key: this.state.numOfItems
        }
        this.state.ItemList.push(returnItem)
        this.setState({
            ItemList: this.state.ItemList,
        })
        this.state.numOfItems = this.state.numOfItems + 1;
        event.target.parentElement.remove()
    }

    AddItem(event) {
        event.preventDefault();
        if (this.textInput.value != "") {
            var NewItem = {
                text: this.textInput.value,
                key: this.state.numOfItems
            };
            this.state.ItemList.push(NewItem)
            this.setState({
                ItemList: this.state.ItemList,
            })
            this.state.numOfItems = this.state.numOfItems + 1;
            this.textInput.value = "";
        } else {
            null;
        }
    }

    delete(event) {
        console.log(event.target.id)
        event.target.parentElement.remove()
        var update = JSON.parse(localStorage.getItem("listOfTask"))
        update.splice(event.target.id)
        var updates = JSON.stringify(update)
        localStorage.setItem("listOfTask", updates);
    }
    componentWillMount() {
        localStorage.getItem("listOfTask") && this.setState({
            ItemList: JSON.parse(localStorage.getItem("listOfTask"))
        })
    }

    componentDidUpdate(nextProps, nextState) {
        localStorage.setItem("listOfTask", JSON.stringify(this.state.ItemList))
    }

    render() {
        return (
            <div>
                <nav id="header" class="navbar navbar-light">
                    <a class="navbar-brand" href="#">
                        <img src="http://www.pngmart.com/files/2/Duck-PNG-Clipart.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                        <span id="title">Ducket List</span>
                    </a>
                </nav>
                <div id="container">
                    <div id="input">
                        <input ref={input => { this.textInput = input; }} id="InputToDo" type="text" placeholder="Type a new task" />
                        <button onClick={this.AddItem} id="InputBtn" type="submit">Add to task list</button>
                    </div>
                    <ToDoListItem returnItems={this.ReturnFromDone} handleClick={this.delete} id={this.state.numOfItems} ItemList={this.state.ItemList}>
                    </ToDoListItem>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ToDoList />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)

