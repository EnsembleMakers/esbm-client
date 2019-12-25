import axios from 'axios';

export const getAllCoupon = () => axios.get('/api/coupons');
export const getCouponByHash = (hash) => axios.get('/api/coupons/'+hash);
export const getCouponByReviewId = (reviewId) => axios.get('/api/coupons/review/'+reviewId);
export const postCoupon = ({ reviewId, userId, hash }) => axios.post('/api/coupons', { reviewId, userId, hash });
export const patchCoupon = ({ hash, reviewId }) => axios.patch('/api/coupons/'+hash, { reviewId });