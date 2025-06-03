import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage';

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([]);
    const focused = useIsFocused();
    const { getItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem('@pass');
            setListPasswords(passwords);
        }

        if (focused) {
            loadPasswords();
        }

    }, [focused]);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.header}>
                <Text style={styles.title}> Minhas Senhas </Text>
            </View>

            <View style={styles.content}>
                {listPasswords.length > 0 ? (
                    <FlatList
                        data={listPasswords}
                        keyExtractor={ (item, index) => String(item.id || index) }
                        renderItem={ ({ item }) => (
                            <View style={styles.passwordItemContainer}>
                                <Text style={styles.passwordText}>{item}</Text>
                            </View>
                        )}
                        style={styles.list}
                    />
                ) : (
                    <Text style={styles.noPasswordsText}>Nenhuma senha salva.</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#392de9',
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 14,
    },
    list: {
        flex: 1,
    },
    passwordItemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    passwordText: {
        fontSize: 16,
        color: '#333',
    },
    noPasswordsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});