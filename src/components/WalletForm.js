import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchNewExpense } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    isLoading: true,
  };

  componentDidMount() {
    const count = 1500;
    const { dispatchFetchCurrencies } = this.props;
    this.timer = setInterval(() => {
      dispatchFetchCurrencies()
        .then(() => {
          this.setState({ isLoading: false });
          clearInterval(this.timer);
        });
    }, count);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSetNewExpense = (e) => {
    e.preventDefault();
    const { dispatchFetchNewExpense: setNewExpense } = this.props;
    setNewExpense(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      isLoading,
    } = this.state;
    const { wallet } = this.props;
    const { currencies } = wallet;

    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ (e) => this.handleChange(e) }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa
          <input
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ (e) => this.handleChange(e) }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria da despesa
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ (e) => this.handleChange(e) }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="currency">
          Moeda
          {isLoading ? '...' : null}
          {!isLoading && (
            <select
              id="currency"
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ (e) => this.handleChange(e) }
            >
              {currencies.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>
              ))}
            </select>
          )}
        </label>
        <button onClick={ (e) => this.handleSetNewExpense(e) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dispatchFetchNewExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchFetchNewExpense:
  (expense) => dispatch(fetchNewExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
