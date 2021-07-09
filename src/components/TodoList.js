import React from "react";
class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            title: '',
            checked: []
        };
    }
    async componentDidMount() {
        await fetch('https://60deca4fabbdd9001722d054.mockapi.io/blogs')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    list: data
                })
            })
            .catch(console.log)
    }

    handChange = e => {
        this.setState({ title: e.target.value });
    }

    handleClick = () => {
        if(this.state.title ==='')
        {
            alert('ko dc de trong')
        }
        const kieen = this.state.list;// 
        fetch('https://60deca4fabbdd9001722d054.mockapi.io/blogs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.title
            })//
        })
            .then((res) => res.json())
            .then((data) => {
                kieen.push(data)
                console.log(data)
                this.setState({
                    list: kieen
                })
            })
            .catch(console.log)
    }
    // handleDelete = (id) => {
    //     fetch('https://60deca4fabbdd9001722d054.mockapi.io/blogs/'+id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const newdata = this.state.list.filter(data =>data.id !==id)
    //             console.log(data)
    //             this.setState({
    //                 list: newdata
    //             })
    //         })
    //         .catch(console.log)
    //     }
    
    checkedBox = (id) => {
        const getchecked= this.state.checked.findIndex(e=> e===id)
        if(getchecked > -1)
        {
            return true;
        }
        else{
            return false;
        }

    }
    changeCheck = (id) => {
          const index = this.state.checked.findIndex(e=> e===id)
          if(index > -1)
          {
              const remove=this.state.checked.filter(e => e!==id)
              this.setState({
                  checked: remove
              })
          }
          else{
              const pushs = this.state.checked;
              pushs.push(id)
              this.setState({
                  checked: pushs
              })
          }
        //   console.log(this.state.checked)
    }
    handleDelete = (id) => {
          const abc=this.state.checked;
          let bcd=this.state.list;
        //   for(let i=0; i<abc.length; i++)
        //   {
        //       bcd=bcd.filter(e=> e.id!==abc[i])
        //   }
        abc.forEach(element => {
            bcd=bcd.filter(e => e.id !== element )
        });
          this.setState({
              list: bcd
          })
    }
    render() {
        return (
            <div className="check">
                <div className="add-todo">
                    <input type="text" placeholder="Add item" value={this.state.title} onChange={this.handChange} className="input"></input>
                    <button className="btn-add" onClick={this.handleClick}>ADD</button>
                </div>
                {this.state.list.map(e => (
                    <div className="content" key={e.id}>
                        <input type="checkbox" checked={this.checkedBox(e.id)} onChange={() => this.changeCheck(e.id)} className="box"></input>
                        <p >{e.name}</p>
                        {/* <button onClick={()=>this.handleDelete(e.id)} >Delete</button> */}
                    </div>
                ))}
                <button onClick={ this.handleDelete} className="delete">Delete</button>
            </div>
        )

    }
}
export default TodoList;