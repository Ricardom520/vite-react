import request from '../utils/request'
import {
  GetLocalFolderRequest,
  GetLocalFolderResponse,
  GetLocalFileDetailRequest,
  GetLocalFileDetailReponse,
  FetchLocalFileContenxtRequest,
  FetchLocalFileContenxtResponse
} from '~/modals/tool'

/**
 * 获取当前文件夹内容
 */
export const fetchLocalFolder = () => {
  return request.get<GetLocalFolderRequest, GetLocalFolderResponse>(
    `http://127.0.0.1:8081/getLocalFolder`
  )
}

/**
 * 获取文件详细信息
 */
export const fetchLocalFileDetail = (path: string) => {
  return request.get<GetLocalFileDetailRequest, GetLocalFileDetailReponse>(
    `http://127.0.0.1:8081/getLocalFileDetail?path=${path}`
  )
}

/**
 * 发送修改后的内容
 */
export const fetchSubmitFile = (obj: { content: string; path: string }) => {
  return request.post<FetchLocalFileContenxtRequest, FetchLocalFileContenxtResponse>(
    `http://127.0.0.1:8081/submitFile`,
    {
      ...obj
    }
  )
}
