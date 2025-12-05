import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface Props {
  cityList: string[];
  onSelectCity: (city: string) => void;
  placeholder?: string;
}

const CitySearch: React.FC<Props> = ({ cityList, onSelectCity, placeholder }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = cityList.filter((city) =>
      city.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleSelect = (city: string) => {
    setSearchText(city);
    setSearchResults([]);
    onSelectCity(city);
  };

  return (
    <View style={{ padding: 10, zIndex: 50 }}>
      <TextInput
        value={searchText}
        onChangeText={handleSearch}
        placeholder={placeholder || 'Search city'}
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 8,
          fontSize: 16,
          elevation: 3,
        }}
      />

      {searchResults.length > 0 && (
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 6,
            borderRadius: 8,
            elevation: 3,
            maxHeight: 200,
          }}
        >
          {searchResults.map((city) => (
            <TouchableOpacity
              key={city}
              onPress={() => handleSelect(city)}
              style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}
            >
              <Text>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CitySearch;
