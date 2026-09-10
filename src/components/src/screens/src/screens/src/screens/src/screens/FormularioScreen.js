import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function FormularioScreen() {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [notificacoes, setNotificacoes] = useState(false);
  const [avaliacao, setAvaliacao] = useState(5);
  const [dadosEnviados, setDadosEnviados] = useState(null);

  const handleSubmit = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome!');
      return;
    }
    if (!cidade.trim()) {
      Alert.alert('Erro', 'Por favor, preencha a cidade!');
      return;
    }
    if (!idade.trim() || isNaN(idade) || parseInt(idade) <= 0) {
      Alert.alert('Erro', 'Por favor, preencha uma idade válida!');
      return;
    }

    const dados = {
      nome,
      cidade,
      idade: parseInt(idade),
      genero,
      notificacoes,
      avaliacao,
    };

    setDadosEnviados(dados);
    Alert.alert(
      'Dados Enviados!',
      `Nome: ${nome}\nCidade: ${cidade}\nIdade: ${idade}\nGênero: ${genero}\nNotificações: ${notificacoes ? 'Sim' : 'Não'}\nAvaliação: ${avaliacao}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Formulário de Cadastro</Text>

      <Text style={styles.label}>Nome completo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Cidade *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <Text style={styles.label}>Idade *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gênero</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
          <Picker.Item label="Prefiro não dizer" value="outro" />
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Receber notificações</Text>
        <Switch
          value={notificacoes}
          onValueChange={setNotificacoes}
          trackColor={{ false: '#767577', true: '#34C759' }}
        />
      </View>

      <Text style={styles.label}>Avaliação do app: {avaliacao.toFixed(0)}/10</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={avaliacao}
        onValueChange={setAvaliacao}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#ddd"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Dados</Text>
      </TouchableOpacity>

      {dadosEnviados && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Último envio:</Text>
          <Text>Nome: {dadosEnviados.nome}</Text>
          <Text>Cidade: {dadosEnviados.cidade}</Text>
          <Text>Idade: {dadosEnviados.idade}</Text>
          <Text>Gênero: {dadosEnviados.genero}</Text>
          <Text>Avaliação: {dadosEnviados.avaliacao}/10</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginTop: 5,
  },
  picker: { height: 50 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  slider: { width: '100%', height: 40, marginTop: 5 },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  previewContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
