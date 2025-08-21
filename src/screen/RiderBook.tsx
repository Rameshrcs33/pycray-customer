import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../component/Loader';
import { bookRide, getRide } from '../redux/slice/bookingReducer';
import { getUser, updateFcmToken } from '../redux/slice/userReducer';
import { getData, storeData } from '../common/asyncStore';
import { token } from '../utils/API_KEY';

const RiderBook = () => {
  const [PickupLocation, setPickupLocation] = useState<string>('');
  const [DropLocation, setDropLocation] = useState<string>('');
  const [Booking, setBooking] = useState<any>([]);

  const dispatch: any = useDispatch();
  const { userList } = useSelector((state: any) => state.user);
  const { bookingList, loading } = useSelector((state: any) => state.booking);

  useEffect(() => {
    getToken();
    dispatch(getRide());
  }, []);

  useEffect(() => {
    setBooking([...bookingList]);
  }, [bookingList]);

  const getToken = async () => {
    try {
      const fcmToken = await getData(token);
      if (!fcmToken) {
        updateToken();
      } else {
        fetchUser();
      }
    } catch (error) {}
  };

  const updateToken = async () => {
    try {
      const payload: any = {
        role: 'customer',
        fcmToken: 'just ckecking token insertion',
      };
      await storeData(token, payload?.fcmToken);
      await dispatch(updateFcmToken(payload));
      fetchUser();
    } catch (error) {}
  };

  const fetchUser = () => {
    try {
      const payload: string = 'customer';
      dispatch(getUser(payload));
    } catch (error) {}
  };

  const createBooking = async () => {
    Keyboard.dismiss();
    if (PickupLocation === '') {
      Alert.alert('Alert', 'Please enter your pickup location');
      return;
    } else if (DropLocation === '') {
      Alert.alert('Alert', 'Please enter your drop location');
      return;
    }
    const payload: any = {
      customerId: userList[0]?._id,
      pickup: PickupLocation,
      destination: DropLocation,
    };
    await dispatch(bookRide(payload));
    dispatch(getRide());
  };

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: 'lightgray',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ color: 'black', fontSize: 14 }}>
          Booking ID : {item?._id}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Pickup Location : {item?.pickup}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Drop Location : {item?.destination}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Booking status :{' '}
          <Text
            style={{
              color: item?.status === 'rejected' ? 'red' : 'green',
              fontWeight: '500',
            }}
          >
            {item?.status}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
        Book Ride
      </Text>

      <View style={{ marginVertical: 10 }} />

      <TextInput
        style={styles.input}
        value={PickupLocation}
        placeholder={'Enter your pickup location'}
        numberOfLines={1}
        maxLength={30}
        onChangeText={txt => setPickupLocation(txt)}
      />

      <TextInput
        style={styles.input}
        value={DropLocation}
        placeholder={'Enter your drop location'}
        numberOfLines={1}
        maxLength={30}
        onChangeText={txt => setDropLocation(txt)}
      />

      <Pressable
        onPress={createBooking}
        style={{
          paddingHorizontal: 30,
          paddingVertical: 8,
          backgroundColor: 'blue',
          borderRadius: 8,
          alignSelf: 'center',
        }}
      >
        <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>
          Book
        </Text>
      </Pressable>

      {Booking.length !== 0 && (
        <FlatList
          style={{ marginTop: 20 }}
          data={Booking}
          keyExtractor={(item: any, key: any) => key.toString()}
          renderItem={renderItem}
        />
      )}

      {loading && <Loader Visible={loading} />}
    </View>
  );
};

export default RiderBook;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 1,
    fontSize: 14,
    color: 'black',
  },
});
