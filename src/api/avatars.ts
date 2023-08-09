// System
import { Auth } from 'aws-amplify';

// Entities
import { Avatar } from 'src/entity/Avatar';

// Utils

export const generateAvatarForCurrentUser = async (fileKeys: string[]): Promise<Avatar> => {
    if (process.env.REACT_APP_API_BASE_URL === undefined || process.env.REACT_APP_API_BASE_URL === null) {
        throw new Error('API base URL is not defined.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    };

    const apiPath = `${process.env.REACT_APP_API_BASE_URL}/avatars`;
    const response = await fetch(apiPath, {
        method: 'POST',
        body: JSON.stringify({
            fileKeys: fileKeys
        }),
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`Failed to generate an avatar for the current user. Error: ${response.status}`);
    }

    return await response.json() as Avatar;
}