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
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { serverURL } from '../server-config';
import { postData, setCredentials } from './auth';

export class Login extends Component {
  validateEmail(value: string){
    let error;
    if (!value) error = "💔 Oops! We need your email.";
    return error;
  }
  validatePassword(value: string) {
    let error;
    if (!value) error = "🥁 Dum dum dum, where's your password?";
    return error;
  }

  render() {
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
        <Title content="Login" style={{ padding: 10, fontSize: '4rem' }}/>
        <Formik<{ email: string, password: string }>
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: any, actions: any) => {
          postData(serverURL + '/users/login', values)
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
                  toast.dark("✅ Logging in...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  setCredentials(JSON.stringify(data.token));
                  actions.setSubmitting(false);
                  console.log(JSON.stringify(data));
                }
              });
        }}
        >
          {(props: any) => (
          <form onSubmit={props.handleSubmit} style={{width: '50%'}}>
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
                style={{marginTop: '2rem', width: '100%' }}
                designType="primary"
                isLoading={props.isSubmitting}
                type="submit"
              >
                  Login
            </Buttons>
            <Link to="/register">
              <Buttons
                style={{ marginTop: '1rem', width: '100%' }}
              >
                <span role="img" aria-label="Peeking above.">🙄</span> Don't have an account? Register instead.
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

export default Login
