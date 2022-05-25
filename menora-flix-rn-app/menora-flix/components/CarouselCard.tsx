import { StyleSheet, View, Text, ScrollView, Image, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

interface CarouselCardProps {
    movie?: {
        _id: string;
        title: string;
        imdbID: string;
        type: string;
        year: string;
        poster: string;
    };
    isFavorite?: boolean;
    handleFavoriteClick?: any;
    handleMovieImageClick?: any;
}
export function CarouselCard(props: CarouselCardProps) {
    const handleFavoriteClick = (movie: any) => {
        props.handleFavoriteClick(movie);
    }

    const handleMovieImageClick = (movie: any) => {
        props.handleMovieImageClick(movie);
    }
  return (
    <View key={props.movie?._id} style={styles.carouselCard}>
        <Pressable onPress={() => handleMovieImageClick(props.movie)}>
            <Image style={styles.cardImage} source={{uri: props.movie?.poster}} />
        </Pressable>
        <Pressable onPress={() => handleFavoriteClick(props.movie)}>
            <View style={styles.favoriteButton}>
                <AntDesign name="star" size={30} color={props.isFavorite ? 'white' : 'gray'} />
            </View>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    carouselCard: {
        backgroundColor: 'blue',
        height: '100%',
        width: 130,
        marginLeft: 5,
        marginRight: 5
    },
    cardImage: {
        width: '100%',
        height: '100%'
    },
    favoriteButton: {
        position:'absolute',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        bottom: 0
    }
});
