import React, { Component } from 'react';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0
    }

    this.handleDepositClick = this.handleDepositClick.bind(this)
  }

  handleDepositClick(e, transaction) {
    e.preventDefault();
    if (isNaN(this.refs.amount.value) || this.refs.amount.value.includes('-')) {
      console.log("Invalid input");
    }
    else {
      if (this.refs.amount.value > this.state.balance && transaction === 'withdrawl') {
        console.log("Overdraw not enabled");
        return;
      }
      let amount = transaction==='deposit' ? +this.refs.amount.value : -this.refs.amount.value;
      let newBalance = this.state.balance + amount;
      this.setState({
        balance: newBalance
      })
      this.refs.amount.value = '';
    }
  }

  render() {
    let balanceClass = 'balance';
    if (this.state.balance === 0) {
      balanceClass += ' zero';
    }

    return (
      <div className="account">
        <h2>{this.props.name}</h2>
        <div className={balanceClass}>${this.state.balance}</div>
        <input type="text" placeholder="enter an amount" ref="amount" />
        <input type="button" value="Deposit" onClick={(e)=>{this.handleDepositClick(e, 'deposit')}} />
        <input type="button" value="Withdrawl" onClick={(e)=>{this.handleDepositClick(e, 'withdrawl')}} />
      </div>
    )
  }
}
