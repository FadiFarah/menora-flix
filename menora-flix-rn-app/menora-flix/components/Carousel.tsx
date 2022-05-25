import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { CarouselCard } from "./CarouselCard";

interface CarouselProps {
    movies?: [];
    favorites?: [];
    handleFavoriteClick?: any;
    handleMovieImageClick?: any;
}
export function Carousel(props: CarouselProps) {
  const handleFavoriteClick = (movie: any) => {
    props.handleFavoriteClick(movie);
  }

  const handleMovieImageClick = (movie: any) => {
    props.handleMovieImageClick(movie);
  }

  return (
    <ScrollView horizontal={true} style={styles.carouselScroll}>
      {
        props.movies?.map((movie: any) => {
          var indexOf = props.favorites?.findIndex((favMovie: any) => favMovie?.imdbID === movie?.imdbID);
         return indexOf !== -1 ? <CarouselCard handleMovieImageClick={() => handleMovieImageClick(movie)} handleFavoriteClick={() => handleFavoriteClick(movie)} isFavorite={true} movie={movie} /> : <CarouselCard handleMovieImageClick={() => handleMovieImageClick(movie)} handleFavoriteClick={() => handleFavoriteClick(movie)} isFavorite={false} movie={movie} />
        })
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    carouselScroll: {
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row'
    }
});
