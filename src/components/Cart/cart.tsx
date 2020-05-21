import React from "react";
interface State {
    shoppingItems: String[],
    items: any
    // countBeans: number,
    // countCokes: number,
    // countOranges: number
}
class Cart extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            shoppingItems: ['Beans', 'Coke', 'Oranges'],
            items: {
            countBeans: 0,
            countCokes: 0,
            countOranges: 0
            }
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem(item: String): any {
        switch(item){
            case "Beans":
                this.setState({
                    items: {
                        countBeans: this.state.items.countBeans + 1,
                        countCokes: this.state.items.countCokes,
                        countOranges: this.state.items.countOranges
                    }
                });
                break;

            case "Coke":
                this.setState({
                    items: {
                        countBeans: this.state.items.countBeans,
                        countCokes: this.state.items.countCokes + 1,
                        countOranges: this.state.items.countOranges
                    }
                });
                break;

            case "Oranges":
                this.setState({
                    items: {
                        countBeans: this.state.items.countBeans,
                        countCokes: this.state.items.countCokes,
                        countOranges: this.state.items.countOranges + 1
                    }
                });
                break;
            default:
                console.log('Unknown item, should throw an error');
                break;
        }
        return '';
    }

render() {
    return (
        <div className="container">
        <h2>Store</h2>
        <div className="row">
          <div className="col-sm">
            <h3>Available Items</h3>
            <p>Click an item to add it to your basket</p>
            <div className="list-group">
              {this.state.shoppingItems.map((item, index) => <button type="button" key={index} onClick={() => this.addItem(item)} className="list-group-item list-group-item-action">{item}</button> )}
            </div>
          </div>
          <div className="col-sm">
           <h3>Basket</h3>
           <p>Below is your selection of items</p>
           <div className="list-group">
            <li className="list-group-item">Beans: {this.state.items.countBeans}</li>
            <li className="list-group-item">Cokes: {this.state.items.countCokes}</li>
            <li className="list-group-item">Oranges: {this.state.items.countOranges}</li>
           </div>
          </div>
          <div className="col-sm">
            <h3>Totals</h3>
            <p>Totals, Savings & more..</p>
            <div className="list-group">
            <li className="list-group-item">Subtotal: {this.state.items.countBeans}£</li>
            <li className="list-group-item">Savings: -{this.state.items.countCokes}£</li>
            <li className="list-group-item">Total: {this.state.items.countOranges}£</li>
           </div>
          </div>
        </div>
      </div>
    )
    }
}

export default Cart;