import React,{useState ,Component,useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  TouchableHighlight,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import { FAB, Portal, Provider, Card } from 'react-native-paper';


import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';


  const App: () => Node = () => {
      
  /*
    return(
    <FlipPage  orientation='vertical'>
        <FlipPagePage style={{backgroundColor:'#228B22'}}>
            <TouchableOpacity>
                <Text style={styles.title}>CARD 1</Text>
                <Image 
                    style={styles.tinyLogo}
                    source={require('./My-project-1.png')}
                />
            </TouchableOpacity>
        </FlipPagePage>
        <FlipPagePage style={{backgroundColor:'#228B22'}}>
            
            <TouchableOpacity >
                <Text style={styles.title}>CARD 2</Text>

                <Image 
                    style={styles.tinyLogo}
                    source={require('./Virtual-Notice-Board.png')
                }
                />
            </TouchableOpacity>
        </FlipPagePage>
        <FlipPagePage style={{backgroundColor:'#228B22'}}>
            
            <TouchableOpacity >
                <Text style={styles.title}>CARD 3</Text>

                <Image 
                    style={styles.tinyLogo}
                    source={require('./Virtual-Notice-Board-logos.jpeg')}
                />
            </TouchableOpacity>
        </FlipPagePage>
        <FlipPagePage style={{backgroundColor:'#228B22'}}>
            
            <TouchableOpacity>
                <Text style={styles.title}>CARD 4</Text>

                <Image 
                    style={styles.tinyLogo}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} 
                />
            </TouchableOpacity>
        </FlipPagePage>
        <FlipPagePage style={{backgroundColor:'#228B22'}}>
            
            <TouchableOpacity >
                <Text style={styles.title}>CARD 5</Text>

                <Image 
                    style={styles.tinyLogo}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} 
                />
            </TouchableOpacity>
        </FlipPagePage>
    </FlipPage>
    );
    */


    const [selectedId, setSelectedId] = useState(null);
  const [stat, setStat] = React.useState({ open: false });
  const { open } = stat;
  const onStateChange = ({ open }) => setStat({ open });



    const DATA = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
          img: require('./My-project-1.png'),
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
          img: require('./Virtual-Notice-Board.png'),
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Third Item",
          img: require('./Virtual-Notice-Board-logos.jpeg'),
        },
        {
          id: "58694a0f-3da1-471f-bd96-fbd91aa97f63",
          title: "Fourth Item",
          img: require('./Virtual-Notice-Board-logos.jpeg'),
        },
        {
          id: "58694a0f-3da1-471f-bd96-3ad53abb28ba",
          title: "Fifth Item",
          img: require('./Virtual-Notice-Board-logos.jpeg'),
        },
        {
          id: "58694a0f-3da1-471f-bd96-bd7acbea",
          title: "Sixth Item",
          img: require('./Virtual-Notice-Board-logos.jpeg'),
        },
      ];
    
      const Item = ({ item, onPress, backgroundColor, textColor }) => (
             <Card>
             <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
                  <Text style={[styles.title, textColor]}>{item.title}</Text>
                  <Text style={[styles.text, textColor]}>{item.id}</Text>
                  <Image 
                      style={styles.tinyLogo}
                      source={ item.img}
                  />
              </TouchableOpacity>
              </Card>
        );
      
       const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#228B22" : "#FFFFFF";
        const color = item.id === selectedId ? 'white' : 'black';
  
    
          return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
      };



      return(
  
      
        <View style={styles.container}>
              <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
  
  
  
        
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'calendar-today' : 'plus'}
              actions={[
              
                {
                  icon: 'star',
                  label: 'Star',
                  onPress: () => console.log('Pressed Star'),
                },
                {
                  icon: 'email',
                  label: 'Email',
                  onPress: () => console.log('Pressed email'),
                },
                {
                  icon: 'bell',
                  label: 'Remind',
                  onPress: () => console.log('Pressed notifications'),
                  small: false,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
              if (open) {
                // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
        
        
      </View>
         
        );
  }



  const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        padding: 30
      },
      tinyLogo: {
        margin: 40,
        width: 150,
        height: 150,
        alignContent: 'center',
      },
      text: {
        fontSize: 12,
      },
    
      item: {
        padding: 20,
        height: 250,
        width: 700,
      },
      root: {
        flex: 2,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eaeaea',
      },
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
  });3

  export default App;
  

  //backgroundColor:'#042c27'