import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const currency = 'BRL';

    const totalField = expenses.reduce((acc, expense) => {
      if (expense.exchangeRates && expense.exchangeRates[expense.currency]) {
        acc += Number(expense.value) * expense.exchangeRates[expense.currency].ask;
      }
      return acc;
    }, 0).toFixed(2);

    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{totalField}</span>
        <span data-testid="header-currency-field">{currency}</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          ask: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
