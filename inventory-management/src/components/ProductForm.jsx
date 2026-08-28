import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { generateSku } from '../utils/generator';
import './ProductForm.css';

function ProductForm({ categories, onSubmit, onCancel, initialProduct, isSkuTaken }) {
    const isEditing = Boolean(initialProduct);

    const initialValues = {
        name: initialProduct?.name || '',
        id: initialProduct?.id || '',
        category: initialProduct?.category || '',
        price: initialProduct?.price ?? '',
        quantity: initialProduct?.quantity ?? '',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .min(2, 'Name must be at least 2 characters')
            .required('Product name is required'),

        id: Yup.string()
            .trim()
            .test('unique-sku', 'This Product ID is already taken', (value) => {
                if (isEditing) return true;
                if (!value) return true;
                return !isSkuTaken(value);
            }),

        category: Yup.string().required('Please select a category'),

        price: Yup.number()
            .typeError('Price must be a number')
            .positive('Price must be greater than 0')
            .required('Price is required'),

        quantity: Yup.number()
            .typeError('Quantity must be a number')
            .integer('Quantity must be a whole number')
            .min(0, 'Quantity cannot be negative')
            .required('Quantity is required'),
    });

    function handleSubmit(values) {
        onSubmit(values);
    }

    return (
        <div className="wrapper">
            <h3 className="title">
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </h3>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue }) => (
                    <Form className="form">
                        <div className="group">
                            <label htmlFor="name">Product Name</label>
                            <Field id="name" name="name" placeholder="e.g. Wireless Mouse" />
                            <ErrorMessage name="name" component="span" className="error" />
                        </div>

                        {!isEditing && (
                            <div className="group">
                                <label htmlFor="id">Product ID (SKU)</label>
                                <div className="skuRow">
                                    <Field id="id" name="id" placeholder="Auto-generated if left blank" />
                                    <button
                                        type="button"
                                        className="generateBtn"
                                        onClick={() => setFieldValue('id', generateSku())}
                                    >
                                        Generate
                                    </button>
                                </div>
                                <ErrorMessage name="id" component="span" className="error" />
                            </div>
                        )}

                        <div className="group">
                            <label htmlFor="category">Category</label>
                            <Field as="select" id="category" name="category">
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="span" className="error" />
                        </div>

                        <div className="group">
                            <label htmlFor="price">Price ($)</label>
                            <Field id="price" name="price" type="number" step="0.01" placeholder="0.00" />
                            <ErrorMessage name="price" component="span" className="error" />
                        </div>

                        {!isEditing && (
                            <div className="group">
                                <label htmlFor="quantity">Initial Stock Quantity</label>
                                <Field id="quantity" name="quantity" type="number" placeholder="0" />
                                <ErrorMessage name="quantity" component="span" className="error" />
                            </div>
                        )}

                        <div className="actions">
                            <button type="button" className="cancel" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="submit">
                                {isEditing ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ProductForm;