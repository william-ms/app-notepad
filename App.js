import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, Modal, TextInput, LogBox } from 'react-native';
import  Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';

import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';

import EditNote from './components/EditNote.js';
import ReadNote from './components/ReadNote.js';

export default function App() {
  LogBox.ignoreAllLogs();

  const bgHeader = require('./assets/bg.jpg');

  const [state, setState] = useState('show');
  const [notes, setNotes] = useState([]);
  const [noteCurrent, setNoteCurrent] = useState('');
  const [idCurrent, setIdCurrent] = useState(0);

  {/** Unidade de teste */}
  // const [notes, setNotes] = useState([
  //   {id: 1, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 2, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 3, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 4, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 5, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 6, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 7, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 8, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 9, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 10, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 11, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 12, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 13, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 14, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 15, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 16, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 17, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 18, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 19, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  //   {id: 20, note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget augue in augue aliquam sollicitudin. Curabitur efficitur, leo at pellentesque dignissim, enim lorem auctor metus, quis gravida sem diam eu ligula.'},
  // ]);

  useEffect(()=>
  {
    (async ()=>
    {
      try
      {
        let noteCurrent = await AsyncStorage.getItem('notes');
        if(noteCurrent == null)
        {
          setNotes([]);
        }
        else
        {
          setNotes(JSON.parse(noteCurrent));
        }
      }
      catch(error)
      {
        //Error saving data
      }
    })();
  }, []);

  let [fontsLoaded] = useFonts({Lato_400Regular});
  if(!fontsLoaded) { return null; };

  

  function deleteNote(id)
  {
    let newNotes = notes.filter(function(val)
    {
      return val.id != id;
    })

    setNotes(newNotes);

    (async ()=>
    {
      try
      {
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        console.log('chamando');
      }
      catch(error)
      {
        //Error saving data
      }
    })();
  }

  function readNote(id, note)
  {
    setIdCurrent(id);
    setNoteCurrent(note);
    setState('read')
  }

  if(state == 'edit')
  {
    var modalContent = 
      <EditNote 
        state={state} 
        setState={setState} 
        notes={notes} 
        setNotes={setNotes} 
        noteCurrent={noteCurrent}
        setNoteCurrent={setNoteCurrent}
      />
  }
  else if(state == 'read')
  {
    var modalContent = 
      <ReadNote
        state={state} 
        setState={setState} 
        notes={notes} 
        setNotes={setNotes} 
        noteCurrent={noteCurrent}
        idCurrent={idCurrent}
        setNoteCurrent={setNoteCurrent}
      />
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar style='light' />

      {modalContent}

      <ImageBackground source={bgHeader} style={s.header_bg}>
        <View style={s.header_filter}>
          <Text style={s.header_text}>Bloco de Notas</Text>
        </View>
      </ImageBackground>

      <ScrollView>
      {
        notes.map((val)=>
        {
          return(
            <View style={s.note_single}>
              <TouchableOpacity style={s.note_wrapper} onPress={()=>readNote(val.id, val.note)}>
                <Text style={s.note_text}>{val.note}</Text>
              </TouchableOpacity>
        
              <TouchableOpacity style={s.note_btn_delete} onPress={()=>{deleteNote(val.id)}}>
                <AntDesign name="minussquareo" size={24} color="#fbc02d" />
              </TouchableOpacity>
            </View>
          );
        })
      }
      </ScrollView>

      <TouchableOpacity style={s.btn_add} onPress={()=>setState('edit')}>
        <Text style={s.btn_add_text}>+</Text>
      </TouchableOpacity>
  

    </View>
  );
}

const s = StyleSheet.create({
  /***** HEADER *****/
  header_bg: {
    width: '100%',
    height: 100 + Constants.statusBarHeight,
    resizeMode: 'cover',
  },

  header_filter: {
    width :'100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  header_text: {
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    lineHeight: 100 + Constants.statusBarHeight
  },

  /***** NOTEPAD *****/
  note_single: {
    display :'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'Black',
    flexDirection: 'row',
    paddingBottom: 10
  }, 

  note_wrapper: {
    width: '80%',
  },

  note_btn_delete: {
    alignSelf: 'center',
  },

  btn_add: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fbc02d",
    elevation: 2,
  },

  btn_add_text: {
    textAlign: 'center',
    fontSize: 31,
    color: 'white'
  },

  modal: {
    paddingTop: 100 + Constants.statusBarHeight
  }
});
