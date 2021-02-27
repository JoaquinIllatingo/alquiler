import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Consulta = () => {

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
    }



    return (
        <>
        <View style={styles.fila}>
            <View style={styles.celda}>
                <Text style={styles.texto}>101</Text>
            </View>
            <View style={styles.celda}>
                <Text style={styles.texto}>Juan</Text>
            </View>
            <View style={styles.celda}>
                <Text style={styles.texto}>Perez</Text>
            </View>
            <View style={styles.celda}>
                <Text style={styles.texto}>24/05/2021</Text>
            </View>
            <View style={styles.celda}>
                <TouchableHighlight onPress={ () => dialogoEliminar(1) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> PAGAR </Text>
                </TouchableHighlight>
            </View >
            <View style={styles.celda}>
                <TouchableHighlight onPress={ () => dialogoEliminar(1) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> ELIMINAR </Text>
                </TouchableHighlight>
            </View>
        </View>

        <View style={styles.fila}>
            <View style={styles.celda}>
                <Text style={styles.texto}>102</Text>
            </View>
            <View style={styles.celda}>
                <Text style={styles.texto}>Juan</Text>
            </View>
            <View style={styles.celda}>
                <Text style={styles.texto}>Perez</Text>
            </View>
            <View style={styles.celda}>
                <Text style={styles.texto}>24/05/2021</Text>
            </View>
            <View style={styles.celda}>
                <TouchableHighlight onPress={ () => dialogoEliminar(1) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> PAGAR </Text>
                </TouchableHighlight>
            </View >
            <View style={styles.celda}>
                <TouchableHighlight onPress={ () => dialogoEliminar(1) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> ELIMINAR </Text>
                </TouchableHighlight>
            </View>
        </View>

        
        </>

    )
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    celda:{
        borderStyle: 'solid',
        marginLeft: 10,
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
        textAlign: 'center'
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