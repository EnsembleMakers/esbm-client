import axios from 'axios';

export const getReviewById = (id) => axios.get('/api/reviews/'+id);
export const getReviewSeries = (offset) => axios.get('/api/reviews/series/next?'+ offset)
export const postReview = (data) => axios.post('/api/reviews', data);
export const patchReview = ({id, data}) => axios.patch('/api/reviews/'+id, data)