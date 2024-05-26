import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Trello.module.css';
import trelloLogo from "../Assest/trello.jpeg"

 
const apiKey = process.env.REACT_APP_TRELLO_API_KEY;
const apiToken = process.env.REACT_APP_TRELLO_API_TOKEN;
const listId = process.env.REACT_APP_TRELLO_LIST_ID;

const TrelloCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      dueDate: '',
      startDate: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      dueDate: Yup.date().required('Due Date is required'),
      startDate: Yup.date().required('Start Date is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      const url = `https://api.trello.com/1/cards`;

      const params = {
        key: apiKey,
        token: apiToken,
        idList: listId,
        name: values.name,
        desc: values.description,
        due: values.dueDate,
        start: values.startDate
      };

      try {
        const response = await axios.post(url, null, { params });
        toast.success('Card created successfully: ' + response.data.name);
        resetForm();
      } catch (error) {
        toast.error('Error creating card: ' + (error.response ? error.response.data : error.message));
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div style={{marginTop:'20px'}}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.logoBox}>
            <img src={trelloLogo} alt="" style={{borderRadius:'50%'}}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.error}>{formik.errors.description}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <div className={styles.error}>{formik.errors.dueDate}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startDate}
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className={styles.error}>{formik.errors.startDate}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? '...Loading' : 'Create Card'}
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TrelloCard;
