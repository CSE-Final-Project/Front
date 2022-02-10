import React, { useEffect, useState } from 'react';

const useForm = ({initialValues, onSubmit}) => {
    const [inputs, setInputs]=useState(initialValues);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value});
    }

    const handleSubmit = async (e) => {
        setSubmitting(true);
        e.preventDefault();
        await new Promise((r) => setTimeout(r,1000));
    }

    useEffect(() => {
        if(submitting){
            onSubmit(inputs);
            setSubmitting(false);
        }
    },[submitting])
    //배열 생략 : 리렌더링 될때마다 실행.

    return {
        inputs,
        submitting,
        handleChange,
        handleSubmit,
    };
};

export default useForm;