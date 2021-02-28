import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const ItemInquilino = ({item }) => {

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
    }


    return (
        <>
        <View style={styles.fila}>
            <View>
                <Text style={styles.colHabitacion}>{item.nombreHabitacion}</Text>
            </View>
            <View>
                <Text style={styles.colNombre, styles.colNombre}>{item.nombrePersona}</Text>
            </View>
            <View>
                <Text style={styles.colApellidoPaterno}>{item.apellidoPaterno}</Text>
            </View>
            <View>
                <Text style={styles.colFecha}>2021-03-15</Text>
            </View>
            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(item.idInquilino) } style={styles.colBtnDesocupar}>
                    <Text style={styles.textoEliminar}> Eliminar &times; </Text>
                </TouchableHighlight>
            </View>
        </View>


        </>
    )
}

const styles = StyleSheet.create({
    fila: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection:'row',
        flex: 1

    },
    celda: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft:-5
    },
    colHabitacion: {
        fontWeight: 'bold',
        width:30,
        fontSize: 17,
        marginLeft:-5
    },
    colNombre: {
        fontWeight: 'bold',
        width:100,
        fontSize: 17,
        marginLeft:5
    },
    colApellidoPaterno: {
        fontWeight: 'bold',
        width:100,
        fontSize: 17,
        marginLeft:5
    },
    colFecha: {
        fontWeight: 'bold',
        width:95,
        fontSize: 17,
        marginLeft:5
    },
    colBtnDesocupar: {
        fontWeight: 'bold',
        width:100,
        fontSize: 17,
        marginLeft:10,
        backgroundColor: 'red',
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
 
export default ItemInquilino;