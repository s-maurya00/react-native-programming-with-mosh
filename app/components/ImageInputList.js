import { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

const ImageInputList = ( { imageUris = [], onRemoveImage, onAddImage } ) => {

    const scrollView = useRef();

    return (
        <View>
            <ScrollView
                horizontal
                ref={scrollView}
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
                style={styles.container}
                showsHorizontalScrollIndicator={false}
            >
                {imageUris.map((uri) => (
                    <View key={uri} style={styles.image}>
                        <ImageInput imageUri={uri} onChangeImage={() => onRemoveImage(uri)} />
                    </View>
                ))}
                <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: "row",
    },

    image: {
        marginRight: 10,
    },
});

export default ImageInputList;