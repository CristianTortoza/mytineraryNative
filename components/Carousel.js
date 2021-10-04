import React from "react"
import { Text, View, StyleSheet,ImageBackground } from "react-native"
import Carousel from "react-native-snap-carousel"


const MyCarousel = () => {
  const items = [
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/pekin.png',
      nombre: 'Beijing',
      id: '1'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/Argentina.png',
      nombre: 'Buenos Aires',
      id: '2'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/Paris.png',
      nombre: 'Paris',
      id: '3'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/Roma.png',
      nombre: 'Rome',
      id: '4'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/japon.png',
      nombre: 'Osaka',
      id: '5'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/newYork.png',
      nombre: 'New York',
      id: '6'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/londres.png',
      nombre: 'London',
      id: '7'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/madrid.png',
      nombre: 'Madrid',
      id: '8'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/Venecia.png',
      nombre: 'Venice',
      id: '9'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/dubai.png',
      nombre: 'Dubai',
      id: '10'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/Sidney.png',
      nombre: 'Sydney',
      id: '11'
    },
    {
      src: 'https://my-tinerarytortoza.herokuapp.com/assets/Vancouver.png',
      nombre: 'Vancouver',
      id: '12'
    }
  ]

  _renderItem = ({item}) => {
    return (
        <View style={styles.popularMytineraries}>
            <View key={item.id} style={styles.slide}>
                <ImageBackground source={{uri : item.src}} style={styles.image}>
                    <Text style={styles.imageTitle}>{ item.nombre }</Text>
                </ImageBackground>
                
            </View>
        </View>
    );
}

  return(
    <Carousel
              data={items}
              renderItem={_renderItem}
              sliderWidth={420}
              itemWidth={420}
              layout={'default'} 
              loop={true}
              autoplay={true}
            /> 
  )

}

export default MyCarousel

const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    alignItems: "center",
    alignSelf: "center",
    height: 400,
    width: "100%",
    borderRadius: 30
  },
  slide:{
    width: "100%",
    padding: 10,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  popularMytineraries: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  imageTitle:{
    width: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: "center",
    padding: 20,
    fontSize: 30,
    fontFamily: "MerriweatherSans_700Bold"
  },
})
