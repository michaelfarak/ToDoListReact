class DoneItem extends React.Component {
    constructor(props) {
        super(props);
        this.returning = this.returning.bind(this)
        this.deleteDone = this.deleteDone.bind(this)
    }
    deleteDone(event) {
        this.props.deleteDone(event.target.parentElement)
    }
    returning(event) {
        this.props.returning(event)
    }
    render() {

        return (

            <ul id="doneList"> Things Done dude
                {this.props.ItemDoneList.map((NewItemDone) => <li key={NewItemDone.key}>{NewItemDone.text + `     ` }<button className="fa fa-arrow-circle-left" onClick={this.returning}></button><button className="fa fa-trash" onClick={this.deleteDone}></button></li>)}
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
        event.remove()
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


    handleClick(event) {
        this.props.handleClick(event.target.parentElement)//delete
    }

    render() {

        return (
            <div>
                <ul id="doList">Things to do dude
        {this.props.ItemList.map((NewItem) => <li key={NewItem.key}>{NewItem.text}<button className="fa fa-check-circle" onClick={this.checkItems}></button><button className="fa fa-trash" onClick={this.handleClick}></button></li>)}
                </ul>
                <DoneItem deleteDone={this.deleteDoneItems} returning={this.returnItems} ItemDoneList={this.state.ItemDoneList} />
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
        event.remove()
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
                    <input ref={input => { this.textInput = input; }} id="InputToDo" type="text" placeholder="enter things to do" />
                    <button onClick={this.AddItem} id="InputBtn" type="submit">Add to list</button>
                    <ToDoListItem returnItems={this.ReturnFromDone} handleClick={this.delete} ItemList={this.state.ItemList}>

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

