import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setWalletAction } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    description: '',
    tag: 'Alimentação',
    value: '',
    method: 'Dinheiro',
    currencies: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');

      this.setState({ currencies, isLoading: false }); // Atualiza o estado e indica que os dados foram carregados

      const { setWalletAction: dispatchSetWalletAction } = this.props;

      dispatchSetWalletAction({ currencies });
    } catch (error) {
      console.error('Não foi possível buscar moedas:', error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      value,
      description,
      method,
      tag,
      currencies,
      currency,
      isLoading,
    } = this.state;

    // Verifica se os dados estão sendo carregados
    if (isLoading) {
      return <div>Carregando...</div>;
    }

    return (
      // <form onSubmit={ this.handleSubmit }>
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
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((curr, index) => (
              <option key={ index } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>

      </form>
    );
  }
}

WalletForm.propTypes = {
  setWalletAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = {
  setWalletAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
