import { StyleSheet, View, Text, ScrollView, Image, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

interface MovieDescriptionProps {
    movie?: {
        title: string;
        imdbID: string;
        type: string;
        year: string;
        poster: string;
    };
}
export function MovieDescription(props: MovieDescriptionProps) {
  return (
    <View style={styles.movieDescriptionContainer}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: props.movie?.poster}} />
        </View>
        <View style={styles.description}>
            <Text style={styles.title}>{props.movie?.title}</Text>
            <View style={styles.movieDetails}>
                <Text style={styles.movieDetailText}>Year: {props.movie?.year}</Text>
                <Text style={styles.movieDetailText}>imdbID: {props.movie?.imdbID}</Text>
                <Text style={styles.movieDetailText}>Type: {props.movie?.type}</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    movieDescriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '70%',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        width: '48%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    description: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'gray',
        display: 'flex',
        width: '48%',
        padding: 10
    },
    title: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 15
    },
    movieDetails: {
        marginTop: '20%'
    },
    movieDetailText: {
        color: 'white',
        marginBottom: 10
    }
});
