import React from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View } from 'react-native'

const City = (props) => {
  const { city } = props
  return(
    <>
      <Pressable onPress={() => props.navigation.navigate('itineraries', { id: city._id })}>
        <View style={styles.containCities}>
            <ImageBackground imageStyle={{ borderRadius: 20}}
                  source={{uri: `https://my-tinerarytortoza.herokuapp.com${city.foto}`}} style={styles.cityImage}>
                <Text style={styles.titleCity}>{city.nombre}</Text>
            </ImageBackground>
        </View>
      </Pressable>
    </>  
  )
}

export default City

const styles = StyleSheet.create({
  containCities:{
    height: 370,
    width: "100%",
    marginBottom: 20,
    padding: 4,
    paddingBottom: 0,
    shadowColor: "grey",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    
    elevation: 10,
    borderBottomLeftRadius:  50,
		borderBottomRightRadius:  50,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
  },
  cityImage: {
    height: "100%",
    width: "100%",
  } 
,
  titleCity:{
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
  },

})
