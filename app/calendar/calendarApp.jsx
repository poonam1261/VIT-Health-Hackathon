import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { CalendarList, Calendar, ExpandableCalendar, CalendarProvider } from 'react-native-calendars'
import { appointments } from '../../constants/DoctorContacts';


const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};


export default function calendarApp() {
  const [markedDates, setMarkedDates] = useState({});


const markDate = (date) => {
  setMarkedDates({
    ...markedDates,
    [date]: { selected: true, marked: true, dotColor: 'red' },
  });
};
  return (
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }}>


{/*<Calendar
  markingType={'multi-dot'}
  markedDates={{
    '2025-10-25': {dots: [vacation, massage, workout]},
    '2025-10-26': {dots: [massage, workout], disabled: true}
  }}
/>;
*/}

<Calendar
style={{
  borderWidth: 1,
  borderColor: 'gray',
  height: 350, 
  borderRadius:15,
  width:'100%',
  paddingLeft:20,
  paddingRight:20, 
  paddingBottom:50 ,
  margin:0
  
}}
onDayPress={(day) => markDate(day.dateString)}
  markingType={'custom'}
  markedDates={markedDates}

  enableSwipeMonths={true}
  theme={{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: 'rgba(65, 229, 65, 0.7)',
    dayTextColor: 'rgba(141, 141, 178, 0.86)',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'rgba(78, 78, 201, 0.91)',
    indicatorColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }} 

/>
        
    </View>
  )
}