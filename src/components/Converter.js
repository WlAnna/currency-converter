import React from 'react'
import CurrencyComponent from './CurrencyComponent'
import Header from './Header'
import Footer from './Footer'

class Converter extends React.Component {
    constructor() {
        super()
        this.fetchData = this.fetchData.bind(this);
        this.state={
           rates: [],
           id: "",
           rate: '',
           currency: "",
           amount: "",
           base: "",
           error: "",
           select1: "Currency I have",
           select2: "Currency I want"
        }
    }

    componentDidMount = () => this.fetchData(this.state.base);

    fetchData = (base) => {
        try {
            if( base.length > 4 ) {
                this.setState({
                    rate: 0
                })
                return
            } else {
                const state = base 
                fetch(`https://api.exchangeratesapi.io/latest?base=${state}`)
                .then(response => response.json())
                .then(response => {
                    console.log(response.base)
                    console.log(response.rates)
                    const rates = Object.entries(response.rates);
                    this.setState({
                        rates
                    })
                })
            }

        } catch (e) {
            console.error(err);
        }
    }

    handleChange = (e) => {
        const {name, value, options, selectedIndex } = e.target
 
        this.setState({
            [name]: value
        })

        if(this.state.amount === "") {
            this.setState({
                error: "Enter Amount"
            })
        } else {
            this.setState({
                error: ""
            })
        }
    }

    handleChangeBase = (e) => {
        const {name, value, options, selectedIndex } = e.target
        console.log(options[selectedIndex].innerHTML)
        this.setState({
            base: options[selectedIndex].innerHTML
        })
    }

    handleReset = () => {
        console.log('reset')
    }
    
    render() {
        const currencyRates = this.state.rates
        const currencyList = currencyRates.map(([currency, rate], i) => {
           return <option key={i} value={rate}>{currency}</option>
          })

        const { base, amount, rate} = this.state


        let placeholderResult = ""
        if (rate =="select") {
            placeholderResult = "0.00"
        } else if ( base =="Currency I have" ) {
            placeholderResult = "0.00"
        } else {
            placeholderResult=(amount * rate).toFixed(2)
        }
    
        if (rate == "") {
            placeholderResult = "0.00"
        }
        if(base == "" && amount != "") {
            placeholderResult = "0.00"
        }
     
        return (
            <div>
                <Header />
                <CurrencyComponent 
                    handleChange={this.handleChange}
                    handleChangeBase={this.handleChangeBase}
                    handleReset={this.handleReset}
                    {...this.state}
                    currencyList={currencyList}
                    placeholderResult={placeholderResult}
                />
                <Footer />
            </div>
        )
    }
}

export default Converter