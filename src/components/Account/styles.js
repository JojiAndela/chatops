import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loader: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  contain: {
    flex:1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex:1,
    marginTop: 50,
    width: '100%'
  },
  head: {
    fontSize: 30,
    color: '#555',
    margin: 20,
    fontWeight: 'bold',
  },
  sec: {
    margin: 10
  },
  input: {
    padding: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    textTransform: 'lowercase'
  },
  btn: { 
    alignSelf: "center", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#238ACC'
  }, 
  btntext: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
  },

  card: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  cardName: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});