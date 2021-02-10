import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addMedication } from '../store/medication-reducer';
import { TextInput, Button, Text } from 'react-native-paper';
import { invalidateToken } from '../store/user-reducer';

const mapDispatchToProps = { addMedication, invalidateToken };

function Medication(props) {

  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [medNote, setMedNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const newMedication = () => {

    let medObject = { user_id: props.user.id, token: props.user.token, medName, dosage, frequency, timeOfDay, medNote };
    console.log('MedObject on Medication:', medObject);
    try {
      props.addMedication(medObject);
    }
    catch (error) {
      console.log('error adding: ', error, 'invalidating token');
      props.invalidateToken();
    }
  }


  return (
    <>
      <TextInput
        label="Name of Medication"
        value={medName}
        onChangeText={text => setMedName(text)}
      />
      <TextInput
        label="Dosage"
        value={dosage}
        onChangeText={text => setDosage(text)}
      />
      <TextInput
        label="Frequency"
        value={frequency}
        onChangeText={text => setFrequency(text)}
      />
      <TextInput
        label="Time of Day"
        value={timeOfDay}
        onChangeText={text => setTimeOfDay(text)}
      />
      <TextInput
        label="Notes"
        value={medNote}
        onChangeText={text => setMedNote(text)}
      />
      <Text>{errorMessage}</Text>

      <Button onPress={() => newMedication()}>Add a Medication</Button>
    </>
  )
}

const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer,
  medications: state.medicationsReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Medication);
