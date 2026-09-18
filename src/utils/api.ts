import {createApiClient} from '@training/shared/utils/api';
import {resolveApiBase} from '../platform/resolveApiBase';

export const API = resolveApiBase();

const apiClient = createApiClient(API);

export const jwtName = apiClient.jwtName;
export const loadUser = apiClient.loadUser;
export const saveUser = apiClient.saveUser;
export const apiAuth = apiClient.apiAuth;
export const loadFileWorkspace = apiClient.loadFileWorkspace;
export const analyzeFileWorkspace = apiClient.analyzeFileWorkspace;
export const analyzeSingleWorkspaceFile = apiClient.analyzeSingleWorkspaceFile;
export const getBillingStatus = apiClient.getBillingStatus;
export const createCheckout = apiClient.createCheckout;
export const calculate = apiClient.calculate;
export const getCalculationHistory = apiClient.getCalculationHistory;
