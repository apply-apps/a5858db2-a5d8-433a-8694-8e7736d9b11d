// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [letter, setLetter] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchLetter = async () => {
        try {
            setLoading(true);
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: "Please give me a random letter for kids to learn reading." }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            const resultString = data.response.trim();
            setLetter(resultString);
        } catch (error) {
            console.error('Error fetching letter:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLetter();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Learn to Read</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.letterContainer}>
                    <Text style={styles.letter}>{letter}</Text>
                </View>
            )}
            <Button title="Next Letter" onPress={fetchLetter} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    letterContainer: {
        marginBottom: 20,
    },
    letter: {
        fontSize: 100,
        fontWeight: 'bold',
    },
});