/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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




import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap } from 'react-native-tab-view';  
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated,{ Value } from 'react-native-reanimated';
import 'react-native-gesture-handler';

import { FAB, Portal, Provider, Card } from 'react-native-paper';
import * as icon from 'react-native-vector-icons/FontAwesome';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import * as Quill from 'react-native-cn-quill';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import FlipPage, {FlipPagePage} from 'react-native-flip-page';

import Input from './screens/Input';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';














 /*
  function onPressAddImage() {
    // you can easily add images from your gallery
    richText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }
  
  const richText = React.createRef();
  return (
    <View style={styles.root}>
      <StatusBar style="auto"  barStyle={'dark-content'}/>
      <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                    <Text>Description:</Text>
                    <RichEditor
                        ref={richText}
                        onChange={ descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,actions.insertImage ]}
                onPressAddImage={onPressAddImage}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
            />
      
    </View>
  );
  _editor.current?.insertEmbed(
        0,
        'image',
        'https://picsum.photos/200/300'
      );
  
*/



  
  
  
const App: () => Node = ({navigation}) => {

  const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  
  const [text, setText] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [logIn, setLogIn] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [stat, setStat] = React.useState({ open: false });
  const { open } = stat;
  const onStateChange = ({ open }) => setStat({ open });
  const _editor = React.createRef();
  const [edit, setEdit] = useState('');


  





  
  
  
  
  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }



  function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  
  async function signInWithPhoneNumber(phoneNumber) {
    console.log("Calling SigninWithPhoneNumber for "+phoneNumber.toString());
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber,true);
    console.log(confirmation.toString());

    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      if(await confirm.confirm(code)){
        console.log("Code confirmed");
        setLogIn(true);
        console.log("logIn: "+logIn);
        setEdit('1');
        console.log("edit: "+ edit);

      }
    } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(
          "Wrong Code Entered, Enter the correct code.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        setLogIn(false);
      }
  }


  function Home({navigation}) {


    const { signOut } = React.useContext(AuthContext);
    const { input } = React.useContext(AuthContext);
    console.log("state.isInput : " + state.isInput);


    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
        img: require('./My-project-1.png'),
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
        img: require('./My-project-1.png'),
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
        img: require('./My-project-1.png'),
      },
      {
        id: "58694a0f-3da1-471f-bd96-fbd91aa97f63",
        title: "Fourth Item",
        img: require('./My-project-1.png'),
      },
      {
        id: "58694a0f-3da1-471f-bd96-3ad53abb28ba",
        title: "Fifth Item",
        img: require('./My-project-1.png'),
      },
      {
        id: "58694a0f-3da1-471f-bd96-bd7acbea",
        title: "Sixth Item",
        img: require('./My-project-1.png'),
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
  
    const _onPress = (item)=>{
      ToastAndroid.showWithGravityAndOffset(
        `${item.title}  called`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      
    }
  
    
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={signOut}
            title="Sign Out"
          />
        ),
      });
    }, [navigation]);
    
  
    
    
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
                onPress: () => { 
                  
                  input() },
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


  /*function Input({ navigation }) {

    const { signOut } = React.useContext(AuthContext);
    const { back } = React.useContext(AuthContext);

    console.log("state.isInput : " + state.isInput);

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={signOut}
            title="Sign Out"
          />
        ),
        headerLeft: () => (
          <Button onPress={back}
            title="Back"
          />
        ),
       
      });
    }, [navigation]);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml="<h1>Quill Editor for react-native</h1>"
      />
      <QuillToolbar editor={_editor} options="full" theme="light" />
      </View>
    );
  }*/


  function SignInScreen({ navigation }) {
    
    const { signIn } = React.useContext(AuthContext);
    
  
    return (


      <KeyboardAvoidingView
              behaviour={Platform.OS=="ios"?"padding":"height"} 
              style={styles.container}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={{padding: 10}}>
           
            <Image
              style={styles.logo}
              source={require('./Virtual-Notice-Board-logos.jpeg')}
                />
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              placeholder="Enter Number"
              onEndEditing={(text) => setText(text)}
              defaultValue={text}
              maxLength={10}

            />
            <Button
              style={styles.button}
              onPress={() => {
                        //Add functionality to send OTP to Mobile
                        //signInWithPhoneNumber("+91"+text)
                        //setLogIn(false)
                        signIn()
                      }}
              disabled={false}
              title={"SIGN IN"}
            />

        </View>

      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }


  function OTPScreen() {
    const { signIn } = React.useContext(AuthContext);
    return (
      <View>
        <TextInput 
        keyboardType='numeric' 
        value={code} 
        
        maxLength={10}
        onEndEditing={(text) => setCode(text)}

        />
        <Button title="Confirm Code" onPress={() => 
          { 
          confirmCode();
          console.log("edit: "+ edit);
          setEdit("01")
          console.log("edit: "+ edit);
           signIn()
          
         
        }
         } />
      </View>
    );
  }





  




  


 


/*
     // Handle user state changes
     function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []); 

  if (initializing) return null;
*/

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isInput: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isInput: false,

          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isInput: false,

          };
        case 'INPUT':
          return{
            ...prevState,
            isSignout: false,
            isInput: true,
            userToken: action.token,
          };
        case 'BACK':
          return{
            ...prevState,
            isInput: false,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isInput: false,
    }
  );
  
    
  
   React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        let userToken=null;
  
        try {
          // Restore token stored in `SecureStore` or any other encrypted storage
          //userToken = await confirm.confirm(code);
        } catch (e) {
          // Restoring token failed
        }
  
        // After restoring token, we may need to validate it in production apps
  
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };
  
      bootstrapAsync();
    }, []);
  
    const authContext = React.useMemo(
      () => ({
        signIn: async () => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: "dummy" });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async () => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: "dummy" });
        },
        input: async ()=>{ 
          dispatch({type: 'INPUT', token: 'dummy'});
        },
        back: async ()=>{ 
          dispatch({type: 'BACK', token: 'dummy'});
        },
      }),
      []
    );
   
  const AuthStack = createNativeStackNavigator();

  if(state.isLoading){
    return(
      <SplashScreen />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerBackVisible={true}>
          {state.userToken == null ? (
            // No token found, user isn't signed in
              logIn?(
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                 animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                 headerTitleAlign: 'center',
                }}
              />
              ):
              (
              <Stack.Screen
                name="OTP_Screen"
                component={OTPScreen}
                options={{
                  title: 'Enter OTP',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  headerTitleAlign: 'center',
                }}
                
              />
              )
            
          ) : (
            // User is signed in
            
            state.isInput ?(
              
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{
                title: 'My home',
                headerStyle: {
                  backgroundColor: '#054d17',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                }
              }
              />
            ) : (
              <Stack.Screen 
              name="Input" 
              component={Input}
              options={{
                title: 'Input',
                headerStyle: {
                  backgroundColor: '#054d17',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerRight: () => (
                  <Button
                    onPress={ dispatch({ type: 'SIGN_OUT' }) }
                    title="Sign Out"
                    color="#1e801c"
                  />
                ),

              }
              }
              />
            )
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );



  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 30
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    
    
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
  },

  item: {
    padding: 20,
    height: 250,
    width: 700,
  },
  input: {
    marginTop: 50,
    paddingHorizontal: 24,
    fontSize: 20,
    height: 40,
  },
  button: {
    marginTop: 20,
    fontSize: 24,
  },
  logo: {
    marginLeft: 70,
    width: 150,
    height: 150,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  root: {
    flex: 2,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    
    backgroundColor: 'white',
  },
});

export default App;






/*
<View>
      <FlatList
      ItemSeparatorComponent={
        Platform.OS === 'android' &&
        (({ highlighted }) => (
          <View
            style={[
              style.separator,
              highlighted && { marginLeft: 0 }
            ]}
          />
        ))
      }
      data={[{ title: 'Title Text', key: 'item1' }]}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          key={item.key}
          onPress={() => _onPress(item)}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          <View style={{ backgroundColor: 'white' }}>
            <Text>{item.title}</Text>
          </View>
        </TouchableHighlight>
      )}
    />
    </View>
    
    
    /*
      <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
      />
      */
    
    
    