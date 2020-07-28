import React from "react";
import Layout from "./Layout";
import Title from "../design/Title";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Formik, Field } from "formik";

export function Login() {
  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required";
    }
    return error;
  }
  function validatePassword(password?: string) {
    let error;
    if (!password) {
      error = "Password is required";
    } else if (password.length < 8) {
      error = "Password has to be at least 8 characters long";
    }
    return error;
  }

  return (
    <Layout>
      <Title content="Login">Login</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="email"
                    type="email"
                    autoComplete="email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" validate={validatePassword}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    placeholder="password"
                    type="password"
                    autoComplete="new-password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
}

export default Login;
