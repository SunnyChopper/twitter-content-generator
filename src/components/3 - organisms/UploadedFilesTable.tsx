import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import FileUpload from './FileUpload';

interface UploadedFilesTableProps {
    actionType: 'CRUD' | 'LLM' | 'Display';
    handleClickEdit: (id: string) => void;
    handleClickDelete: (id: string) => void;
    handleClickGenerate: (id: string) => void;
    handleClickCreateAvatar: (id: string) => void;
    disableButtons?: boolean;
    showUploadButton?: boolean;
    showTitle?: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
    headerContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    uploadButton: {
        marginLeft: '10px'
    }
}

interface FileUploadModalProps {
    handleCancel: () => void;
    open: boolean;
}

const FileUploadModal: React.FC<FileUploadModalProps> = (props) => {
    const [fileUrl, setFileUrl] = React.useState('');
    const [uploadButtonEnabled, setUploadButtonEnabled] = React.useState(false);

    return (
        <Modal open={props.open} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={2} sx={{ width: '500px', height: '500px', backgroundColor: 'white', padding: '20px' }}>
                <Grid item xs={12}>
                    <Typography variant="h5">Upload CSV</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FileUpload setFileUrl={setFileUrl} setUploadEnabled={setUploadButtonEnabled} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="small" disabled={!uploadButtonEnabled}>Upload</Button>
                    <Button variant="text" color="primary" size="small" onClick={props.handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Modal>
    );
}

const UploadedFilesTable: React.FC<UploadedFilesTableProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => { 
        console.log(open);
    }, [open]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const renderActionButton = (id: string) => {
        if (props.actionType === 'CRUD') {
            return <Button variant="contained" color="primary" size="small" disabled={props.disableButtons}>Edit</Button>;
        } else if (props.actionType === 'LLM') {
            return <Button variant="contained" color="primary" size="small" disabled={props.disableButtons} onClick={() => { props.handleClickGenerate(id) }}>Select File</Button>;
        } else {
            return <Button variant="contained" color="primary" size="small" disabled={props.disableButtons}>Create Avatar</Button>;
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={styles.headerContainer}>
                {props.showTitle && <Typography variant="h5">Uploaded Files</Typography>}
                {props.showUploadButton && <Button variant="text" color="primary" size="small" sx={styles.uploadButton} onClick={handleOpen}>+ Add CSV</Button>}
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell># of Content Found</TableCell>
                                <TableCell>Uploaded At</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>twitter_analytics_f9r43f0r3f_2021-10-10.csv</TableCell>
                                <TableCell>420</TableCell>
                                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {renderActionButton('1')}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <FileUploadModal open={open} handleCancel={handleClose} />
            </Grid>
        </Grid>
    );
}

export default UploadedFilesTable;