import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { green, blue } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useEffect } from 'react';

const drawerWidth = 240;

const themedStyles = (theme) => {
    return {
        content: {
            padding: 3,
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            marginLeft: drawerWidth + 15,
        },
        paper: {
            borderRadius: '16px',
            padding: '20px',
            backgroundColor: theme.palette.background.paper,
        },
        stepBox: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            '& svg': {
                marginRight: '10px',
            },
        },
        buttonContainer: {
            marginTop: '20px',
            textAlign: 'center',
        },
    }
}

const RecruitmentProcessPage = () => {
    const recruitmentSteps = [[
        'Présélection des CV',
        'Entretien téléphonique',
        'Entretien en personne',
        'Offre d\'emploi'
    ]  
    ,[ 'Présélection des CV2',
    'Entretien téléphonique2',
    'Entretien en personne2',
    'Offre d\'emploi2', 'Offre d\'emploi2'],
    [ 'Présélection des CV3',
    'Entretien téléphonique3',
    'Entretien en personne3',
    'Offre d\'emploi3']
        
    ];
    const [recruitmentStep, setRecruitmentStep] = useState([]);
    const [offer, setOffer] = useState({});
    const {idOffer}=useParams();
    useEffect(() => {
        const getOfferById = (idOffer, setOffer) => {
            axios.get(`http://localhost:3001/offres/${idOffer}`)
                .then((response) => {
                    console.log(response.data);
                    setOffer(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching offer:', error);
                });
        };
        
        getOfferById(idOffer, setOffer);
    }, [idOffer]); 
    
    useEffect(() => {
        if (offer.type==="Technique") {
            setRecruitmentStep(recruitmentSteps[0]);
        }else{ if (offer.type==="Communication") {
            setRecruitmentStep(recruitmentSteps[1]);
        }else{ if (offer.type==="Emplacement") {
            setRecruitmentStep(recruitmentSteps[2]);
        }}}
    }, [offer]); 

    console.log(idOffer)
    const theme = useTheme();

    const handleConfirmSteps = () => {
        
        console.log("Étapes confirmées !");
    };

    const handleEditSteps = () => {
        // Logique pour modifier les étapes
        console.log("Modification des étapes...");
    };
    
    
      
    return (
        <div sx={{ backgroundColor: '#f0f2f5' }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={themedStyles(theme).paper}>
                        <Typography variant="h5" gutterBottom>Processus de Recrutement</Typography>
                        <Grid container spacing={2}>
                            {recruitmentStep.map((step, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box sx={themedStyles(theme).stepBox}>
                                        <Typography variant="h6" sx={{ marginRight: '10px' }}>{index + 1}.</Typography>
                                        <CheckCircleOutlineIcon sx={{ color: green[500] }} />
                                        <Typography variant="body1">{step}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={themedStyles(theme).buttonContainer}>
                            <Button variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={handleConfirmSteps}>Confirmer les Étapes</Button>
                            <Button variant="contained" color="info" startIcon={<EditIcon />} onClick={handleEditSteps} sx={{ marginLeft: '10px' }}>Modifier les Étapes</Button>
                        </Box>
                    </Paper>
                </main>
            </Box>
        </div>
    );
};

export default RecruitmentProcessPage;
