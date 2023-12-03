import commonApi from './commonApi';

// Contenir les fonctions spécifiques à l'API des services
const serviceApi = commonApi.create({
  baseURL: ' http://localhost:8080/api/services',
});

export const getAllServices = () => serviceApi.get('/');
export const getServiceById = (id) => serviceApi.get(`/${id}`);
