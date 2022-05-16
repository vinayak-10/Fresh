import * as React from 'react';
import {
  getItem as getToken,
  setItem as setToken,
  removeItem as removeToken,
} from './async-storage';
const AuthContext = React.createContext({
  status: 'idle',
  authToken: null,
  signIn: () => {},
  signOut: () => {},
});
export const useAuthorization = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};
export const AuthProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, {
    status: 'idle',
    authToken: null,
  });
  React.useEffect(() => {
    const initState = async () => {
      try { 
        const authToken = await getToken();
        if (authToken !== null) {
          dispatch({type: 'SIGN_IN', token: authToken});
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      } catch (e) {
        console.log(e);
      }
    };
    initState();
  }, [state, dispatch]);
  const actions = React.useMemo(
    () => ({
      signIn: async token => {
        dispatch({type: 'SIGN_IN', token});
        await setToken(token);
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT'});
        await removeToken();
      },
    }),
    [state, dispatch],
  );
  return (
    <AuthContext.Provider value={{...state, ...actions}}>
      {props.children}
    </AuthContext.Provider>
  );
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_OUT':
      return {
        ...state,
        status: 'signOut',
        authToken: null,
      };
    case 'SIGN_IN':
      return {
        ...state,
        status: 'signIn',
        authToken: action.token,
      };
  }
};




/*Valid keys: [
  "display",
  "width",
  "height",
  "start",
  "end",
  "top",
  "left",
  "right",
  "bottom",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "margin",
  "marginVertical",
  "marginHorizontal",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginStart",
  "marginEnd",
  "padding",
  "paddingVertical",
  "paddingHorizontal",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingStart",
  "paddingEnd",
  "borderWidth",
  "borderTopWidth",
  "borderStartWidth",
  "borderEndWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "position",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "alignSelf",
  "alignContent",
  "overflow",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "aspectRatio",
  "zIndex",
  "direction",
  "shadowColor",
  "shadowOffset",
  "shadowOpacity",
  "shadowRadius",
  "transform",
  "transformMatrix",
  "decomposedMatrix",
  "scaleX",
  "scaleY",
  "rotation",
  "translateX",
  "translateY",
  "backfaceVisibility",
  "backgroundColor",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderStartColor",
  "borderEndColor",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderTopStartRadius",
  "borderTopEndRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderBottomStartRadius",
  "borderBottomEndRadius",
  "borderStyle",
  "opacity",
  "elevation",
  "color",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "fontVariant",
  "textShadowOffset",
  "textShadowRadius",
  "textShadowColor",
  "letterSpacing",
  "lineHeight",
  "textAlign",
  "textAlignVertical",
  "includeFontPadding",
  "textDecorationLine",
  "textDecorationStyle",
  "textDecorationColor",
  "textTransform",
  "writingDirection"
]






/*
  function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);
  

    return (
      <View>
        <Text>Signed in!</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
    );
  }
*/