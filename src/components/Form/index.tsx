import React from 'react';
import { Form, FormikConfig, FormikProvider } from 'formik';

export const componentName: string = 'Form'

interface FbmFormProps{
  loading?: boolean;
  formik: any
}

const FbmForm: React.FC<FbmFormProps> = (props) => {
  const { loading, children, formik } = props
  return (
    <FormikProvider value={formik}>
      <Form>
        {children}
      </Form>
    </FormikProvider>
  )
}

export default FbmForm