import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard'
import useStorage from '../../hooks/useStorage'

export function ModalPassword({ password, handleClose }) {
    const { saveItem } = useStorage();
    
   async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);
    alert('Senha salva com sucesso!');

    await saveItem('@pass', password);

    handleClose();
    }
    
    
    
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.tittle}>Senha Gerada</Text>

                <Pressable style={styles.innerPassowrd} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>{password}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                      <TouchableOpacity style={[styles.button, styles.buttonSave] } onPress={handleCopyPassword}>
                        <Text style={styles.buttonSaveText  }>Salvar Senha</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(24, 24, 24, .6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '85%',
        backgroundColor: '#FFF',
        paddingTop: 24,
        paddingBottom: 24, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    tittle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 24,
    },
    innerPassowrd: {
        backgroundColor: '#030303',
        width: '90%',
        padding: 14,
        borderRadius: 8,
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonArea: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    button: {
       flex: 1,
       alignItems: 'center',
       marginTop: 14,
       marginBottom: 14,
       padding: 8,
    },
    buttonSave: {
        backgroundColor: '#392de9',
        borderRadius: 8,
    },
    buttonSaveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})