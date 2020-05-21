import React from "react";
interface State {
    shoppingItems: String[],
    items: any
    pricing: any
}

const VALUES = {
    beans: 0.5,
    coke: 0.7,
    oranges: 0.4,
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
            },
            pricing: {
                savings: 0,
                subtotal: 0,
                total: 0
            }
        };
        this.addItem = this.addItem.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
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
                }, () => {
                    this.calculatePrices();
                  });
                break;

            case "Coke":
                this.setState({
                    items: {
                        countBeans: this.state.items.countBeans,
                        countCokes: this.state.items.countCokes + 1,
                        countOranges: this.state.items.countOranges
                    }
                }, () => {
                    this.calculatePrices();
                  });
                break;

            case "Oranges":
                this.setState({
                    items: {
                        countBeans: this.state.items.countBeans,
                        countCokes: this.state.items.countCokes,
                        countOranges: this.state.items.countOranges + 1
                    }
                }, () => {
                    this.calculatePrices();
                  });
                break;
            default:
                console.log('Unknown item, should throw an error');
                break;
        }
        return '';
    }

    calculatePrices() {
        console.log({
            cokes: this.state.items.countCokes,
            beans: this.state.items.countBeans
        })
        // Calculate Total Value
        const totalBeans = this.state.items.countBeans * VALUES.beans;
        const totalCokes = this.state.items.countCokes * VALUES.coke;
        const totalOranges = this.state.items.countOranges * VALUES.oranges;
        const total = totalBeans + totalCokes + totalOranges;

        // Calculate Savings
        // Cokes
        let cokesWithPromo = 0;
        let cokeWithoutPromo = 0;
        let cokeCostsWithPromos = 0;
        let cokeSavings = 0;
        
        if (this.state.items.countCokes > 0) {
            cokesWithPromo = Math.floor(this.state.items.countCokes/2);
            cokeWithoutPromo = this.state.items.countCokes % 2;
            cokeCostsWithPromos = cokesWithPromo + (cokeWithoutPromo * 0.7);
            cokeSavings = totalCokes - cokeCostsWithPromos;
        }

        // Beans 
        let beansWithPromo = 0;
        let beansWithPromoCost = 0;
        let beansWithoutPromo = 0;
        let beansWithoutPromoCost = 0;
        let beansTotalWithSavings = 0;
        let beansSavings = 0;

        if (this.state.items.countBeans > 0) {
            // The number of tins of beans with a promo
            beansWithPromo = Math.floor(this.state.items.countBeans/3); // This is also fortunately the cost of the beans with Promos if you have 6 beans/3 = 2£ or 2 1£ deals.
            beansWithPromoCost = beansWithPromo * 1;
            beansWithoutPromo = this.state.items.countBeans % 3;
            beansWithoutPromoCost = beansWithoutPromo * 0.5;
            beansTotalWithSavings = beansWithPromoCost + beansWithoutPromoCost
            beansSavings = totalBeans - beansTotalWithSavings;
        }

        const totalSavings = cokeSavings + beansSavings;
        const subtotal = total - totalSavings;

        this.setState({
            pricing: {
                total: total.toFixed(2),
                savings: totalSavings.toFixed(2),
                subtotal: subtotal.toFixed(2)
            }
        })
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
                <li className="list-group-item">Total: {this.state.pricing.total}£</li>
                <li className="list-group-item">Savings: - {this.state.pricing.savings}£</li>
                <li className="list-group-item">Subtotal: {this.state.pricing.subtotal}£</li>
           </div>
          </div>
        </div>
      </div>
    )
    }
}

export default Cart;