import { StatusBar } from 'expo-status-bar';
import React , {useState , useEffect } from 'react';
import { StyleSheet, Text, View , Button , Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

export default function App() {
  const [hasPermission , setHasPermission] = useState(null);
  const [scanned , setScanned ] = useState(false);
  const [text , setText] = useState('Not yet Scanned')

  const askForCameraPermission = () =>
  {
    (async () =>
    {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    }) ()
  }

  //Request Camera Permission 
  useEffect(() => { askForCameraPermission();
  } , []);

  //What happens when we scan the bar code 
  const handleBarCodeScanned = ({type , data}) =>{
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '/nData: ' + data)
  }

  //Opening the link
  

  //Check permission adn return the screens 
  if(hasPermission == null)
  {
    return(
      <View style={styles.container}>
      <Text>Requesting for Camera Permission</Text>
      </View>
    )
  }

  

  if(hasPermission === false)
  {
    return(
      <View style={styles.container}>
      <Text style = {{margin: 10}}>No Access to Camera</Text>
      <Button title = {'Allow Camera'} onPress={() => askForCameraPermission()}/>
      </View>

    )
  }
  
  //Return the view 
  return (
    <View style={styles.container}>
      <View style = {styles.barcodebox}>
        <BarCodeScanner
        onBarCodeScanned={scanned? undefined :handleBarCodeScanned}
        style={{height: 400 , width:400}}/>
      
      </View>
      <Text style={styles.maintext}>{text}</Text>

{scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='black' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  maintext: {
    fontSize: 16,
    margin: 20 , 
  
  },

barcodebox:
{
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  height: 300,
  width: 300,
  overflow: 'hidden',
  borderRadius : 30,
  backgroundColor: 'black'

},



});
