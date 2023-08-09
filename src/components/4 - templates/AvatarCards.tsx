import React from 'react';

// Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

// Entity
import { TwitterFile } from 'src/entity/TwitterFile';
import { Avatar } from 'src/entity/Avatar';

// API
import { generateAvatarForCurrentUser } from 'src/api/avatars';
import { getFilesForCurrentUser } from 'src/api/files';

// Components
import AvatarCard from '../3 - organisms/AvatarCard';

const styles: { [key: string]: React.CSSProperties } = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '1rem'
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        margin: 'auto'
    },
    modalContent: {
        width: '500px',
        height: 'auto',
        backgroundColor: 'white',
        padding: '20px'
    }
}


interface AddAvatarModalProps {
    open: boolean;
    onClose: () => void;
}

const AddAvatarModal: React.FC<AddAvatarModalProps> = (props) => {
    const [selectableFiles, setSelectableFiles] = React.useState<TwitterFile[]>([]); 
    const [selectedFileKey, setSelectedFileKey] = React.useState<string | null>(null);
    const [generatedAvatar, setGeneratedAvatar] = React.useState<Avatar | null>(null);
    const [modalState, setModalState] = React.useState<string>('initial');

    React.useEffect(() => {
        setModalState('loadingFiles');
        getFilesForCurrentUser().then((files: TwitterFile[]) => {
            setSelectableFiles(files);
            setModalState('selectFile');
        }).catch((err) => {
            console.log(err);
            setModalState('error');
        });
    }, []);

    const handleGenerate = async () => {
        if (!selectedFileKey) {
            return;
        }
        
        // TODO: Add call to the API to generate the avatar
        console.log("🚀 ~ file: AvatarCards.tsx:73 ~ handleGenerate ~ selectedFileKey:", selectedFileKey);
        setModalState('generatingAvatar');
        const avatar: Avatar = await generateAvatarForCurrentUser([selectedFileKey]);
        console.log("🚀 ~ file: AvatarCards.tsx:75 ~ handleGenerate ~ avatar", avatar);
        setGeneratedAvatar(avatar);
        setModalState('selectFile');
    }

    return (
        <Modal open={props.open} onClose={props.onClose} sx={styles.modalContainer}>
            <Grid container item xs={12} spacing={2} sx={styles.modalContent}>
                <Grid item xs={12}>
                    <Typography variant="h5">Add Avatar</Typography>
                    <Typography variant="body1" sx={{ marginBottom: '16px' }}>Add a new avatar to your collection.</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} sx={{ padding: (modalState === 'loadingFiles' ? '0px' : '64px') }} >
                    <FormGroup>
                        <Typography variant="body1">Select a file to use to generate your avatar.</Typography>
                        {modalState === 'loadingFiles' && <Typography variant="body1" align="center">Loading files...</Typography>}
                        {modalState === 'error' && <Typography variant="body1" align="center">Error loading files.</Typography>}
                        {['selectFile', 'generatingAvatar'].includes(modalState) && (
                            <Select
                                fullWidth
                                native
                                value={selectedFileKey}
                                onChange={(e) => { setSelectedFileKey(e.target.value) }}
                                sx={{ marginTop: '16px' }}
                                disabled={modalState === 'generatingAvatar'}
                            >
                                <option aria-label="None" value="" disabled selected>Select an uploaded Twitter CSV file</option>
                                {selectableFiles.map((file: TwitterFile) => {
                                    return (
                                        <option key={file.id} value={file.fileUrl}>{file.fileName}</option>
                                    )
                                })}
                            </Select>
                        )}
                    </FormGroup>
                </Grid>
                {modalState === 'generatingAvatar' && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                        <CircularProgress />
                    </Grid>
                )}
                {modalState === 'selectFile' && generatedAvatar && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                        <AvatarCard avatar={generatedAvatar} />
                    </Grid>
                )}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" color="primary" onClick={props.onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" sx={{ marginLeft: '8px' }} disabled={!selectedFileKey || (modalState === 'generatingAvatar')} onClick={handleGenerate}>Generate Avatar</Button>
                </Grid>
            </Grid>
        </Modal>
    )
}


interface AvatarCardsProps {
    onClickCard: (id: string) => void;
}

const AvatarCards: React.FC<AvatarCardsProps> = (props) => {
    const [addAvatarModalOpen, setAddAvatarModalOpen] = React.useState<boolean>(false);
    const [savedAvatars, setSavedAvatars] = React.useState<Avatar[]>([]);
    
    const handleAddAvatarModalOpen = () => { setAddAvatarModalOpen(true); }
    const handleAddAvatarModalClose = () => { setAddAvatarModalOpen(false); }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={styles.headerContainer}>
                <Typography variant="h5">Avatars</Typography>
                <Button variant="text" color="primary" onClick={handleAddAvatarModalOpen}>+ Create New Avatar</Button>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                {savedAvatars.length === 0 && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '48px', borderRadius: '16px' }}>
                        <Typography variant="body1">You don't have any avatars yet.</Typography>
                    </Grid>
                )}
                {savedAvatars.map((avatar: Avatar) => { 
                    return (
                        <Grid key={avatar.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <AvatarCard avatar={avatar} onClickCard={() => { props.onClickCard(avatar.id.toString()) }} />
                        </Grid>
                    )
                })}
            </Grid>
            <AddAvatarModal onClose={handleAddAvatarModalClose} open={addAvatarModalOpen} />
        </Grid>
    )
}

export default AvatarCards;