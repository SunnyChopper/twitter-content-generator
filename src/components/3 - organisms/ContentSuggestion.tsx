import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

import UploadedFilesTable from './UploadedFilesTable';

const styles = {
    formRow: {
        marginTop: '24px',
        marginBottom: '16px'
    }
}

const ContentSuggestion = () => {
    const [isLoadingContent, setIsLoadingContent] = React.useState<boolean>(false);
    const [selectedFileId, setSelectedFile] = React.useState<string>('');
    const [llmModel, setLlmModel] = React.useState<string>('');
    const [contentType, setContentType] = React.useState<string>('');
    const [selectedAvatarId, setSelectedAvatar] = React.useState<string>('');

    const handleFileSelect = (id: string) => { 
        setSelectedFile(id);
    };

    const handleGenerate = () => { 
        setIsLoadingContent(true);

        // TODO: Send the API request to generate content
        console.log(`Need to send an API request to generate content from file ${selectedFileId} using model ${llmModel} and content type ${contentType} with avatar ${selectedAvatarId}`);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={styles.formRow}>
                <Typography variant="h5">1. Choose a File</Typography>
                <Typography variant="body1">Select a file from the list below to generate content from.</Typography>
                <UploadedFilesTable
                    actionType="LLM"
                    handleClickCreateAvatar={() => { }}
                    handleClickDelete={() => { }}
                    handleClickEdit={() => { }}
                    handleClickGenerate={handleFileSelect}
                    disableButtons={isLoadingContent}
                />
            </Grid>

            {selectedFileId && (
                <Grid item xs={12} style={styles.formRow}>
                    <Typography variant="h5">2. Choose a Model</Typography>
                    <Typography variant="body1">Select a model from the list below to generate content from.</Typography>
                    <Select
                        fullWidth
                        native
                        value={llmModel}
                        onChange={(e) => setLlmModel(e.target.value as string)}
                    >
                        <option value="" disabled>Select a model</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="gpt-3.5-turbo-16k">GPT-3.5 Turbo 16k</option>
                    </Select>
                </Grid>
            )}

            {selectedFileId && llmModel && (
                <>
                    <Grid item xs={12} style={styles.formRow}>
                        <Typography variant="h5">3. Content Type</Typography>
                        <Typography variant="body1">Select the type of content you want to generate.</Typography>
                        <Select
                            fullWidth
                            native
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value as string)}
                        >
                            <option value="" disabled>Select a content type</option>
                            <option value="tweets">Tweets</option>
                            <option value="media ideas">Media Ideas</option>
                            <option value="replies">Replies</option>
                            <option value="long form thread ideas">Long Form Thread Ideas</option>
                            <option value="long form threads">Long Form Threads</option>
                        </Select>
                    </Grid>

                    <Grid item xs={12} style={styles.formRow}>
                        <Typography variant="h5">4. Select Avatar (Optional)</Typography>
                        <Typography variant="body1">Select an avatar to use when generating content.</Typography>
                        <Select
                            fullWidth
                            native
                            value={selectedAvatarId}
                            onChange={(e) => setSelectedAvatar(e.target.value as string)}
                        >
                            {/* TODO: Replace with the avatars from the API */}
                            <option value="" disabled>Select an avatar</option>
                            <option value="1">Avatar 1</option>
                            <option value="2">Avatar 2</option>
                            <option value="3">Avatar 3</option>
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" disabled={!llmModel || contentType === '' || isLoadingContent} sx={{marginTop: '8px'}} onClick={handleGenerate}>Generate Content</Button>
                    </Grid>
                </>
            )}

            {isLoadingContent && (
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            )}
        </Grid>
    );
};

export default ContentSuggestion;