import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";

export default function EmailScreen() {
  const handleSendEmail = async () => {
    // 1. Verifica se o dispositivo suporta o envio de e-mails
    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert("Erro", "Este dispositivo não suporta o envio de e-mails.");
      return;
    }

    // 2. Configura os dados do e-mail
    const options: MailComposer.MailComposerOptions = {
      recipients: ["exemplo@dominio.com"], // E-mail do destinatário
      subject: "Assunto do E-mail", // Assunto
      body: "Olá, este é o corpo da mensagem enviada através do aplicativo.", // Mensagem
    };

    // 3. Executa o envio
    try {
      const result = await MailComposer.composeAsync(options);
      if (result.status === "sent") {
        console.log("E-mail enviado com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o compositor de e-mail.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Enviar E-mail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
