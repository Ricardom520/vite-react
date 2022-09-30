import request from '../utils/request'

/**
 * 获取当前文件夹内容
 */
export const fetchLocalFolder = () => {
  return request.get<any, any>(
    `http://127.0.0.1:8081/getLocalFolder`
  )
}