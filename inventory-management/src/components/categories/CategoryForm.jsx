import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './CategoryForm.module.css';

function CategoryForm({ existingCategories, onSubmit }) {
    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .min(2, 'Name must be at least 2 characters')
            .max(30, 'Name is too long')
            .test('unique', 'This category already exists', (value) => {
                if (!value) return true;
                return !existingCategories.some(
                    (c) => c.toLowerCase() === value.trim().toLowerCase()
                );
            })
            .required('Category name is required'),
    });

    return (
        <Formik
            initialValues={{ name: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values.name.trim());
                resetForm();
            }}
        >
            <Form className={styles.form}>
                <div className={styles.row}>
                    <div className={styles.group}>
                        <Field
                            name="name"
                            placeholder="New category name (e.g. Electronics)"
                            className={styles.input}
                        />
                        <ErrorMessage name="name" component="span" className={styles.error} />
                    </div>
                    <button type="submit" className={styles.submit}>
                        Add Category
                    </button>
                </div>
            </Form>
        </Formik>
    );
}

export default CategoryForm;