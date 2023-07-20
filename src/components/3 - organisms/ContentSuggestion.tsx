import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

import UploadedFilesTable from './UploadedFilesTable';

const ContentSuggestion = () => {
    const [isLoadingContent, setIsLoadingContent] = React.useState(false);
    const [selectedFileId, setSelectedFile] = React.useState('');
    const [llmModel, setLlmModel] = React.useState('');

    const handleFileSelect = (id: string) => { 
        setSelectedFile(id);
    };

    const handleGenerate = () => { 
        setIsLoadingContent(true);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                    <Button variant="contained" color="primary" disabled={!llmModel || isLoadingContent} sx={{marginTop: '8px'}} onClick={handleGenerate}>Generate Content</Button>
                </Grid>
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