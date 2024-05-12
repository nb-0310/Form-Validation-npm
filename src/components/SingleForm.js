import React from 'react'
import useFormInput from '../hooks/useFormInput'
import useFormValidation from '../hooks/useFormValidation'

const SingleForm = () => {
	const formSchema = {
		name: useFormInput(''),
		email: useFormInput(''),
		contactNumber: useFormInput(''),
	}

	const validationRules = {
		name: [
			{ type: 'isNotEmpty', message: 'Name is required' },
			// { type: 'minLength', value: 5, message: 'Minimum length should be 5!!' },
		],
		email: [
			{ type: 'isNotEmpty', message: 'Email is required' },
			// { type: 'isEmail', message: 'Email format is not valid!' },
		],
		contactNumber: [
			{ type: 'isNotEmpty', message: 'Contact Number is required' },
			// { type: 'isNumeric', message: 'Contact Number must be numeric' },
			// {
			// 	type: 'minLength',
			// 	value: 10,
			// 	message: 'Contact Number must be at least 10 characters long',
			// },
			// {
			// 	type: 'minValue',
			// 	value: 1000000000,
			// 	message: 'Contact Number must be at least 1,000,000,000',
			// },
			// {
			// 	type: 'maxValue',
			// 	value: 2000000000,
			// 	message: 'Contact Number must be at most 2,000,000,000',
			// },
		],
	}

	const { errors, validate } = useFormValidation(validationRules)

	const handleSubmit = (event) => {
		event.preventDefault()

		const formData = {
			name: formSchema.name.value,
			email: formSchema.email.value,
			contactNumber: formSchema.contactNumber.value,
		}

		if (validate(formData)) {
			console.log('Form submitted successfully:', formData)
		} else {
			console.log('Form data is invalid')
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" {...formSchema.name} />
					{errors.name && <p className="error">{errors.name}</p>}
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="name" id="email" name="email" {...formSchema.email} />
					{errors.email && <p className="error">{errors.email}</p>}
				</div>
				<div>
					<label htmlFor="contactNumber">Contact Number:</label>
					<input
						type="tel"
						id="contactNumber"
						name="contactNumber"
						{...formSchema.contactNumber}
					/>
					{errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

export default SingleForm
