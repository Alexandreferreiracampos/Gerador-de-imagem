import axios from 'axios';
import {View, Text,Image, TouchableOpacity, StyleSheet, Modal, StatusBar } from 'react-native';
import { useEffect, useState} from 'react';
import ScreenModal from './component/Modal';

export default function HomeGenerator(){

    const [url, setUrl] = useState()

    const gerarImagem = async () => {
        const instance = axios.create({
            baseURL: 'https://api.openai.com/v1/images/generations',
            timeout: 1000000,
            headers: { 
                'Authorization': 'Bearer ' + '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',
                'Content-Type': 'application/json'
        
        }});

        await instance.post('',
        {
            "prompt": "an astronaut playing basketball with cats in space, digital art",
            "n": 1,
            "size": "1024x1024"
        }).then(response => {
            if (response.status == 200) {
                setUrl(response.data.data[0].url)
                console.log(response.data.data[0])
                

            }
        })

        
    };

    return(
        
        <View style={styles.container}>
            <ScreenModal statusModal={true}/>
            <StatusBar backgroundColor='rgb(243,243,243)' barStyle="dark-content" />
            <TouchableOpacity onPress={()=>gerarImagem()} ><Text>Gerar</Text><Text>{url}</Text></TouchableOpacity>
            <Image
        style={styles.tinyLogo}
        source={{
          uri: url,
        }}
      />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tinyLogo: {
        width: 350,
        height: 350,
      },
  });