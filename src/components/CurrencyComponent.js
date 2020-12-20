import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

function CurrencyComponent(props) {
    return (
        <main className="container">
            <form>
                <div className="main__inner">
                    <div className="main__inner__inputs">
                        <div className="section__wrapper">
                            <input 
                                value={props.amount}
                                type="number"  
                                name="amount"
                                placeholder={"Enter Amount"}
                                style={{backgroundColor: props.base != "" && props.rate != "" && props.amount =="" ?  "#F7DADA" : ""}}
                                onChange={props.handleChange}
                            
                            />
                            <select
                                name="base"
                                onChange={props.handleChangeBase}
                            >
                            <option value="select">{props.select1}</option>
                            <option value="select">EUR</option>
                                {props.currencyList}
                            </select>
                        </div>

                        <div>
                            <FontAwesomeIcon icon={ faLongArrowAltRight } className="icon" />
                        </div>

                        <div className="section__wrapper">
                            <input 
                                readOnly value={
                                props.placeholderResult
                                    }
                                type="number"  
                                name="result"
                                style={{backgroundColor: "#F3F6F8"}}
                            />
                            <select
                                name="rate"
                                onChange={props.handleChange}
                                value={props.rate}
                            >
                            <option value="select">{props.select2}</option>
                                {props.currencyList}
                            </select>
                        </div>

                    </div>
                    <div className="button__wrapper">
                        <button className="button__reset" onClick={props.handleReset}>Reset</button>
                    </div>
                </div>
             </form>
        </main>
    )
}
export default CurrencyComponent