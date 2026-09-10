import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📱 App Mobile Clima</Text>
        <Text style={styles.version}>Versão 1.0.0</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
          <Text style={styles.description}>
            Este aplicativo foi desenvolvido como parte da avaliação prática da
            disciplina de Desenvolvimento de Aplicativo Mobile. Ele demonstra
            conceitos fundamentais como autenticação, navegação por abas,
            formulários dinâmicos e consumo de APIs externas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Funcionalidades</Text>
          <Text style={styles.listItem}>✓ Login e Cadastro de usuário</Text>
          <Text style={styles.listItem}>✓ Navegação por abas inferiores</Text>
          <Text style={styles.listItem}>✓ Formulário com Picker, Slider e Switch</Text>
          <Text style={styles.listItem}>✓ Consumo de API de Clima</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👩‍💻 Desenvolvedora</Text>
          <Text style={styles.devName}>Estudante
