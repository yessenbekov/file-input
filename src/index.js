import React, { useState } from 'react'
import './index.css'
import { Icon } from 'semantic-ui-react'
import Button from '../button'

const FileInput = (props) => {
  const [docName, setDocName] = useState('')
  const { onChange, inputName, size } = props
  const bSize = size || 'm'

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    /* const bytes = Array.from(new Uint8Array(file))
    console.log('BYTES', bytes) */
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const onUploadFile = (files) => {
    var file = files[0]
    file && setDocName(file.name)

    file && toBase64(file).then(e => {
      const data = e && e.split(',')[1]
      setDoc(data)
    }
    )
  }

  const setDoc = (data) => {
    onChange && onChange(inputName, data)
  }

  const onDeleteFile = () => {
    setDoc('')
    setDocName('')
  }

  return (
    <div className='file-input-component'>
      <div className='upload'>
        <Button icon='paperclip' size={bSize} content='Прикрепить файл' />
        <input
          type='file'
          onChange={e => {
            onUploadFile(e.target.files)
          }}
        />

      </div>
      {docName && (
        <div className='uploaded-file-name'> <Icon color='red' name='trash alternate' link onClick={e => onDeleteFile()} />
          {docName}
        </div>)}
    </div>

  )
}

export default FileInput
