import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import { Form, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const SchemaProduct = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short')
        .max(70, 'Too Long')
        .required('Required'),

    description: Yup.string()
        .required('Required')
        .matches("([A-Z])\\w+", "Input Text"),

    img: Yup.string()
        .required('Required'),

    price: Yup.number()
        .required('Required')
        .positive('Must be a positive number'),

    stock: Yup.number()
        .required('Required')
        .min(0, 'Must be 0 or more'),
});

export function Editproduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product details by ID
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const updateProduct = async (values) => {
        try {
            await axios.put(`http://localhost:3000/products/${id}`, values);
            navigate("/product/list", { state: { message: "Update Success" } });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Loading state while fetching the product
    }

    return (
        <>
            <h1>Edit Product</h1>
            <Formik
                initialValues={{
                    name: product.name,
                    description: product.description,
                    img: product.img,
                    price: product.price,
                    stock: product.stock,
                }}
                validationSchema={SchemaProduct}
                onSubmit={updateProduct}
            >
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
                    <button type="submit">Update</button>
                </Form>
            </Formik>
        </>
    );
}
