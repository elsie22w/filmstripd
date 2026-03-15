import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText}: Props) => {
  return (
    <View className="flex-row items-center bg-white rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor={"#463F3D"} />
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#68605C"}
        className="flex-1 ml-2 text-dark-100"
      />
    </View>
  )
}

export default SearchBar