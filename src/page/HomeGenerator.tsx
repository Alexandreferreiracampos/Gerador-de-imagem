import axios from 'axios';
import {View, Text,Image, TouchableOpacity, StyleSheet, Modal, StatusBar, TextInput, FlatList } from 'react-native';
import { useEffect, useState} from 'react';
import ScreenModal from './component/Modal';

export default function HomeGenerator(){

    const [url, setUrl] = useState();
    const [dataImg, setDataIma] = useState([]);
    const [title, setTitle] = useState();
    const [statusModal, setStatusModal] = useState(false);

    const gerarImagem = async () => {
        setStatusModal(true);
        const instance = axios.create({
            baseURL: 'https://api.openai.com/v1/images/generations',
            timeout: 1000000,
            headers: { 
                'Authorization': 'Bearer ' + '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',
                'Content-Type': 'application/json'
        
        }});

        await instance.post('',
        {
            "prompt": title,
            "n": 5,
            "size": "1024x1024"
        }).then(response => {
            if (response.status == 200) {
                var ImgData = [];
                for(var i = 0; i < response.data.data.length; i++){
                    ImgData.push(response.data.data[i].url)
                }

                setUrl(response.data.data[0].url)
                setDataIma(ImgData)

                setStatusModal(false)     
            }else{
                setStatusModal(false);
                console.log('falha')
            }
        })

        
    };

    return(
        
        <View style={styles.container}>
            <ScreenModal statusModal={statusModal}/>
            <StatusBar backgroundColor='rgb(243,243,243)' barStyle="dark-content" />
            <TextInput
                                    style={styles.inputText}
                                    value={title}
                                    placeholder="Descrição"
                                    placeholderTextColor="#000"
                                    maxLength={100}
                                    onChangeText={(text) => setTitle(text)}
                                />
            <TouchableOpacity onPress={()=>gerarImagem()} ><Text>Gerar</Text></TouchableOpacity>
            <FlatList
                 data={dataImg}
                 renderItem={({ item }) =>
                 
                     <Image
                       style={styles.tinyLogo}
                       source={{
                       uri: item,
                       }}
                        />
                   }
                   keyExtractor={item => item}
                   horizontal={false}
                   numColumns={1}
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
        margin:10,
        width: 300,
        height: 250,
      },
      inputText: {
        width: "90%",
        height: 70,
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 10,
        padding: 10,

    }
  });