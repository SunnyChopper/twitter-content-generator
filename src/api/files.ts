// System
import { Auth } from 'aws-amplify';

// Entities
import { TwitterFile } from 'src/entity/TwitterFile';

export const getFilesForCurrentUser = async (): Promise<TwitterFile[]> => {
    if (process.env.REACT_APP_API_BASE_URL === undefined || process.env.REACT_APP_API_BASE_URL === null) {
        throw new Error('API base URL is not defined.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    };

    const apiPath = `${process.env.REACT_APP_API_BASE_URL}/files`;
    const response = await fetch(apiPath, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`Failed to save file. Status code: ${response.status}`);
    }

    return await response.json() as TwitterFile[];
}

export const createFileForCurrentUser = async (file: File, key: string): Promise<void> => {
    if (process.env.REACT_APP_API_BASE_URL === undefined || process.env.REACT_APP_API_BASE_URL === null) {
        throw new Error('API base URL is not defined.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    };
    
    const apiPath = `${process.env.REACT_APP_API_BASE_URL}/files`;
    const response = await fetch(apiPath, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            userId: (await Auth.currentSession()).getIdToken().payload.sub,
            fileName: file.name,
            fileUrl: key
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to save file. Status code: ${response.status}`);
    }
}

export const deleteFileForCurrentUser = async (fileId: string): Promise<boolean> => {
    if (process.env.REACT_APP_API_BASE_URL === undefined || process.env.REACT_APP_API_BASE_URL === null) {
        throw new Error('API base URL is not defined.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    };

    const apiPath = `${process.env.REACT_APP_API_BASE_URL}/files`;
    const response = await fetch(apiPath, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({
            fileId: fileId
        })
    });

    if (response.status !== 200) {
        return false;
    }

    return true;
}