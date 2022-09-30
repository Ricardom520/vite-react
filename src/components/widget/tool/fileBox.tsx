import React, { useEffect } from 'react'
import { fetchLocalFolder } from '~/services/tool'

const FileBox: React.FC = () => {
  useEffect(() => {
    fetchLocalFolder()
  }, [])

  return (
    <div></div>
  )
}

export default FileBox
