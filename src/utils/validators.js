/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */

export const validateCpf = () => ({
    validator(rule, value) {
        if (value && value !== "") {
            value = value.replace(/\D/g, '');
            if (value.toString().length != 11 || /^(\d)\1{10}$/.test(value))
                return Promise.reject("CPF Inválido");

            var result = true;
            [9, 10].forEach(function (j) {
                var soma = 0, r;
                value.split(/(?=)/).splice(0, j).forEach(function (e, i) {
                    soma += parseInt(e) * ((j + 2) - (i + 1));
                });
                r = soma % 11;
                r = (r < 2) ? 0 : 11 - r;
                if (r != value.substring(j, j + 1)) result = false;
            });

            if (result)
                return Promise.resolve();
            else
                return Promise.reject("CPF Inválido");
        } else {
            return Promise.reject();
        }
    },
});

export const validatePassword = () => ({
    validator(rule, value) {
        if (value) {
            if (value.length < 8) {
                return Promise.reject("Mínimo 8 caracteres");
            } else if (value.length > 50) {
                return Promise.reject("Senha muito grande");
            } else if (value.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
                return Promise.reject("Senha inválida");
            }
        }
        return Promise.resolve();
    },
});

// only works if the password Form.Item is named 'password'
export const validatePasswordConfirm = ({ getFieldValue }) => ({
    validator(rule, value) {
        if (getFieldValue('password') !== value) {
            return Promise.reject('Digite a mesma senha');
        }
        return Promise.resolve();
    },
});

// only works if the email Form.Item is named 'email'
export const validateEmailConfirm = ({ getFieldValue }) => ({
    validator(rule, value) {
        if (getFieldValue('email') !== value) {
            return Promise.reject('Digite o mesmo e-mail');
        }
        return Promise.resolve();
    },
});