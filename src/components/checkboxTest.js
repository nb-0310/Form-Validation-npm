import React from 'react'
import useFormCheck from '../hooks/useFormCheck'
import useFormValidation from '../hooks/useFormValidation'

const CheckboxTest = () => {
  const formSchema = {
    coding: useFormCheck(false),
    music: useFormCheck(false),
    art: useFormCheck(false)
  }

  const validationRules = {
    coding: [{ type: 'isChecked', message: 'Please check this field' }],
    music: [],
    art: []
  }

  const { errors, validate } = useFormValidation(validationRules)

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      coding: formSchema.coding.checked,
      music: formSchema.music.checked,
      art: formSchema.art.checked
    }

    if (validate(formData)) {
      console.log('Form submitted successfully: ', formData)

      const payload = {
        interests: []
      }

      for (let interest in formData) {
        if (formData[interest]) payload.interests.push(interest)
      }

      console.log('Payload: ', payload)
    } else {
      console.log('Invalid Form')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose your interests</legend>
        <div>
          <label>
            <input type="checkbox" id="coding" name="interest" value="coding" {...formSchema.coding} />
            Coding
          </label>
          {errors.coding && (<p>{errors.coding}</p>)}
        </div>
        <div>
          <label>
            <input type="checkbox" id="music" name="interest" value="music" {...formSchema.music} />
            Music
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" id="art" name="interest" value="art" {...formSchema.art} />
            Art
          </label>
        </div>
        <div>
          <button type="submit">Submit form</button>
        </div>
      </fieldset>
    </form>

  )
}

export default CheckboxTest