import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
  Animated,
  Platform,
} from 'react-native';

export default function ClimaScreen() {
  const [cidade, setCidade] = useState('Nova Iguaçu');
  const [temperatura, setTemperatura] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const animarEntrada = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const animarSaida = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const cidadesCoordenadas = {
    'nova iguaçu': { lat: -22.7556, lon: -43.4603 },
    'rio de janeiro': { lat: -22.9068, lon: -43.1729 },
    'são paulo': { lat: -23.5505, lon: -46.6333 },
    'belo horizonte': { lat: -19.9245, lon: -43.9352 },
    brasília: { lat: -15.8267, lon: -47.9218 },
    salvador: { lat: -12.9777, lon: -38.5016 },
    fortaleza: { lat: -3.7319, lon: -38.5267 },
    curitiba: { lat: -25.4284, lon: -49.2733 },
    'porto alegre': { lat: -30.0346, lon: -51.2177 },
    recife: { lat: -8.0476, lon: -34.877 },
    manaus: { lat: -3.119, lon: -60.0217 },
  };

  const buscarClima = async () => {
    if (!cidade.trim()) {
      Alert.alert('Atenção', 'Digite o nome de uma cidade!');
      return;
    }

    Keyboard.dismiss();
    animarSaida();
    setCarregando(true);
    setErro('');
    setTemperatura(null);
    setDescricao('');

    const cidadeLower = cidade.toLowerCase();
    const coords = cidadesCoordenadas[cidadeLower];

    if (!coords) {
      setErro('🌍 Cidade não encontrada!\nUse: Rio de Janeiro, São Paulo, etc.');
      setCarregando(false);
      return;
    }

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=America/Sao_Paulo`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.current_weather) {
        setTemperatura(Math.round(data.current_weather.temperature));

        const weatherCode = data.current_weather.weathercode;
        const descricoes = {
          0: 'céu limpo',
          1: 'principalmente limpo',
          2: 'parcialmente nublado',
          3: 'nublado',
          45: 'nevoeiro',
          51: 'chuvisco leve',
          61: 'chuva moderada',
          80: 'pancadas de chuva',
        };
        setDescricao(descricoes[weatherCode] || 'condição normal');
        setTimeout(() => animarEntrada(), 200);
      } else {
        setErro('❌ Erro ao buscar dados.');
      }
    } catch (error) {
      setErro('📡 Erro de conexão.\nVerifique sua internet.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarClima();
  }, []);

  const obterCorFundo = () => {
    if (temperatura === null) return '#667eea';
    if (temperatura < 15) return '#4facfe';
    if (temperatura < 25) return '#43e97b';
    return '#fa709a';
  };

  const obterIconeClima = () => {
    if (!descricao) return '🌡️';
    const desc = descricao.toLowerCase();
    if (desc.includes('chuva')) return '🌧️';
    if (desc.includes('nublado')) return '☁️';
    if (desc.includes('limpo')) return '☀️';
    if (desc.includes('neve')) return '❄️';
    return '🌈';
  };

  return (
    <View style={[styles.container, { backgroundColor: obterCorFundo() }]}>
      <View style={styles.content}>
        <Text style={styles.titulo}>⛅ Previsão do Tempo</Text>
        <Text style={styles.subtitulo}>Descubra o clima em qualquer cidade</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>🌍 Nome da Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rio de Janeiro, São Paulo"
            placeholderTextColor="#999"
            value={cidade}
            onChangeText={setCidade}
            onSubmitEditing={buscarClima}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={buscarClima} activeOpacity={0.85}>
          <View style={styles.buttonGradient}>
            <Text style={styles.buttonText}>🔍 Buscar Clima</Text>
          </View>
        </TouchableOpacity>

        {carregando && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Buscando informações...</Text>
          </View>
        )}

        {erro ? (
          <View style={styles.erroContainer}>
            <Text style={styles.erroEmoji}>😔</Text>
            <Text style={styles.erro}>{erro}</Text>
          </View>
        ) : null}

        {temperatura !== null && !carregando && (
          <Animated.View
            style={[
              styles.resultadoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.iconeClima}>{obterIconeClima()}</Text>
            <Text style={styles.cidadeNome}>{cidade}</Text>
            <Text style={styles.temperatura}>{temperatura}°C</Text>
            <View style={styles.divisor} />
            <Text style={styles.descricao}>
              {descricao.charAt(0).toUpperCase() + descricao.slice(1)}
            </Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoEmoji}>💧</Text>
                <Text style={styles.infoLabel}>Umidade</Text>
                <Text style={styles.infoValue}>--%</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoEmoji}>🌬️</Text>
                <Text style={styles.infoLabel}>Vento</Text>
                <Text style={styles.infoValue}>-- km/h</Text>
              </View>
            </View>

            <Text style={styles.atualizacao}>Atualizado agora</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  button: {
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loaderContainer: { alignItems: 'center', marginTop: 30 },
  loadingText: { color: '#fff', marginTop: 10, fontSize: 14 },
  erroContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 15,
  },
  erroEmoji: { fontSize: 50, marginBottom: 10 },
  erro: { color: '#fff', textAlign: 'center', fontSize: 16, lineHeight: 22 },
  resultadoContainer: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  iconeClima: { fontSize: 70, marginBottom: 10 },
  cidadeNome: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  temperatura: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ee5a24',
    marginVertical: 10,
  },
  divisor: {
    width: 60,
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  descricao: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  infoItem: { alignItems: 'center', flex: 1 },
  infoDivider: { width: 1, height: 40, backgroundColor: '#eee' },
  infoEmoji: { fontSize: 24, marginBottom: 5 },
  infoLabel: { fontSize: 12, color: '#999', marginBottom: 3 },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  atualizacao: { fontSize: 11, color: '#bbb', marginTop: 15 },
});
