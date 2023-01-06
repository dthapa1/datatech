import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const categoryPoints = { value0: 0, value1: 1 };

export const NewAssessment = () =>
{
  const [ userPoints, setUserPoints ] = useState(0);
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { q1, q2, q3, q4, q5 } = data;
    const sum = parseInt(q1) + parseInt(q2) + parseInt(q3) + parseInt(q4) + parseInt(q5);
    console.log(sum);
    setUserPoints(sum);
    data.score = sum;
    await AssessmentService.submit(data);
  };

  const value1 = watch(`q1`);
  const value2 = watch(`q2`);
  const value3 = watch(`q3`);
  const value4 = watch(`q4`);
  const value5 = watch(`q5`);

  useEffect(() => {
    const sum = parseInt(value1) + parseInt(value2) + parseInt(value3) + parseInt(value4) + parseInt(value5);
    setUserPoints(isNaN(sum) ? 0 : sum);
  }, [ value1, value2, value3, value4, value5 ]);
  // const { onChange } = register(`previousContact`);

  // console.log(onChange);

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {
  // await AssessmentService.submit(data);
  // };

  return (
    <>
      <h3>Cat Behavioral Instrument</h3>
      <h1> User Score: {userPoints}</h1>
      <h3> Cat Details </h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="catName">
          <Form.Label>Cat Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Cat Name" {...register(`catName`, { required: true })} />
        </Form.Group>
        {errors.catName && <p>Cat name is required.</p>}

        <Form.Group className="mb-3" controlId="birthDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="Enter Date of Birth"
            {...register(`birthDate`, { required: true })} />
        </Form.Group>
        {errors.birthDate && <p>Date of Birth is required.</p>}

        <h2> Questions and Responses </h2>

        <Form.Group className="mb-3" controlId="q1">
          <Form.Label>1. Any previous contact with Cat Judicial System?</Form.Label>
          <Form.Select {...register(`q1`, { required: true })} aria-label="boolean">
            <option value="">Select</option>
            <option value={categoryPoints.value1}>Yes</option>
            <option value={categoryPoints.value0}>No</option>
          </Form.Select>
        </Form.Group>
        {errors.q1 && <p>Yes/No ans is required.</p>}

        <Form.Group className="mb-3" controlId="q2">
          <Form.Label>2. Had Physical alterations with other cats?</Form.Label>
          <Form.Select {...register(`q2`, { required: true })} aria-label="boolean">
            <option value="">Select</option>
            <option value={categoryPoints.value0}>0-3 altercations</option>
            <option value={categoryPoints.value1}>3+ altercations</option>
          </Form.Select>
        </Form.Group>
        {errors.q2 && <p>Option 1 or 2 is required.</p>}

        <Form.Group className="mb-3" controlId="q3">
          <Form.Label>3. Had physical altercations with owner?</Form.Label>
          <Form.Select {...register(`q3`, { required: true })} aria-label="boolean">
            <option value="">Select</option>
            <option value={categoryPoints.value0}>0-10 altercations</option>
            <option value={categoryPoints.value1}>10+ altercations</option>
          </Form.Select>
        </Form.Group>
        {errors.q3 && <p>Option 1 or 2 is required.</p>}

        <Form.Group className="mb-3" controlId="q4">
          <Form.Label>4. Does it play well with other cats?</Form.Label>
          <Form.Select {...register(`q4`, { required: true })} aria-label="boolean">
            <option value="">Select</option>
            <option value={categoryPoints.value0}>Yes</option>
            <option value={categoryPoints.value1}>No</option>
          </Form.Select>
        </Form.Group>
        {errors.q4 && <p>Yes/No ans is required.</p>}

        <Form.Group className="mb-3" controlId="q5">
          <Form.Label>5. Does it hiss at strangers?</Form.Label>
          <Form.Select {...register(`q5`, { required: true })} aria-label="boolean">
            <option value="">Select</option>
            <option value={categoryPoints.value0}>No</option>
            <option value={categoryPoints.value1}>Yes</option>
          </Form.Select>
        </Form.Group>
        {errors.q5 && <p>Yes/No ans is required.</p>}
        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </>
  );
};
