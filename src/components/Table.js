import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions/index';

class Table extends Component {
  // state = {
  //   // editingExpense: null,
  // };

  handleDeleteExpense = (e, id) => {
    e.preventDefault();
    const { dispatchDeleteExpense } = this.props;
    dispatchDeleteExpense(id);
  };

  // handleEditExpense = (e, id) => {
  //   e.preventDefault();
  //   const { expenses } = this.props;
  //   const expenseToEdit = expenses.find((expense) => expense.id === id);
  //   // this.setState({ editingExpense: expenseToEdit });
  // };

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
          {expenses.map((expense) => {
            const { exchangeRates } = expense;
            const exchangeValue = Number(expense.value)
            * Number(exchangeRates[expense.currency].ask);
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{exchangeRates[expense.currency].name}</td>
                <td>{Number(exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>{Number(exchangeValue).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ (e) => this.handleDeleteExpense(e, expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    // onClick={ () => this.handleEditExpense(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
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
  dispatchDeleteExpense: PropTypes.func.isRequired,
  // dispatchEditExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (id) => dispatch(deleteExpense(id)),
  dispatchEditExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
