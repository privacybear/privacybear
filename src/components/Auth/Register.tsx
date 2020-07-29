import React, { Component } from 'react'
import Layout from "./Layout";
import { Title, Buttons, Logo } from '../design';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { Link, Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import { serverURL } from '../server-config';
import { postData, setCredentials, checkCredentials } from './auth';

interface Props { }

export class Register extends Component<Props, { redirect: string | null }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: null
    }
  }
  componentDidMount() {
    if (checkCredentials()) {
      this.setState({ redirect: '/dashboard' });
    }
  }
  componentDidUpdate() {
    if (checkCredentials()) {
      this.setState({ redirect: '/dashboard' });
    }
  }
  validateName(value: string) {
    let error;
    if (!value) {
      error = "😢 Please enter your name."
    }
    return error;
  }
  validateEmail(value: string) {
    let error;
    if (!value) {
      error = "💔 Oops! We need your email.";
    }
    return error;
  }
  validatePassword(password?: string) {
    let error;
    if (!password) {
      error = "🐱 Shhhh! You need to have a password.";
    } else if (password.length < 8) {
      error = "🦆 Toooooooo short! It has to be atleast 8 characters long.";
    }
    return error;
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
    <Layout>
        <Flex
          align="center"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={5}
          style={{padding: 15}}
        >
        <Logo style={{width: 100, height: 100, padding: 10}} isSVG={true} />
        <Title content="Register" style={{ padding: 10, fontSize: '4rem' }}>Register</Title>
        <Formik<{name: string, email: string, password: string}>
        initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values: any, actions: any) => {
            postData(serverURL + '/users', values)
              .then(data => {
                if (data.error) {
                  toast.error('🤐 Oops! ' + data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  actions.setSubmitting(false);
                } else {
                  toast.dark("✅ Registered...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  setCredentials(data.token);
                  actions.setSubmitting(false);
                  console.log(data);
                }
              });
        }}
      >
        {(props: any) => (
              <form onSubmit={props.handleSubmit} style={{width: '50%'}}>
              <Field name="name" validate={this.validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="eg. Elon Musk"
                    type="text"
                    autoComplete="name"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" validate={this.validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="eg. hello@tesla.com"
                    type="email"
                    autoComplete="email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" validate={this.validatePassword}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    placeholder="eg. ISecretleyLoveNasa@28"
                    type="password"
                    autoComplete="new-password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Buttons
              style={{marginTop: '2rem', width: '100%'}}    
              isLoading={props.isSubmitting}
              type="submit"
              designType="primary"    
            >
              Sign Up
            </Buttons>
            <Link to="/login">
              <Buttons
                style={{ marginTop: '1rem', width: '100%' }}
              >
                <span role="img" aria-label="Peeking above.">🙄</span> Want to login instead?
              </Buttons>    
            </Link>
          </form>
        )}
      </Formik>
      </Flex>
    </Layout>
    )
  }
}

export default Register
