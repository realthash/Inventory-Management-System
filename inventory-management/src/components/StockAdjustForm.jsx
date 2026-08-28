import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './StockAdjustForm.module.css';

function StockAdjustForm({ product, type, onSubmit, onCancel }) {
    const isRestock = type === 'IN';

    const validationSchema = Yup.object({
        amount: Yup.number()
            .typeError('Amount must be a number')
            .integer('Amount must be a whole number')
            .positive('Amount must be greater than 0')
            .test('enough-stock', `Only ${product.quantity} units in stock`, (value) => {
                if (isRestock) return true;
                return value <= product.quantity;
            })
            .required('Amount is required'),
        note: Yup.string().max(100, 'Note is too long'),
    });

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>
                {isRestock ? 'Restock' : 'Record Sale'}: {product.name}
            </h4>
            <p className={styles.current}>Current stock: {product.quantity}</p>

            <Formik
                initialValues={{ amount: '', note: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values);
                    resetForm();
                }}
            >
                <Form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label htmlFor="amount">Quantity</label>
                            <Field id="amount" name="amount" type="number" placeholder="0" />
                            <ErrorMessage name="amount" component="span" className={styles.error} />
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="note">Note (optional)</label>
                            <Field
                                id="note"
                                name="note"
                                placeholder={isRestock ? 'e.g. Supplier delivery' : 'e.g. Bulk order'}
                            />
                            <ErrorMessage name="note" component="span" className={styles.error} />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancel} onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={isRestock ? styles.submitIn : styles.submitOut}
                        >
                            {isRestock ? 'Add to Stock' : 'Remove from Stock'}
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default StockAdjustForm;