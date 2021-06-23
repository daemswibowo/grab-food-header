import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Animated, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from '@expo/vector-icons';

const HEADER_IMAGE = 'https://picsum.photos/450/300';
const HEADER_HEIGHT = 210;
const PADDING = 16;

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const imageScale = scrollY.interpolate({
    inputRange: [-90, 0, 90],
    outputRange: [2, 1, 1],
  });

  const headerZIndex = scrollY.interpolate({
    inputRange: [0, 125],
    outputRange: [0, -1],
  });

  return (
    <>
      <StatusBar style="light"/>

      <Animated.View style={{zIndex: -2, position: 'absolute', top: 0, height: HEADER_HEIGHT, width: '100%'}}>
        <Animated.Image style={[styles.headerImage, {position: 'absolute', top: 0, transform: [{scale: imageScale}]}]}
                        source={{uri: HEADER_IMAGE}}/>
      </Animated.View>

      <Animated.FlatList
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {y: scrollY}
            }
          }],
          {useNativeDriver: true}
        )
        }
        ListHeaderComponent={<View
          style={{marginTop: HEADER_HEIGHT - (PADDING * 2), paddingBottom: 8, justifyContent: 'flex-end'}}>
          <LinearGradient style={{position: 'absolute', width: '100%', height: '100%'}}
                          colors={['rgba(255,255,255, 0)', 'white']}/>

          <View style={{padding: PADDING}}>
            <View style={styles.detailCard}>
              <Text style={{fontSize: 24, fontWeight: '400', marginBottom: 8}}>Demons Chicken Rock - Semper
                Timur.</Text>
              <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, amet beatae blanditiis fuga ipsam nemo
                neque nesciunt, officia quos sed sint sit sunt temporibus? Beatae cumque facere facilis numquam
                porro.</Text>
            </View>
          </View>

        </View>}
        data={foods}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          const paddingLeft = index % 2 === 0 ? PADDING : PADDING / 2;
          const paddingRight = index % 2 === 0 ? PADDING / 2 : PADDING;

          return <View style={{backgroundColor: 'white', flex: 1, padding: PADDING / 2, paddingLeft, paddingRight}}
                       key={'makananEnak' + index}>
            <Image source={{uri: item.picture}}
                   style={{width: '100%', height: 190, resizeMode: 'cover', borderRadius: 10, marginBottom: 8}}/>
            <Text style={{fontWeight: '200', fontSize: 12, marginBottom: 4}}>{item.name}</Text>
            <Text style={{fontSize: 12}}>{item.price}</Text>
          </View>
        }}
        numColumns={2}
        keyExtractor={(_, index) => `makanan${index}`}
      />

      <Animated.View style={{position: 'absolute', zIndex: headerZIndex, width: '100%', padding: PADDING, paddingTop: 40}}>
        <TouchableOpacity style={{maxWidth: 30}} onPress={() => alert('woy')}>
          <View style={{
            backgroundColor: 'rgba(0,0,0,.4)',
            maxWidth: 30,
            height: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Ionicons name={'chevron-back-outline'} style={{color: 'white', fontSize: 20}}/>

          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: HEADER_HEIGHT,
    resizeMode: 'cover'
  },
  detailCard: {
    backgroundColor: 'white',
    shadowOpacity: .2,
    shadowColor: 'black',
    shadowRadius: 10,
    padding: PADDING,
    borderRadius: 10,
  }
});

const foods = [
  {
    id: 1,
    name: 'Original chicken karage',
    price: '23.000',
    picture: 'https://picsum.photos/200/300'
  },
  {
    id: 2,
    name: 'Mashed Potatoes',
    price: '13.000',
    picture: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    name: 'Original chicken karage Porsi ber 5',
    price: '233.000',
    picture: 'https://picsum.photos/200/300'
  },
  {
    id: 4,
    name: 'Ice cream vanilla',
    price: '10.000',
    picture: 'https://picsum.photos/200/300'
  },
  {
    id: 2,
    name: 'Mashed Potatoes',
    price: '13.000',
    picture: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    name: 'Original chicken karage Porsi ber 5',
    price: '233.000',
    picture: 'https://picsum.photos/200/300'
  },
  {
    id: 4,
    name: 'Ice cream vanilla',
    price: '10.000',
    picture: 'https://picsum.photos/200/300'
  },
];
