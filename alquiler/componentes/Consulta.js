import React, { useState,useEffect}  from 'react';
import { Text, StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import axios from 'axios';
import ItemInquilino from './ItemInquilino';

const Consulta = () => {

    const [consultarAPI, guardarConsultarAPI] = useState(true);

    const[inquilinos, guardarInquilinos]= useState([]);

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
    }

    useEffect(() => {
        const cotizarCriptomoneda = async () => {
          if(consultarAPI){
            console.log('consultando libros');
            //const url = `https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1`;
            //const url = `http://localhost:9091/consulta/inquilino?idPropiedad=1`;
            const url ='https://kaela2505.herokuapp.com/consulta/inquilinoDemo?idPropiedad=1';
            console.log(url);
            const resultado = await axios.get(url);

           console.log(resultado);
           guardarInquilinos(resultado.data);



            console.log('consultando inquilinos');
              const url2 = `http://localhost:9091/consulta/inquilino?idPropiedad=1`;
              console.log(url2);
              const resultado2 = await axios.get(url2);
  
             console.log(resultado2);
    
          }
        }

      
        cotizarCriptomoneda();
        
      }, []);


    
    return (
        <>
      
        <FlatList
              style={styles.listado}
              data={inquilinos}
              renderItem= {({item}) => <ItemInquilino item = {item} />}
              keyExtractor={ inquilinos => inquilinos.idInquilino}
            />
       

        
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