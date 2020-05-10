import React from 'react';
import { Form, Input, Icon, Button, Select, Avatar } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/authActions';
const {Option} = Select;
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    modulename: '',
    type: 'default'
  };
  handleChange = (e) => {
    const val = e.label
    console.log(val)
    this.setState({
      type: e.label
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm,
            this.state.type
        );
        console.log(this.state.modulename)        
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem>
            {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
              You must choose an avatar!
        <FormItem>
              {getFieldDecorator('avatar',{
                rules: [{required: true, message: 'Please provide an avatar! '}],
              })(<Select ref={ref => {
                    this._select = ref }} labelInValue defaultValue={this.state.value} style={{width: 120}} onChange={this.handleChange}>
                      <Option value="avatar1"><Avatar size={54} src="https://img.icons8.com/bubbles/100/000000/user.png" /></Option>
                      <Option value="avatar2"><Avatar size={54} src="https://img.icons8.com/ultraviolet/80/000000/user.png" /></Option>
                      <Option value="avatar3"><Avatar size={54} src="https://img.icons8.com/officel/80/000000/user.png" /></Option>
                      <Option value="avatar4"><Avatar size={54} src="https://img.icons8.com/color/96/000000/user.png" /></Option>
                      <Option value="avatar5"><Avatar size={54} src="https://img.icons8.com/ios/100/000000/user.png" /></Option>
                </Select>
                )}
        </FormItem>
        <FormItem>
        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
            Signup
        </Button>
        Or 
        <NavLink 
            style={{marginRight: '10px'}} 
            to='/login'> login as a teacher
        </NavLink>
        </FormItem>

      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2, modulename) => dispatch(actions.authSignup(username, email, password1, password2, modulename)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);