import React from 'react';
import ReactDOM from 'react-dom'
import Card from './Card';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TempList = (props) => {

    const listsOfCards = props.listsOfCards;
    const setListsOfCards = props.setListsOfCards;
    const listsNames = props.listsNames;
    const setListsNames = props.setListsNames;
    const addList = props.addList;

    return (
        <div className="board-list">
            
            <div className="board-list-bottom">
                <span className="board-list-bottom-add" onClick={()=>props.addList(setListsOfCards,listsOfCards,setListsNames,listsNames,"temp")}>+ Add list</span>
                <div className={"board-list-bottom-form "}>
                    <Formik
                        initialValues={{ listName:"" }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            console.log(values.listName)
                            props.addList(setListsOfCards,listsOfCards,setListsNames,listsNames,values.listName)
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
