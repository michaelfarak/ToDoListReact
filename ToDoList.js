class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
    }



    render(){
        {this.props.ItemList.map()}
        return (
            <li></li>
        )
    }
}






class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numOfItems : 0,
            ItemList : [],
        }
        this.AddItem = this.AddItem.bind(this),
    }
    
    AddItem() {
        var NewItem = this.state.ItemList;
        NewItem.push(<li></li>);
        this.setState ({
            ItemList: NewItem,
        })
        this.state.numOfItems = this.state.numOfItems +1;
    }



    render(){
        return(
            <div>
                <input id="InputToDo" type="text" placeholder="enter things to do"/>
                <button id="InputBtn" type="submit">Add to list</button>
                <ul>
                    <ToDoListItem/>
                </ul>
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
                <ToDoList/>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)

