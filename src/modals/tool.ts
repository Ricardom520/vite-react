export enum FileType {
  Folder = 0,
  File = 1
}

export interface FilesDataStruct {
  name: string
  path: string
  type: FileType
  children: FilesDataStruct[]
}

export interface GetLocalFolderRequest {}
export interface GetLocalFolderResponse {
  success: number
  data: FilesDataStruct[]
}

export interface GetLocalFileDetailRequest {
  path: string
}
export interface GetLocalFileDetailReponse {
  success: number
  data: string
}

export interface FetchLocalFileContenxtRequest {
  content: string
  path: string
}
export interface FetchLocalFileContenxtResponse {
  success: string
}
