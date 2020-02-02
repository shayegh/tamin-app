import React, {useContext} from 'react';
import {Field as FormikField, Form as FormikForm, Formik} from 'formik';
import {AntPassword} from "../../common/components/CreateAntFields";
import {Button} from "antd";
import {UserContext} from "../UserContext";
import {changePass} from "../../util/api";
import {toast} from "react-toastify";
import {showError} from "../../util/Helpers";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    oldPass: yup.string().required('Prev Password is required'),
    newPass: yup.string().required('New Password is required'),
    newPassConf: yup.string().oneOf([yup.ref('newPass'), null], "Passwords don't match").required('Confirm Password is required'),
});

const ChangePass = () => {
    const user = useContext(UserContext);
    console.log('User: ',user);
    return (
        <div className='App'>
            <h1>تغییر کلمه عبور</h1>
            <Formik
                initialValues={{
                    oldPass: '',
                    newPass: '',
                    newPassConf: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    let changePassRequest = {
                        userName: user.name,
                        ...values
                    };
                    changePass(changePassRequest).then(
                        response => {
                            setSubmitting(false);
                            toast.success('رمز عبور با موفقیت تغییر یافت ');
                        }
                    ).catch(
                        error => {
                            setSubmitting(false);
                            showError(error);
                        }
                    );
                }}
            >
                {({
                      isSubmitting
                  }) => (
                    <FormikForm>
                        <FormikField component={AntPassword}
                                     labelCol={{span: 12, offset: 12}}
                                     label="پسورد قبلی"
                                     name="oldPass"
                                     type='pass'
                                     required={true}
                        />
                        <FormikField component={AntPassword}
                                     labelCol={{span: 12, offset: 12}}
                                     label="پسورد جدید"
                                     name="newPass"
                                     type='pass'
                                     required={true}
                        />
                        <FormikField component={AntPassword}
                                     labelCol={{span: 12, offset: 12}}
                                     label="تکرار پسورد جدید"
                                     name="newPassConf"
                                     type='pass'
                                     required={true}
                        />
                        <Button htmlType="submit" type="primary" style={{float: 'left'}}
                                loading={isSubmitting}
                                disabled={isSubmitting}>ذخیره</Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default ChangePass;