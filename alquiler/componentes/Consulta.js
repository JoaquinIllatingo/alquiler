import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Consulta = () => {

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
    }



    return (
        <View style={styles.inquilino}>
            <View>
                <Text style={styles.texto}>Juan</Text>
            </View>
            <View>
                <Text style={styles.texto}>Perez</Text>
            </View>
            <View>
                <Text style={styles.texto}>24/05/2021</Text>
            </View>

            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(1) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> P </Text>
                </TouchableHighlight>
            </View>

            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(1) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> - </Text>
                </TouchableHighlight>
            </View>
            
        </View>


    )
}

const styles = StyleSheet.create({
    inquilino: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
 
export default Consulta;