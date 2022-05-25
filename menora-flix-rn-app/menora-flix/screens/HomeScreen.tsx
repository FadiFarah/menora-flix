import axios, { AxiosResponseHeaders } from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';

import { Carousel } from '../components/Carousel';
import { RootTabScreenProps } from '../types';

import { setRecommendedMovies } from '../redux/slices/recommendedMoviesSlice';
import { addUserFavoriteMovie, removeUserFavoriteMovie, setUserFavoriteMovies } from '../redux/slices/userFavoriteMoviesSlice';
import { MovieDescription } from '../components/MovieDescription';
import { setNewMovies } from '../redux/slices/newMoviesSlice';
import { setUserFavoritesIndicator } from '../redux/slices/userFavoritesIndicatorSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../constants/endpoints';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const recommendedMovies: [] = useSelector((state: any)=>state.reducerRecommededMovies.value);
  const newMovies: [] = useSelector((state: any)=>state.reducerNewMovies.value);
  const userFavoriteMovies: [] = useSelector((state: any)=>state.reducerUserFavoriteMovies.value);
  const userFavoritesIndicator: number = useSelector((state: any)=>state.reducerUserFavoritesIndicatorSlice.value);

  const [currentMovie, setCurrentMovie] = useState({} as any);
  const dispatch = useDispatch();

  const handleMovieImageClick = (movie: any) => {
    setCurrentMovie(movie);
  }

  const handleFavoriteClick = (movie: any) => {

    AsyncStorage.getItem("auth")
      .then((auth: any) => {
        const headers: AxiosResponseHeaders = {
          "Authorization": auth?.toString()
        }

        var index = userFavoriteMovies.findIndex((favMovie: any) => {
          return favMovie?.imdbID === movie?.imdbID
        });
        
        if(index === -1) {
          dispatch(addUserFavoriteMovie(movie));
          dispatch(setUserFavoritesIndicator(userFavoritesIndicator + 1));
          AsyncStorage.setItem("indicator", (userFavoritesIndicator + 1).toString());
    
          const updatedFavoriteMovies = [...userFavoriteMovies, movie];
    
          axios.post(Endpoint.favoritesEndpoint, updatedFavoriteMovies, {headers: headers})
            .then((result: any) => {}).catch((error) => {console.log(error);});
        }
        else {      
          dispatch(removeUserFavoriteMovie(movie));
          if(userFavoritesIndicator > 0){
            dispatch(setUserFavoritesIndicator(userFavoritesIndicator - 1));
            AsyncStorage.setItem("indicator", (userFavoritesIndicator - 1).toString());
          }
          const updatedFavoriteMovies = [...userFavoriteMovies];    
          var index = updatedFavoriteMovies.findIndex((favMovie: any) => favMovie.imdbID === movie.imdbID);
          if(index !== -1) {
            updatedFavoriteMovies.splice(index, 1);
            
            axios.post(Endpoint.favoritesEndpoint, updatedFavoriteMovies, {headers: headers})
              .then((result: any) => {}).catch((error) => {console.log(error);});
          }
          else {
            return;
          }
          
        }
      })
      .catch((error) =>{
        console.log(error);
      })
        
  }
  
  useEffect(() => {
    AsyncStorage.getItem("auth")
      .then((auth: any) => {
        const headers: AxiosResponseHeaders = {
          "Authorization": auth?.toString()
        }
        axios.get(Endpoint.recommendedMoviesEndpoint, {headers: headers})
        .then((result: any) => {
          dispatch(setRecommendedMovies(result.data));
          setCurrentMovie(result.data.data[0]);
        })
        .catch((error) => {

        })

        axios.get(Endpoint.newMoviesEndpoint, {headers: headers})
        .then((result: any) => {
          dispatch(setNewMovies(result.data));
        })
        .catch((error) => {

        })

        axios.get(Endpoint.favoritesEndpoint, {headers: headers})
          .then((result: any) => {
            dispatch(setUserFavoriteMovies(result.data));
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
    
  }, [])
  
  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.recommendedContainer}>
        <Text style={styles.recommendedTitle}>Recommended Movies</Text>
        <Carousel handleMovieImageClick={(movie: any) => handleMovieImageClick(movie)} handleFavoriteClick={(movie: any) => handleFavoriteClick(movie)} movies={recommendedMovies} favorites={userFavoriteMovies} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Movie Description</Text>
        <MovieDescription movie={currentMovie} />
      </View>

      <View style={styles.newContainer}>
        <Text style={styles.newTitle}>New Movies</Text>
        <Carousel handleMovieImageClick={(movie: any) => handleMovieImageClick(movie)} handleFavoriteClick={(movie: any) => handleFavoriteClick(movie)} movies={newMovies} favorites={userFavoriteMovies} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginTop: 40,
    height: '100%'
  },
  recommendedContainer: {
    height: 200
  },
  recommendedTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 40,
    height: 300
  },
  descriptionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newContainer: {
    height: 200
  },
  newTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
