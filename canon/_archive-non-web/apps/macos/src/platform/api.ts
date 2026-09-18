import {createApiClient} from '@training/shared/utils/api';
import {API_BASE_URL} from './config';

export const API = API_BASE_URL;

const apiClient = createApiClient(API);

export const jwtName = apiClient.jwtName;
export const loadUser = apiClient.loadUser;
export const saveUser = apiClient.saveUser;
export const apiAuth = apiClient.apiAuth;
export const loadFileWorkspace = apiClient.loadFileWorkspace;
export const analyzeFileWorkspace = apiClient.analyzeFileWorkspace;
export const analyzeSingleWorkspaceFile = apiClient.analyzeSingleWorkspaceFile;
