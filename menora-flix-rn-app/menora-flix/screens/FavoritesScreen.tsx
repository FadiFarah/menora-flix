import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MovieDescription } from '../components/MovieDescription';

import { Text, View } from '../components/Themed';
import { setUserFavoritesIndicator } from '../redux/slices/userFavoritesIndicatorSlice';

export default function FavoritesScreen() {
  const userFavoriteMovies: [] = useSelector((state: any)=>state.reducerUserFavoriteMovies.value);
  const dispatch = useDispatch();

  useFocusEffect(() => {
    dispatch(setUserFavoritesIndicator(0));
    AsyncStorage.setItem("indicator", (0).toString())
      .then(() => {}).catch(() => {});
  })
  return (
    <View style={styles.container}>
      <FlatList keyExtractor={(item, index) => index.toString()} data={userFavoriteMovies} renderItem={({item}: any) => {
          return (
            <View style={styles.favoriteContainer}>
              <Text>{item?.title}</Text>
              <MovieDescription movie={item} />
            </View>
          )
          }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignSelf:'center',
    height: '100%',
    width: '100%',
    marginTop: 40
  },
  favoriteContainer: {
    height: 300,
    marginLeft: 15,
    marginRight: 15
  }
});
