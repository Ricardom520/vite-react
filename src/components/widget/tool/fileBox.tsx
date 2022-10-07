import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { fetchLocalFolder } from '~/services/tool'
import styles from './index.module.less'

enum FileType {
  Folder = 0,
  File = 1
}

interface FilesStruct {
  name: string
  path: string
  type: FileType
  children: FilesStruct[]
  expanded?: boolean
}

const FileBox: React.FC = () => {
  const [files, setFiles] = useState<FilesStruct[]>([])

  const handleClickSwitcher = (item: FilesStruct) => {
    item.expanded = !item.expanded

    setFiles(Object.assign([], files))
  }

  /** 双击文件时 */
  const handleClickFile = (item: FilesStruct) => {
    console.log(item)
    /** 不是文件夹类型时，请求内容 */
    if (item.type === 1) {
      
    }
  }
  
  const initFolders = useMemo(() => {
    const deepFolder: (val: FilesStruct[], index: number) => ReactNode = (arr: FilesStruct[], index: number) => {
      console.log(files)
      return arr.map((i: FilesStruct, j: number) => {
        return (
          <React.Fragment key={`wk_tree_${j}_${index}`}>
            <div className={styles['wk-tree-treenode']}>
            <span className={styles['wk-tree-indent']}>
              {new Array(index).fill(0).map((_, n: number) => {
                return (
                  <span
                    key={`wk-tree-indent_${n}_${index}`}
                    className={
                      styles['wk-tree-indent-unit']
                    }
                  />
                )
              })}
            </span>
            <span
              className={
                styles['wk-tree-switcher'] + (i.children && i.children.length !== 0 ? '' : ' ' + styles['wk-tree-switcher-noop']) + (i.expanded ? ' ' + styles['wk-tree-switcher_open'] : '')
              }
              onClick={() => handleClickSwitcher(i)}
            >
              {i.children && i.children.length !== 0 && (
                <i className={styles['wk-tree-switcher-icon']} />
              )}
            </span>
            <span className={styles['wk-tree-node-content-wrapper']} onDoubleClick={() => handleClickFile(i)}>
              <span>{i.name}</span>
            </span>
            </div>
            {i.type === FileType.Folder && i.expanded && (
              deepFolder(i.children, index + 1)
            )} 
          </React.Fragment>
        )
      })
    }

    return deepFolder(files, 0)
  }, [files])
  
  const fetchFolders = useCallback(async () => {
    const res = await fetchLocalFolder()
    console.log(res)

    if (res.success === 0) {
      res.data.map((i: FilesStruct) => i.expanded = false)
      setFiles(Object.assign([], res.data))
    } else {
      setFiles([])
    }
  }, [])

  useEffect(() => {
    fetchFolders()
  }, [])

  return (
    <div className={styles.fileBox}>
      <div className={styles.left}>
        {initFolders}
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default FileBox
