import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { fetchLocalFolder, fetchLocalFileDetail, fetchSubmitFile } from '~/services/tool'
import { FilesDataStruct, FileType } from '~/modals/tool'
import styles from './index.module.less'

type FilesStruct = FilesDataStruct & {
  expanded?: boolean
  editor?: boolean
}

interface FileBoxProps {
  visible: boolean
}

const FileBox: React.FC<FileBoxProps> = (props) => {
  const { visible } = props
  const [files, setFiles] = useState<FilesStruct[]>([])
  const [currentItem, setCurrentItem] = useState<FilesStruct | null>(null)
  const [fileContent, setFileContent] = useState<Record<string, string>>({})
  /** 是否有进入编辑器范围 */
  const [hasEnter, setHasEnter] = useState<boolean>(false)

  const handleClickSwitcher = (item: FilesStruct) => {
    item.expanded = !item.expanded

    setFiles(Object.assign([], files))
  }

  /** 双击文件时 */
  const handleClickFile = async (item: FilesStruct) => {
    /** 不是文件夹类型时，请求内容 */
    if (item.type === 1) {
      setCurrentItem(item)
    }
  }

  /** 修改文件内容 */
  const handleChangeFile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentItem) {
      currentItem.editor = true
      setFiles(Object.assign([], files))

      fileContent[currentItem?.path as string] = e.currentTarget.value
      setFileContent(Object.assign({}, fileContent))
    }
  }

  const initFolders = useMemo(() => {
    const deepFolder: (val: FilesStruct[], index: number) => ReactNode = (
      arr: FilesStruct[],
      index: number
    ) => {
      return arr.map((i: FilesStruct, j: number) => {
        return (
          <React.Fragment key={`wk_tree_${j}_${index}`}>
            <div className={styles['wk-tree-treenode']}>
              <span className={styles['wk-tree-indent']}>
                {new Array(index).fill(0).map((_, n: number) => {
                  return (
                    <span
                      key={`wk-tree-indent_${n}_${index}`}
                      className={styles['wk-tree-indent-unit']}
                    />
                  )
                })}
              </span>
              <span
                className={
                  styles['wk-tree-switcher'] +
                  (i.children && i.children.length !== 0
                    ? ''
                    : ' ' + styles['wk-tree-switcher-noop']) +
                  (i.expanded ? ' ' + styles['wk-tree-switcher_open'] : '')
                }
                onClick={() => handleClickSwitcher(i)}
              >
                {i.children && i.children.length !== 0 && (
                  <i className={styles['wk-tree-switcher-icon']} />
                )}
              </span>
              <span
                className={styles['wk-tree-node-content-wrapper']}
                onDoubleClick={() => handleClickFile(i)}
              >
                <span>{i.name}</span>
                {i.editor && <i className={styles['wk-tree-node-content-wrapper-editor']} />}
              </span>
            </div>
            {i.type === FileType.Folder && i.expanded && deepFolder(i.children, index + 1)}
          </React.Fragment>
        )
      })
    }

    return deepFolder(files, 0)
  }, [files])

  const fetchFolders = useCallback(async () => {
    const res = await fetchLocalFolder()

    if (res.success === 0) {
      res.data.map((i: FilesStruct) => (i.expanded = false))
      setFiles(Object.assign([], res.data))
    } else {
      setFiles([])
    }
  }, [])

  useEffect(() => {
    fetchFolders()
  }, [])

  useEffect(() => {
    if (currentItem) {
      fetchLocalFileDetail(currentItem.path).then((res) => {
        if (res.success === 0) {
          fileContent[currentItem.path] = JSON.parse(res.data)
          setFileContent(Object.assign({}, fileContent))
        }
      })
    }
  }, [currentItem])

  useEffect(() => {
    if (hasEnter) {
      document.onkeydown = (e: KeyboardEvent) => {
        const currKey = e.keyCode || e.which || e.charCode

        if (currKey === 83 && (e.ctrlKey || e.metaKey)) {
          e.preventDefault()
          fetchSubmitFile({
            content: fileContent[currentItem?.path as string],
            path: currentItem?.path as string
          })
          return false
        }
      }
    } else {
      document.onkeydown = null
    }
  }, [hasEnter])

  return (
    <div className={styles.fileBox + (visible ? ' ' + styles.show : '')}>
      <div className={styles.left}>{initFolders}</div>
      <div
        className={styles.right}
        onMouseEnter={() => setHasEnter(true)}
        onMouseLeave={() => setHasEnter(false)}
      >
        {currentItem && (
          <textarea
            wrap='off'
            className={styles.textEditor}
            value={fileContent[currentItem?.path as string] || ''}
            onChange={handleChangeFile}
          />
        )}
      </div>
    </div>
  )
}

export default FileBox
