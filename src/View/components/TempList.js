import React from 'react';
import ReactDOM from 'react-dom'
import Card from './Card';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TempList = (props) => {

    const tempListAddMenuOpen = props.tempListAddMenuOpen;
    const setTempListAddMenuOpen = props.setTempListAddMenuOpen;

    return (
        <div className="board-list">
            
            <div className="board-list-bottom">
                <span className="board-list-bottom-add" onClick={()=>setTempListAddMenuOpen(true)}>+ Add list</span>
                <div className={tempListAddMenuOpen?"board-list-bottom-form":"board-list-bottom-form-hidden"}>
                    <Formik
                        initialValues={{ listName:"" }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                props.addList(props.setLists, props.lists, values.listName);
                                props.setSocketHit(props.socketHit+1);
                                setSubmitting(false);
                            }, 50);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field type="text" name="listName"/>
                                <ErrorMessage name="listName" component="div" />
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>                    
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}



export default TempList;
