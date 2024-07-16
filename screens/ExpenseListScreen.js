// src/screens/ExpenseListScreen.js

import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, updateExpense, deleteExpense, selectExpenses, selectTotalIncome, selectTotalExpense, selectFilteredExpenses } from '../features/expensesSlice';
import { Picker } from '@react-native-picker/picker';

const ExpenseListScreen = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');

  const filteredExpenses = useSelector(state =>
    selectFilteredExpenses(state, searchTerm)
  );

  const handleAddExpense = () => {
    const newExpense = {
      id: Math.random().toString(),
      title,
      description,
      date,
      type,
      amount: parseFloat(amount),
    };
    dispatch(addExpense(newExpense));
    setTitle('');
    setDescription('');
    setDate('');
    setAmount('');
  };

  const handleSearch = () => {
    // Perform search logic if needed
  };

  return (
    <View style={styles.container}>
      <Text>Tổng thu nhập: {totalIncome}</Text>
      <Text>Tổng chi tiêu: {totalExpense}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm khoản chi tiêu"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) =>
          setType(itemValue)
        }>
        <Picker.Item label="Chi tiêu" value="expense" />
        <Picker.Item label="Thu nhập" value="income" />
      </Picker>
      <Button
        style={styles.button}
        title="Thêm chi tiêu"
        onPress={handleAddExpense}
      />
      <Button
        style={styles.button}
        title="Tìm kiếm"
        onPress={handleSearch}
      />
      <FlatList
        data={filteredExpenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Tiêu đề: {item.title}</Text>
            <Text>Mô tả: {item.description}</Text>
            <Text>Ngày: {item.date}</Text>
            <Text>Loại: {item.type === 'expense' ? 'Chi tiêu' : 'Thu nhập'}</Text>
            <Text>Số tiền: {item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
  },
  listItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default ExpenseListScreen;
