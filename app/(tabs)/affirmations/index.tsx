import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import images from "@/constants/affirmation-images";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View className="flex-1">
            <LinearGradient
                // Background Linear Gradient
                colors={["#2e1f58", "#54426b", "#a790af"]}
                className="px-5"
                style={{ paddingTop: insets.top }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='mb-6 mt-10'>
                    <TouchableOpacity
                              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                              className="absolute top-1 right-1 z-10"
                    >
                        <Ionicons name="menu" size={30} color="white" />
                    </TouchableOpacity>
                    <Text className="text-zinc-50 text-3xl font-bold">
                        Change your beliefs {`\n`}with affirmations
                    </Text>
                    
                    </View>
                    <View>
                        {AFFIRMATION_GALLERY.map((g) => (
                            <GuidedAffirmationsGallery
                                key={g.title}
                                title={g.title}
                                products={g.data}
                            />
                        ))}
                    </View> 
                </ScrollView>
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
};

const galleryData = [
    {
        title: "Positivity",
        data: [
            {
                id: 1,
                name: "test",
                image: images.californiaBackyardOne,
            },
            {
                id: 2,
                name: "test",
                image: images.californiaBackyardTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.californiaBackyardThree,
            },
            {
                id: 4,
                name: "test",
                image: images.californiaBackyardFour,
            },
        ],
    },
    {
        title: "Reduce Anxiety",
        data: [
            {
                id: 1,
                name: "test",
                image: images.englishCountrysideOne,
            },
            {
                id: 2,
                name: "test",
                image: images.englishCountrysideTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.englishCountrysideThree,
            },
            {
                id: 4,
                name: "test",
                image: images.englishCountrysideFour,
            },
        ],
    },
    {
        title: "Success",
        data: [
            {
                id: 1,
                name: "test",
                image: images.mountainMeditateOne,
            },
            {
                id: 2,
                name: "test",
                image: images.mountainMeditateTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.mountainMeditateThree,
            },
            {
                id: 4,
                name: "test",
                image: images.mountainMeditateFour,
            },
        ],
    },
    {
        title: "Self-Belief",
        data: [
            {
                id: 1,
                name: "test",
                image: images.nightSkyOne,
            },
            {
                id: 2,
                name: "test",
                image: images.nightSkyTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.nightSkyThree,
            },
            {
                id: 4,
                name: "test",
                image: images.nightSkyFour,
            },
        ],
    },
    {
        title: "Mental Health",
        data: [
            {
                id: 1,
                name: "test",
                image: images.oregonOne,
            },
            {
                id: 2,
                name: "test",
                image: images.oregonTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.oregonThree,
            },
            {
                id: 4,
                name: "test",
                image: images.oregonFour,
            },
        ],
    },
    {
        title: "Law of Attraction",
        data: [
            {
                id: 1,
                name: "test",
                image: images.relaxingRiverOne,
            },
            {
                id: 2,
                name: "test",
                image: images.relaxingRiverTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.relaxingRiverThree,
            },
            {
                id: 4,
                name: "test",
                image: images.relaxingRiverFour,
            },
        ],
    },
    {
        title: "Limiting Beliefs",
        data: [
            {
                id: 1,
                name: "test",
                image: images.tuscannyOne,
            },
            {
                id: 2,
                name: "test",
                image: images.tuscannyTwo,
            },
            {
                id: 3,
                name: "test",
                image: images.tuscannyThree,
            },
            {
                id: 4,
                name: "test",
                image: images.tuscannyFour,
            },
        ],
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
});

export default Page;
