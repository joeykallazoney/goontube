import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { makePacket } from '../util'
import { Modal, Button, ButtonInput, ButtonGroup, ButtonToolbar, Input, Alert } from 'react-bootstrap'
import p from '../protocol'

function mapStateToProps(state) {
    return {
        usernameInput:  state.auth.usernameInput,
        passwordInput:  state.auth.passwordInput,
        show:           (state.auth.loginModal === true)
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        username: {
            onInput: function(ev) {
                dispatch({ type: p.LOGIN_FORM_UPDATE_USERNAME, data: ev.target.value })
            }
        },
        password: {
            onInput: function(ev) {
                dispatch({ type: p.LOGIN_FORM_UPDATE_PASSWORD, data: ev.target.value })
            }
        },
        form: {
            onSubmitRegister: function(ev, user, pass) {
                ev.preventDefault()

                const packet = makePacket(p.REGISTRATION_ATTEMPT, {
                    username: user,
                    password: pass
                })

                props.socket.send(packet)
            },

            onSubmit: function(ev, user, pass) {
                ev.preventDefault()

                const packet = makePacket(p.AUTHENTICATION_ATTEMPT, {
                    username: user,
                    password: pass
                })

                props.socket.send(packet)
            }
        },

        closeButton: function() {
            dispatch({ type: 'LOGIN_MODAL_CLOSED' })
        },

        onHide: function() {
            dispatch({ type: 'LOGIN_MODAL_CLOSED' })
        }
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="login">
                <Modal {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={(ev) => this.props.form.onSubmit(ev,
                                this.props.usernameInput,
                                this.props.passwordInput)}
                            className="form-horizontal login-form">
                            <Input type="text"
                                value={this.props.userNameInput}
                                {...this.props.username}
                                label="Username"
                                labelClassName="col-xs-4"
                                wrapperClassName="col-xs-8" />

                            <Input type="password"
                                value={this.props.passwordInput}
                                {...this.props.password}
                                label="Password"
                                labelClassName="col-xs-4"
                                wrapperClassName="col-xs-8" />

                            <div className="form-group">
                                <div className="col-xs-offset-4 col-xs-8">
                                    <Alert bsStyle="warning">
                                        <strong>Debug mode:</strong> auth only checks that the username exists.
                                    </Alert>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-offset-4 col-xs-8">
                                    <ButtonToolbar>
                                        <ButtonGroup>
                                            <Button type="submit">Login</Button>
                                        </ButtonGroup>
                                        <ButtonGroup>
                                            <Button onClick={(ev) => this.props.form.onSubmitRegister(ev,
                                                    this.props.usernameInput,
                                                    this.props.passwordInput)}>
                                                Register
                                            </Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
