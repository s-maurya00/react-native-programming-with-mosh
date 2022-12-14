// import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppFormField, AppFormPicker, FormImagePicker, SubmitButton } from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import Screen from '../components/Screen';

import colors from '../configs/colors';

import useLocation from '../hooks/useLocation';

import listingsApi from '../apis/listings';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image!"),
});

const categories = [
    { label: "Books", value: 1, backgroundColor: 'purple', icon: 'book-open-blank-variant'},
    { label: "Camera", value: 2, backgroundColor: 'lightblue', icon: 'camera'},
    { label: "Cars", value: 3, backgroundColor: 'chocolate', icon: 'car'},
    { label: "Clothing", value: 4, backgroundColor: 'pink', icon: 'shoe-heel'},
    { label: "Furniture", value: 5, backgroundColor: 'brown', icon: 'lamp'},
    { label: "Games", value: 6, backgroundColor: 'red', icon: 'cards'},
    { label: "Movies & Music", value: 7, backgroundColor: 'dodgerblue', icon: 'headphones'},
    { label: "Sports", value: 8, backgroundColor: 'orange', icon: 'basketball'},
    { label: "Others", value: 9, backgroundColor: 'gray', icon: 'view-grid-plus'},
]

const ListingEditScreen = () => {

    const location = useLocation();

    const handleSubmit = async(listing) => {
        const result = await listingsApi.addListing({ ...listing, location });

        if(!result.ok) {
            console.log(result.problem);
            return alert("Could not save the listing!!");
        }
        alert("Success");
    };

    return (
        <Screen style={styles.container}>
            <Formik
                initialValues={{ title: '', price: '', description: '', category: null, images: [] }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <>
                        <FormImagePicker name="images" />

                        <AppFormField maxLength={255} name="title" placeholder="Title" placeholderTextColor={colors.medium} />

                        <AppFormField
                            keyboardType="numeric"
                            maxLength={8}
                            name="price"
                            placeholder="Price"
                            placeholderTextColor={colors.medium}
                        />
                        
                        <AppFormPicker
                            items={categories}
                            name="category"
                            numberOfColumns={3}
                            PickerItemComponent={CategoryPickerItem}
                            placeholder="Category"
                        />
                        
                        <AppFormField
                            maxLength={255}
                            multiline
                            name="description"
                            numberOfLine={3}
                            placeholder="Description"
                            placeholderTextColor={colors.medium}
                        />

                        <SubmitButton title="Post" />

                    </>
                )}
            </Formik>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})

export default ListingEditScreen;