import Api from "../axios/Api";
const PROJECT_API="projects"



export const fetchprojects=async()=> {
    return await Api.get(PROJECT_API);
}

export const fetchprojectById=async(projectId)=> {
    return await Api.get(PROJECT_API + '/' + projectId);
}

export const deleteproject=async(projectId) =>{
    return await Api.delete(PROJECT_API + '/' + projectId);
}

export const addproject=async(project)=> {
    return await Api.post(PROJECT_API, project);
}
export const editproject=(project) =>{
    return Api.put(PROJECT_API + '/' + project._id, project);
}

export const fetchprojectsPagination=async(page,limit)=> {
  
    return await Api.get(PROJECT_API + `/pagination?page=${page}&limit=${limit}`)
    }