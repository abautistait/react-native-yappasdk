import React, { ReactElement, FC, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import YappaSDK from 'react-native-yappasdk';


type YappaActionButtonProps = {
    contentUrl?: string,
    contentId?: string
  }


const YappaActionButton : FC<YappaActionButtonProps> = ({ contentUrl, contentId }): ReactElement => {

    const onPress = () => {
        YappaSDK.setContentId(contentId || "");
        YappaSDK.setContentUrl(contentUrl || "");
        YappaSDK.show();
    };

    useEffect(() => {
        if(contentUrl != null){
            YappaSDK.setContentUrl(contentUrl)
        }
        if(contentId != null){
            YappaSDK.setContentId(contentId)
        }

    }, [contentUrl, contentId])

    return (<TouchableOpacity onPress={onPress} style={styles.button}>
        <View style={styles.pressedButton} >
             <Image style={styles.yappaLogo} source={require("../../assets/yappa_icon.png")}></Image>
        </View>
    </TouchableOpacity>
    );
};

export default YappaActionButton;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 45,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        backgroundColor: 'rgba(0,0,0, .1)',
    },
    pressedButton: {
        backgroundColor: 'white',
        width: 64,
        height: 64,
        borderRadius: 45,
        flex: 1,
        justifyContent: "center"
    },
    yappaLogo: { width: 28, height: 28, alignSelf: "center" }
});