import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../configs/colors';


const NewListingButton = ( { onPress } ) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name='plus-circle' size={30} color={colors.white} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        backgroundColor: colors.primary,
        borderColor: colors.white,
        borderRadius: 40,
        borderWidth: 10,
        bottom: 20,
        height: 70,
        justifyContent: "center",
        width: 70,
    },
});

export default NewListingButton;