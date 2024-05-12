import React from 'react'

import useFormValidation from '../hooks/useFormValidation'
import useFormInput from '../hooks/useFormInput'

const Form = () => {
	const [step, setStep] = React.useState(1)

	const formData = {
		name: useFormInput(''),
		email: useFormInput(''),
		contactNumber: useFormInput(''),
		date: useFormInput(''),
		range: useFormInput(''),
		color: useFormInput(''),
		file: useFormInput('', true),
	}

	const validationRules = {
		name: [
			{ type: 'isNotEmpty', message: 'Name is required' },
			{ type: 'minLength', value: 5, message: 'Minimum length should be 5!!' },
		],
		email: [
			{ type: 'isNotEmpty', message: 'Email is required' },
			{ type: 'isEmail', message: 'Email format is wrong' },
		],
		contactNumber: [
			{ type: 'isNotEmpty', message: 'Contact Number is required' },
			{ type: 'isNumeric', message: 'Contact Number must be numeric' },
			{
				type: 'minLength',
				value: 10,
				message: 'Contact Number must be at least 10 characters long',
			},
			{
				type: 'minValue',
				value: 1000000000,
				message: 'Contact Number must be at least 1,000,000,000',
			},
			{
				type: 'maxValue',
				value: 2000000000,
				message: 'Contact Number must be at most 2,000,000,000',
			},
		],
		date: [
			{ type: 'isNotEmpty', message: 'Date is required' },
			{ type: 'isValidDate', message: 'Invalid date format' },
		],
		range: [
			{ type: 'isNotEmpty', message: 'Range is required' },
			{ type: 'minValue', value: 10, message: 'Value must be at least 10' },
			{ type: 'maxValue', value: 100, message: 'Value must be at most 100' },
		],
		color: [{ type: 'isValidColor', message: 'Invalid color format' }],
		file: [
			{
				type: 'isFileUploaded',
				message: 'File upload is required',
			},
			{
				type: 'isFormatValid',
				formats: ['pdf', 'docx', 'txt'],
				message: 'Invalid file format. Supported formats are PDF, DOCX, and TXT',
			},
			{
				type: 'isSizeValid',
				maxSize: 5120,
				message: 'File size exceeds the limit. Please upload a file of up to 5KB',
			},
		],
	}

	const { errors, validate } = useFormValidation(validationRules)

	const handleNext = () => {
		switch (step) {
			case 1:
				if (validateField('name')) {
					setStep(step + 1)
				}
				break
			case 2:
				if (validateField('email')) {
					setStep(step + 1)
				}
				break
			case 3:
				if (validateField('contactNumber')) {
					setStep(step + 1)
				}
				break
			case 4:
				if (validateField('date')) {
					setStep(step + 1)
				}
				break
			case 5:
				if (validateField('range')) {
					setStep(step + 1)
				}
				break
			case 6:
				if (validateField('color')) {
					setStep(step + 1)
				}
				break
			default:
				setStep(step + 1)
				break
		}
	}

	const handlePrev = () => {
		setStep(step - 1)
	}

	const validateField = (fieldName) => {
		const fieldValue =
			fieldName !== 'file' ? formData[fieldName].value : formData[fieldName].file
		const fieldValidation = { [fieldName]: fieldValue }
		return validate(fieldValidation)
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (validateField('file')) {
			const submittedFormData = Object.fromEntries(
				Object.entries(formData).map(([key, value]) => [
					key,
					key !== 'file' ? value.value : value.file,
				])
			)

			console.log(submittedFormData)
			console.log('Form submitted successfully!')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			{step === 1 && (
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" {...formData.name} />
					{errors.name && <p className="error">{errors.name}</p>}
					<button type="button" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
			{step === 2 && (
				<div>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" {...formData.email} />
					{errors.email && <p className="error">{errors.email}</p>}
					<button type="button" onClick={handlePrev}>
						Previous
					</button>
					<button type="button" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
			{step === 3 && (
				<div>
					<label htmlFor="contactNumber">Contact Number:</label>
					<input
						type="tel"
						id="contactNumber"
						name="contactNumber"
						{...formData.contactNumber}
					/>
					{errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
					<button type="button" onClick={handlePrev}>
						Previous
					</button>
					<button type="button" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
			{step === 4 && (
				<div>
					<label htmlFor="date">Date:</label>
					<input type="date" id="date" name="date" {...formData.date} />
					{errors.date && <p className="error">{errors.date}</p>}
					<button type="button" onClick={handlePrev}>
						Previous
					</button>
					<button type="button" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
			{step === 5 && (
				<div>
					<label htmlFor="range">Range:</label>
					<input type="range" id="range" name="range" {...formData.range} />
					{errors.range && <p className="error">{errors.range}</p>}
					<button type="button" onClick={handlePrev}>
						Previous
					</button>
					<button type="button" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
			{step === 6 && (
				<div>
					<label htmlFor="color">Color:</label>
					<input type="color" id="color" name="color" {...formData.color} />
					{errors.color && <p className="error">{errors.color}</p>}
					<button type="button" onClick={handlePrev}>
						Previous
					</button>
					<button type="button" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
			{step === 7 && (
				<div>
					<label htmlFor="file">File:</label>
					<input type="file" id="file" name="file" {...formData.file} />
					{errors.file && <p className="error">{errors.file}</p>}
					<button type="button" onClick={handlePrev}>
						Previous
					</button>
					<button type="submit">Submit</button>
				</div>
			)}
		</form>
	)
}

export default Form
