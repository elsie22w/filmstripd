import MovieCard from '@/components/MovieCard';
import SearchBar from "@/components/SearchBar";
import { icons } from '@/constants/icons';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {

  const [searchQuery, setSearchQuery] = useState(''); // array Destructuring to grab two things from the useState hook

  const { 
    data: movies, 
    loading,
    error,
    refetch: loadMovies, 
    reset, } = useFetch(() => fetchMovies({query: searchQuery }), true)

  useEffect(() => { // useEffect -> React Hook that lets you synchronize your component with an "external system"
    // timeoutId -> debouncer to avoid reloading search results every letter
    const timeoutId = setTimeout( async () => { // since using await, need to be async function
      if(searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500); // 500 -> ms to wait until next keystroke (won't refresh until paused typing for 500ms)

    return () => clearTimeout(timeoutId); // clear timeouts
  }, [searchQuery]); // [searchQuery] -> dependency array
  
  return (
    <View className="flex-1 bg-primary">
      {/* <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" /> */}

      <FlatList 
        data={movies} 
        renderItem={({ item }) => <MovieCard { ...item } /> }
        keyExtractor={( item ) => item.id.toString()} // keyExtractor -> performance tool - tells what should be used to track a specific item
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100}}
        ListHeaderComponent={ // Always show on top
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className='my-5'>
              <SearchBar 
                placeholder="search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#2D5A5E" className='my-3'/>
            )}

            {error  && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {error.message}
              </Text>
            )}

            { // "text-accent" -> tailwind color using defined cooors in `tailwind.config.js`
              !loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-dark-200 font-bold'>
                Search Results for{' '}
                <Text className="text-accent">{searchQuery}</Text> 
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'Sorry... no movies found :(' : 'Search for a movie!'}
              </Text>
            </View>
          ) : null
        }
      />

    </View>
  )
}

export default search