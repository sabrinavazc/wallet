import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUserAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidEmail: true,
  };

  handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      const isValidEmail = /\S+@\S+\.\S+/.test(value);
      this.setState({ [name]: value, isValidEmail });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleUpdateUser = (e) => {
    e.preventDefault();

    const { history, dispatchSetUserAction } = this.props;
    const { email } = this.state;

    dispatchSetUserAction(email);

    // e aqui pra eu mudar de página depois do evento eu dou um:
    history.push('/carteira');
  };

  render() {
    const { email, password, isValidEmail } = this.state;
    const minLengthDisable = 6;
    const regex = /\S+@\S+\.\S+/;
    const showInvalidEmailMessage = email.length > minLengthDisable && !isValidEmail;
    return (
      <form className="login-container">

        <h1 className="title">TrybeWallet</h1>

        <label htmlFor="email">
          <input
            id="email"
            type="text"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ (event) => this.handleChange(event) }
            placeholder="E-mail"
          />
        </label>

        <label htmlFor="senha">
          <input
            id="senha"
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ (event) => this.handleChange(event) }
            placeholder="Senha"
          />
        </label>

        {
          showInvalidEmailMessage
        && <p>Por favor, insira um email válido, como alguem@alguem.com</p>
        }

        <button
          disabled={ !regex.test(email) || password.length < minLengthDisable }
          onClick={ this.handleUpdateUser }
        >
          Entrar
        </button>

      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetUserAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUserAction: (email) => dispatch(setUserAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
