import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const { exchangeRates } = expense;
              const exchangeValue = Number(expense.value)
            * Number(exchangeRates[expense.currency].ask);
              return (
                <>
                  <tr key={ expense.id }>
                    <td>{ expense.description }</td>
                    <td>{ expense.tag }</td>
                    <td>{ expense.method }</td>
                    <td>{ Number(expense.value).toFixed(2)}</td>
                    <td>{ exchangeRates[expense.currency].name }</td>
                    <td>{ Number(exchangeRates[expense.currency].ask).toFixed(2) }</td>
                    <td>{Number(exchangeValue).toFixed(2)}</td>
                    <td>Real</td>
                  </tr>
                  {/* <button>Remover</button>
                  <button>editar</button> */}
                </>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      currency: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
