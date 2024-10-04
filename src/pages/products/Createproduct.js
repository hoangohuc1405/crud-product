import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SchemaProduct = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short')
        .max(70, 'Too Long')
        .required('Required'),
    description: Yup.string()
        .required('Required')
        .matches("([A-Z])\\w+", "Input Text"),
    img: Yup.string().url('Must be a valid URL').required('Required'),
    price: Yup.number()
        .required('Required')
        .positive('Must be positive'),
    stock: Yup.number()
        .required('Required')
        .min(0, 'Cannot be negative'),
});

export function Createproduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (values) => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post("http://localhost:3000/products", values);
            console.log("Response from API:", response.data); // Kiểm tra phản hồi
            setMessage("Add Success");
            setTimeout(() => {
                navigate("/product/list");
            }, 2000);
        } catch (error) {
            console.error("There was an error adding the product!", error);
            setMessage("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Create Product</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    img: '',
                    price: '',
                    stock: '',
                }}
                validationSchema={SchemaProduct}
                onSubmit={handleSubmit}
            >
                {({ resetForm }) => (
                    <Form>
                        <Field name="name" placeholder="Name" type="text" />
                        <span style={{ color: 'red' }}><ErrorMessage name="name" /></span>
                        <br />

                        <Field name="description" placeholder="Description" type="text" />
                        <span style={{ color: 'red' }}><ErrorMessage name="description" /></span>
                        <br />

                        <Field name="img" placeholder="Image URL" type="text" />
                        <span style={{ color: 'red' }}><ErrorMessage name="img" /></span>
                        <br />

                        <Field name="price" placeholder="Price" type="number" />
                        <span style={{ color: 'red' }}><ErrorMessage name="price" /></span>
                        <br />

                        <Field name="stock" placeholder="Stock" type="number" />
                        <span style={{ color: 'red' }}><ErrorMessage name="stock" /></span>
                        <br />

                        <button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add"}
                        </button>
                        <button type="button" onClick={resetForm}>Reset</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
