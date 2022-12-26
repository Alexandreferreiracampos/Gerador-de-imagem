
import { View, Text, TouchableOpacityProps, StyleSheet, Modal} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    statusModal: boolean;
 
}

export default function ScreenModal({statusModal}:ButtonProps) {
    

    return (

        <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={statusModal}
        >
                <View style={styles.outerView}>
                    <View style={styles.modalView}>
                        <Text>
                            Aguarde, estamos gerando uma imagem.
                        </Text>

                    </View>
                </View >

        </Modal>

    )
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: 'rgba(210,210,210,0.9)',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'rgb(243,243,243)',
        borderRadius: 20,
        padding: 20,
        width: 350,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        elevation: 1,
    },
    
})