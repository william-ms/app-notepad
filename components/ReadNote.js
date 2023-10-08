import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal, TextInput } from 'react-native';

export default (props)=>
{
  state = props.state;
  notes = props.notes;
  noteCurrent = props.noteCurrent;
  idCurrent = props.idCurrent;
  setState = props.setState;
  setNotes = props.setNotes;
  setNoteCurrent = props.setNoteCurrent;

  function salveNote()
  {
    if(noteCurrent != '')
    {
      notes.map((val)=>
      {
        if(val.id == idCurrent)
        {
          val.note = noteCurrent;
        }
      })
    }

    (async ()=>
    {
      try
      {
        await AsyncStorage.setItem('notes', JSON.stringify(...notes, note));
        console.log('chamando');
      }
      catch(error)
      {
        //Error saving data
      }
    })();

    setNoteCurrent('');
    setState('show');
  }


  return (
    <Modal animationType="slide" transparent={true} onRequestClose={()=>{setState('show')}}>
      <View style={s.center_modal}>
        <TouchableOpacity style={s.btn_modal_close} onPress={()=> setState('view')}>
          <Text style={s.text_modal_close}>x</Text>
        </TouchableOpacity>
        
        <View style={s.modal}>
          <TextInput style={s.in_text_modal} onChangeText={text => setNoteCurrent(text)} autoFocus={true} multiline>{noteCurrent}</TextInput>

          <TouchableHighlight style={{...s.btn_modal_add}} onPress={()=>{ salveNote()}}>
            <Text style={s.text_modal_add}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({

  center_modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 100
  },

  modal: {
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowEffect: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndez: 5,
    justifyContent: 'space-between'
  },

  in_text_modal: {
    maxHeight: '60%',
    textAlignVertical: 'top',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },

  btn_modal_add: {
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#fbc02d'
  },

  text_modal_add: {
    color: 'white',
    fontWeight :'bold',
  },

  btn_modal_close: {
    position: 'relative',
    left: '38%',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#d50000",
    zIndex: 5
  },

  text_modal_close: {
    fontSize: 23,
    color: 'white',
    textAlign: 'center',
    elevation: 2,
  }
});
