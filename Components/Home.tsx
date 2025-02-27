import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Stack";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useTradeController from "../Controller/TradeController";
import { Picker } from "@react-native-picker/picker";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

export default function Home() {
  const route = useRoute<HomeScreenRouteProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const { userData } = route.params;
  const [amountText, setAmountText] = useState("");

  const {
    trades,
    detailedTrades,
    totalAmount,
    setAmount,
    type,
    setType,
    description,
    setDescription,
    handleTrade,
    handleTradeDetailed,
    postTrade,
  } = useTradeController();

  useEffect(() => {
    if (userData?.customerId) {
      handleTrade(userData.customerId);
      handleTradeDetailed(userData.customerId);
    }
  }, [userData, reload]);

  const handlePostTrade = async (customerId: number) => {
    await postTrade(customerId);
    setType("");
    setAmount(0);
    setDescription("");
    setReload(!reload);
    setIsModalVisible(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setType("");
    setAmount(0);
    setDescription("");
    setIsModalVisible(false);
  };

  const handleAmountChange = (text: string) => {
    setAmountText(text); 

 
    const parsedAmount = parseFloat(text);
    if (!isNaN(parsedAmount)) {
      setAmount(parsedAmount);
    } else {
      setAmount(0); 
    }
  };


  const filteredData = selectedType
    ? detailedTrades.filter((item) => item.type === selectedType)
    : detailedTrades;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título */}
        <Text style={styles.title}>
          Welcome {userData.firstName} {userData.lastName}
        </Text>

        {/* Seção de Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Balance:</Text>
          <Text style={styles.balanceValue}>
            R$ {trades.reduce((sum, trade) => sum + trade.totalAmount, 0).toFixed(2)}
          </Text>

          {trades.length > 0 ? (
            trades.map((item) => (
              <View key={`${item.customerId}-${item.type}`} style={styles.tradeItem}>
                <Text style={styles.tradeText}>Type: {item.type}</Text>
                <Text style={styles.tradeText}>
                  Amount: R$ {item.totalAmount.toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noTradesText}>No balance available</Text>
          )}
        </View>

        {/* Modal de adicionar saldo */}
        <Modal transparent={true} animationType="fade" visible={isModalVisible} onRequestClose={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Add your balance!</Text>
              <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} style={styles.input}>
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="Investment" value="Investment" />
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Expenses" value="Expenses" />
              </Picker>

              <TextInput
                placeholder="Amount"
                style={styles.input}
                keyboardType="numeric"
                value={amountText || ""}
                onChangeText={handleAmountChange}
              />;
              <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />

              <TouchableOpacity style={styles.button} onPress={() => handlePostTrade(userData.customerId)}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.button]} onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Botões de Filtro */}
        <View style={styles.descriptionButtonsContainer}>
          {["Cash", "Expenses", "Investment", "All"].map((type) => (
            <TouchableOpacity key={type} style={styles.buttonDescription} onPress={() => setSelectedType(type === "All" ? "" : type)}>
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de Trades Filtrados */}
        <View style={styles.tradeList}>
          {filteredData.map((trade) => (
            <View key={trade.tradeID} style={styles.tradeItem}>
              <Text>Trade ID: {trade.tradeID}</Text>
              <Text>Type: {trade.type}</Text>
              {trade.amount !== undefined && <Text>Amount: {trade.amount}</Text>}
              {trade.description && <Text>Description: {trade.description}</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.fixedBottomBar}>
        <TouchableOpacity style={styles.bottomButton} onPress={openModal}>
          <Text style={styles.bottomButtonText}>Add Balance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(57, 120, 255)",
    alignItems: "center",
    top: 40,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 110,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  balanceContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
  },
  descriptionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
  tradeText: {
    fontSize: 16,
  },
  input: {
    height: 51,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 20,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'rgb(0, 0, 0)',
  },
  noTradesText: {
    fontSize: 16,
    color: '#999',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonDescription: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
  },
  tradeList: {
    width: "100%",
    marginTop: 20,
  },
  tradeItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "rgb(57, 120, 255)",
    fontWeight: "bold",
    justifyContent: 'center',
  },
  fixedBottomBar: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",

  },
  bottomButton: {
    backgroundColor: "rgb(57, 120, 255)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

