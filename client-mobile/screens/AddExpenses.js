import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Picker, KeyboardAvoidingView, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import DateField from 'react-native-datefield';
import { styles } from "../styles"
import logo from '../assets/logo.png'

export default function AddExpenses({ route }) {
  const { categoryId, tripId } = route.params
  const [amount, setAmount] = useState("0")
  const [name, setName] = useState("")
  const [expenseDate, setExpenseDate] = useState("12/25/2021")
  const [description, setDescription] = useState("")
  const [paymentMethodId, setPaymentMethodId] = useState("")
  const [focused, setFocused] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'
  function formatDate(value) {
    let newDate = []
    let formated = value.toISOString().split('T')[0];
    formated = formated.split('-')
    newDate.push(formated[1])
    newDate.push(formated[2])
    newDate.push(formated[0])
    newDate = newDate.join('-')
    setExpenseDate(newDate)
  }

  console.log(amount, name, expenseDate, paymentMethodId, description, categoryId, tripId);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior={focused === 'amount' ? 'height' : 'position'} keyboardVerticalOffset={10}>
        <View style={{ position: 'relative', height: '100%' }}>
          <View style={editProfileStyle.headerView}>
            <TouchableOpacity style={{ padding: 15 }} >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 40 }}>
              <Ionicons name="book" size={48} color="white" />
              <View style={{ alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 32, color: "#fff" }}>Rp </Text>
                  <TextInput
                    keyboardType={phoneInput}
                    style={focused === 'amount' ? editProfileStyle.title : editProfileStyle.title}
                    placeholder='Expenses Amount'
                    placeholderTextColor="#a2e1ff"
                    onFocus={() => setFocused('amount')}
                    value={amount}
                    onChangeText={setAmount}
                    textAlign="right"
                  />
                </View>
                <Text style={{ color: "#fff" }}>1 $ = Rp 14000</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 25, paddingBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`Add Expenses`}</Text>
            </View>
            <View style={{ marginHorizontal: 40, marginVertical: 10 }}>
              <Text>Expenses Name</Text>
              <TextInput
                style={focused === 'name' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
                placeholder='Expenses Name'
                onFocus={() => setFocused('name')}
                value={name}
                onChangeText={setName}
              />
              <Text>Expenses Date</Text>
              <View style={editProfileStyle.inputDate}>
                <DateField
                  labelDate="Expenses date"
                  labelMonth="Expenses month"
                  labelYear="Expenses year"
                  onSubmit={(value) => formatDate(value)}
                  defaultValue={new Date(expenseDate)}
                />
              </View>
              <Text>Payment Method</Text>
              <View style={editProfileStyle.inputDate}>
                <Picker
                  selectedValue={paymentMethodId}
                  onValueChange={itemValue => setPaymentMethodId(itemValue)}
                >
                  <Picker.Item label="Cash" value="cash" />
                  <Picker.Item label="Credit" value="credit" />
                </Picker>
              </View>
              <View style={editProfileStyle.descriptionContainer}>
                <Text>Expenses Description</Text>
                <TouchableOpacity style={editProfileStyle.receiptButton}>
                  <Text style={editProfileStyle.receiptText}>Upload Receipt</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={focused === 'description' ? editProfileStyle.textAreaOnFocus : editProfileStyle.textArea}
                placeholder='Expenses Description'
                onFocus={() => setFocused('description')}
                value={description}
                onChangeText={setDescription}
              />
              <View style={editProfileStyle.checkContainer}>
                <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                  <Ionicons name="checkmark" size={24} color="#0378a6" style={editProfileStyle.checkButton} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const editProfileStyle = StyleSheet.create({
  headerView: {
    width: "100%",
    height: 150,
    backgroundColor: "#72c1f2"
  },
  title: {
    width: "75%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1
  },
  inputDate: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 35,
    color: '#000',
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingHorizontal: 10,
    marginVertical: 10
  },
  inputOnFocus: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingHorizontal: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  receiptButton: {
    marginLeft: 10,
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#0378a6",
    borderRadius: 10
  },
  receiptText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 80,
    color: '#000',
    paddingHorizontal: 10,
    marginVertical: 10
  },
  textAreaOnFocus: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 80,
    color: '#000',
    paddingHorizontal: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginHorizontal: 40
  },
  avatarView: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginVertical: 10
  },
  avatarViewCheck: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#0378a6",
    borderRadius: 30,
    marginVertical: 10
  },
  checkContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  checkButton: {
    fontSize: 28,
    backgroundColor: "#0378a6",
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 50
  }
})