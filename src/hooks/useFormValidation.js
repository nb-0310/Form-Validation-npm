import React from 'react'
import { isValidFileFormat, isValidFileSize } from '../utils'

const useFormValidation = (validationRules) => {
	const [errors, setErrors] = React.useState({})

	const validate = (values) => {
		const newErrors = {}

		Object.keys(validationRules).forEach((key) => {
			if (values.hasOwnProperty(key)) {
				const rules = validationRules[key]

				for (const rule of rules) {
				const { type, value, message } = rule
					const fieldValue = `${values[key] || ''}`

					switch (type) {
						case 'isNotEmpty':
							if (!fieldValue.toString()) {
								newErrors[key] = message
							}
							break
						case 'minLength':
							if (fieldValue && fieldValue.toString().length < value) {
								newErrors[key] = message
							}
							break
						case 'minValue':
							if (fieldValue && parseFloat(fieldValue) < value) {
								newErrors[key] = message
							}
							break
						case 'maxValue':
							if (fieldValue && parseFloat(fieldValue) > value) {
								newErrors[key] = message
							}
							break
						case 'isEmail':
							const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
							if (fieldValue && !emailRegex.test(fieldValue)) {
								newErrors[key] = value || message
							}
							break
						case 'isNumeric':
							const numericRegex = /^\d+$/
							if (fieldValue && !numericRegex.test(fieldValue)) {
								newErrors[key] = value || message
							}
							break
						case 'isValidDate':
							const dateRegex = /^\d{4}-\d{2}-\d{2}$/
							if (fieldValue && !dateRegex.test(fieldValue)) {
								newErrors[key] = value || message
							}
							break
						case 'isValidColor':
							const colorRegex = /^#[0-9A-F]{6}$/i
							if (fieldValue && !colorRegex.test(fieldValue)) {
								newErrors[key] = value || message
							}
							break
						case 'isChecked':
							if (!fieldValue) {
								newErrors[key] = message
							}
							break
						case 'isFileUploaded':
							if (!fieldValue) {
								newErrors[key] = value || message || 'Default file upload error'
							}
							break
						case 'isFormatValid':
							if (values[key] && rule.formats && !isValidFileFormat(values[key], rule.formats)) {
								newErrors[key] = message
							}
							break
						case 'isSizeValid':
							if (values[key] && rule.maxSize && !isValidFileSize(values[key], rule.maxSize)) {
								newErrors[key] = message
							}
							break
						default:
							break
					}
				}
			}
		})

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	return { errors, validate }
}

export default useFormValidation
