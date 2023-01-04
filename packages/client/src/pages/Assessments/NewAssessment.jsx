import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  return (
    <>
      <p>Cat Behavioral Instrument</p>

      <p> Cat Details </p>
      <Form onSubmit={handleSubmit((data) => console.log(data))}>
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

        <p> Questions and Responses </p>

        <Form.Group className="mb-3" controlId="previousContact">
          <Form.Label>1. Any previous contact with Cat Judicial System?</Form.Label>
          <Form.Select aria-label="boolean">
            <option>Select</option>
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        {errors.previousContact && <p>Yes/No ans is required.</p>}

        <Form.Group className="mb-3" controlId="physicalAltercations">
          <Form.Label>2. Had Physical alterations with other cats?</Form.Label>
          <Form.Select aria-label="boolean">
            <option>Select</option>
            <option value="1">0-3 altercations</option>
            <option value="2">3+ altercations</option>
          </Form.Select>
        </Form.Group>
        {errors.physicalAltercations && <p>Option 1 or 2 is required.</p>}

        <Form.Group className="mb-3" controlId="ownerAltercations">
          <Form.Label>3. Had physical altercations with owner?</Form.Label>
          <Form.Select aria-label="boolean">
            <option>Select</option>
            <option value="1">0-10 altercations</option>
            <option value="2">10+ altercations</option>
          </Form.Select>
        </Form.Group>
        {errors.ownerAltercations && <p>Option 1 or 2 is required.</p>}

        <Form.Group className="mb-3" controlId="playsWell">
          <Form.Label>4. Does it play well with other cats?</Form.Label>
          <Form.Select aria-label="boolean">
            <option>Select</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </Form.Select>
        </Form.Group>
        {errors.playsWell && <p>Yes/No ans is required.</p>}

        <Form.Group className="mb-3" controlId="hissStrangers">
          <Form.Label>5. Does it hiss at strangers?</Form.Label>
          <Form.Select aria-label="boolean">
            <option>Select</option>
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        {errors.hissStrangers && <p>Yes/No ans is required.</p>}
        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </>
  );
};
