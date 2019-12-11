import axios from 'axios';

export const getAllCoupon = () => axios.get('/api/coupons');
export const getCouponByHash = (hash) => axios.get('/api/coupons/'+hash);
export const postCoupon = ({ reviewId, userId, hash }) => axios.post('/api/coupons', { reviewId, userId, hash });