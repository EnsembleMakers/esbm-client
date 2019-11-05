import axios from 'axios';

export const getModelById = (id) => axios.get('/api/models/'+id);
export const getModelsByMakerId = (id) => axios.get('/api/models/byId/'+id);
export const getModelByModelName = (name) => axios.get('/api/models/byName/'+name);
export const postModel = (formData) => axios.post('/api/models/', formData);
export const patchModel = ({id, contents, makerId}) => axios.patch('/api/models/'+id, {contents: contents, makerId: makerId});
export const deleteModel = ({id, modelImage}) => axios.delete('/api/models/'+id, { data: { modelImage: modelImage }});
export const patchModelImg = ({id, formData}) => axios.patch('/api/models/modelImg/'+id, formData);
export const removeModelImg = ({id, preImgName}) => axios.delete('/api/models/modelImg/'+id, { data: { preImgName: preImgName }});
